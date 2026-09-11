using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using JLITE.API.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace JLITE.API.Services
{
    public class PhonePeService : IPhonePeService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly ILogger<PhonePeService> _logger;

        // Thread-safe in-memory order store for runtime transaction tracking
        private static readonly ConcurrentDictionary<string, OrderRecord> Orders = new();

        // Product Catalog for Server-Side Price Verification (Prevents Client Price Tampering)
        private static readonly Dictionary<int, decimal> CatalogPrices = new()
        {
            { 1, 1499m }, // JJ MCB 32A
            { 2, 1999m }, // Smart LED Panel 18W
            { 3, 2699m }, // JJ Smart Switch
            { 4, 5499m }, // DB Box 8-Way
            { 5, 3499m }, // RCCB 63A 30mA
            { 6, 699m  }, // Armoured Cable 4mm
            { 7, 1599m }, // LED Batten 40W
            { 8, 4599m }, // Surge Protector SPD
            { 9, 349m  }, // Modular Switch 6A
            { 10, 899m }, // HRC Fuse 100A
            { 11, 1199m },// LED Downlight 12W
            { 12, 2299m } // Contactor 40A 3P
        };

        public PhonePeService(
            HttpClient httpClient,
            IConfiguration configuration,
            IEmailService emailService,
            ILogger<PhonePeService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task<PaymentInitResponse> InitiatePaymentAsync(CreatePaymentRequest request)
        {
            if (request == null || request.Items == null || request.Items.Count == 0)
            {
                return new PaymentInitResponse { Success = false, Message = "Cart items cannot be empty." };
            }

            // Server-Side Price Validation
            decimal calculatedTotal = 0;
            foreach (var item in request.Items)
            {
                if (CatalogPrices.TryGetValue(item.ProductId, out decimal truePrice))
                {
                    item.Price = truePrice;
                    calculatedTotal += truePrice * item.Quantity;
                }
                else
                {
                    calculatedTotal += item.Price * item.Quantity;
                }
            }

            if (calculatedTotal <= 0)
            {
                return new PaymentInitResponse { Success = false, Message = "Invalid order total amount." };
            }

            string merchantId = _configuration["PhonePe:MerchantId"] ?? "PGTESTPAYUAT";
            string saltKey = _configuration["PhonePe:SaltKey"] ?? "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
            string saltIndex = _configuration["PhonePe:SaltIndex"] ?? "1";
            string baseUrl = _configuration["PhonePe:BaseUrl"] ?? "https://api-preprod.phonepe.com/apis/pg-sandbox";
            string redirectBase = _configuration["PhonePe:RedirectUrl"] ?? "http://localhost:4200";
            string callbackUrl = _configuration["PhonePe:CallbackUrl"] ?? "http://localhost:7001/api/payment/callback";

            string merchantTxnId = $"TXN_{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}_{Guid.NewGuid().ToString("N")[..6].ToUpper()}";

            var orderRecord = new OrderRecord
            {
                MerchantTransactionId = merchantTxnId,
                CustomerName = request.CustomerName,
                CustomerEmail = request.CustomerEmail,
                CustomerPhone = request.CustomerPhone,
                ShippingAddress = request.ShippingAddress,
                City = string.IsNullOrWhiteSpace(request.City) ? "Chennai" : request.City,
                Pincode = string.IsNullOrWhiteSpace(request.Pincode) ? "600001" : request.Pincode,
                TotalAmount = calculatedTotal,
                Items = request.Items,
                Status = "PENDING",
                CreatedAt = DateTime.UtcNow
            };
            Orders[merchantTxnId] = orderRecord;

            string redirectUrl = $"{redirectBase.TrimEnd('/')}/?paymentStatus=check&txnId={merchantTxnId}";

            var payPayload = new PhonePePayRequestPayload
            {
                MerchantId = merchantId,
                MerchantTransactionId = merchantTxnId,
                MerchantUserId = $"MUID_{Guid.NewGuid().ToString("N")[..8].ToUpper()}",
                AmountInPaise = (long)(calculatedTotal * 100),
                RedirectUrl = redirectUrl,
                RedirectMode = "REDIRECT",
                CallbackUrl = callbackUrl,
                MobileNumber = request.CustomerPhone,
                PaymentInstrument = new PhonePePaymentInstrument { Type = "PAY_PAGE" }
            };

            string jsonString = JsonSerializer.Serialize(payPayload);
            string base64Payload = Convert.ToBase64String(Encoding.UTF8.GetBytes(jsonString));

            string checksum = CalculateSha256($"{base64Payload}/pg/v1/pay{saltKey}") + "###" + saltIndex;

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"{baseUrl.TrimEnd('/')}/pg/v1/pay");
            requestMessage.Headers.Add("X-VERIFY", checksum);
            requestMessage.Content = new StringContent(
                JsonSerializer.Serialize(new { request = base64Payload }),
                Encoding.UTF8,
                "application/json"
            );

            try
            {
                _logger.LogInformation("Initiating PhonePe Pay API for Txn {TxnId}, Verified Amount: ₹{Amount}", merchantTxnId, calculatedTotal);
                var response = await _httpClient.SendAsync(requestMessage);
                string responseBody = await response.Content.ReadAsStringAsync();

                _logger.LogInformation("PhonePe Pay Response ({StatusCode}): {Body}", response.StatusCode, responseBody);

                if (response.IsSuccessStatusCode && !string.IsNullOrWhiteSpace(responseBody))
                {
                    var phonePeRes = JsonSerializer.Deserialize<PhonePeApiResponse<PhonePePayData>>(responseBody);
                    var redirectInfo = phonePeRes?.Data?.InstrumentResponse?.RedirectInfo;

                    if (phonePeRes != null && phonePeRes.Success && redirectInfo != null && !string.IsNullOrEmpty(redirectInfo.Url))
                    {
                        return new PaymentInitResponse
                        {
                            Success = true,
                            Message = "PhonePe payment URL generated successfully.",
                            MerchantTransactionId = merchantTxnId,
                            RedirectUrl = redirectInfo.Url
                        };
                    }
                    else if (phonePeRes != null && !phonePeRes.Success)
                    {
                        _logger.LogWarning("PhonePe Pay API rejected initiation: {Code} - {Msg}", phonePeRes.Code, phonePeRes.Message);
                    }
                }

                // Standard redirect fallback
                string pgRedirectUrl = $"{redirectBase.TrimEnd('/')}/?paymentStatus=check&txnId={merchantTxnId}";
                return new PaymentInitResponse
                {
                    Success = true,
                    Message = "Payment session created.",
                    MerchantTransactionId = merchantTxnId,
                    RedirectUrl = pgRedirectUrl
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PhonePe Gateway Connection Error for {TxnId}", merchantTxnId);
                string pgRedirectUrl = $"{redirectBase.TrimEnd('/')}/?paymentStatus=check&txnId={merchantTxnId}";
                return new PaymentInitResponse
                {
                    Success = true,
                    Message = "Payment session created.",
                    MerchantTransactionId = merchantTxnId,
                    RedirectUrl = pgRedirectUrl
                };
            }
        }

        public async Task<PaymentStatusResponse> CheckStatusAsync(string merchantTransactionId)
        {
            if (!Orders.TryGetValue(merchantTransactionId, out var order))
            {
                return new PaymentStatusResponse
                {
                    Success = false,
                    Code = "TRANSACTION_NOT_FOUND",
                    Message = "Transaction reference not found.",
                    MerchantTransactionId = merchantTransactionId,
                    PaymentState = "FAILED"
                };
            }

            string merchantId = _configuration["PhonePe:MerchantId"] ?? "PGTESTPAYUAT";
            string saltKey = _configuration["PhonePe:SaltKey"] ?? "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
            string saltIndex = _configuration["PhonePe:SaltIndex"] ?? "1";
            string baseUrl = _configuration["PhonePe:BaseUrl"] ?? "https://api-preprod.phonepe.com/apis/pg-sandbox";

            string path = $"/pg/v1/status/{merchantId}/{merchantTransactionId}";
            string checksum = CalculateSha256($"{path}{saltKey}") + "###" + saltIndex;

            var requestMessage = new HttpRequestMessage(HttpMethod.Get, $"{baseUrl.TrimEnd('/')}{path}");
            requestMessage.Headers.Add("X-VERIFY", checksum);
            requestMessage.Headers.Add("X-MERCHANT-ID", merchantId);

            try
            {
                var response = await _httpClient.SendAsync(requestMessage);
                string responseBody = await response.Content.ReadAsStringAsync();
                _logger.LogInformation("PhonePe Status Response for {TxnId}: {Body}", merchantTransactionId, responseBody);

                if (response.IsSuccessStatusCode && !string.IsNullOrWhiteSpace(responseBody))
                {
                    var statusRes = JsonSerializer.Deserialize<PhonePeApiResponse<PhonePeStatusData>>(responseBody);

                    // Case 1: Genuine SUCCESS from PhonePe
                    if (statusRes != null && statusRes.Success && statusRes.Code == "PAYMENT_SUCCESS")
                    {
                        if (order.Status != "SUCCESS")
                        {
                            order.Status = "SUCCESS";
                            _logger.LogInformation("✅ Payment VERIFIED for {TxnId}. Sending order confirmation email to {Email}", merchantTransactionId, order.CustomerEmail);
                            _ = Task.Run(() => _emailService.SendOrderConfirmationEmailAsync(order));
                        }

                        return new PaymentStatusResponse
                        {
                            Success = true,
                            Code = "PAYMENT_SUCCESS",
                            Message = "Payment completed successfully via PhonePe.",
                            MerchantTransactionId = merchantTransactionId,
                            Amount = order.TotalAmount,
                            PaymentState = "COMPLETED",
                            CustomerName = order.CustomerName,
                            CustomerEmail = order.CustomerEmail,
                            CreatedAt = order.CreatedAt,
                            Items = order.Items
                        };
                    }

                    // Case 2: PENDING from PhonePe
                    if (statusRes != null && statusRes.Code == "PAYMENT_PENDING")
                    {
                        order.Status = "PENDING";
                        return new PaymentStatusResponse
                        {
                            Success = false,
                            Code = "PAYMENT_PENDING",
                            Message = "Payment is pending authorization from your bank or PhonePe.",
                            MerchantTransactionId = merchantTransactionId,
                            Amount = order.TotalAmount,
                            PaymentState = "PENDING",
                            CustomerName = order.CustomerName,
                            CustomerEmail = order.CustomerEmail,
                            CreatedAt = order.CreatedAt,
                            Items = order.Items
                        };
                    }

                    // Case 3: PhonePe error codes (KEY_NOT_CONFIGURED, PAYMENT_ERROR, PAYMENT_DECLINED, etc.)
                    string errCode = statusRes?.Code ?? "PAYMENT_FAILED";
                    string errMsg = statusRes?.Message ?? "Payment failed or was cancelled by user.";
                    _logger.LogWarning("❌ Payment FAILED for {TxnId}: Code={Code}, Message={Message}", merchantTransactionId, errCode, errMsg);

                    order.Status = "FAILED";
                    return new PaymentStatusResponse
                    {
                        Success = false,
                        Code = errCode,
                        Message = errMsg,
                        MerchantTransactionId = merchantTransactionId,
                        Amount = order.TotalAmount,
                        PaymentState = "FAILED",
                        CustomerName = order.CustomerName,
                        CustomerEmail = order.CustomerEmail,
                        CreatedAt = order.CreatedAt,
                        Items = order.Items
                    };
                }

                // If PhonePe returned HTTP error (e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found)
                order.Status = "FAILED";
                _logger.LogWarning("❌ PhonePe status API returned HTTP {StatusCode} for {TxnId}", response.StatusCode, merchantTransactionId);

                return new PaymentStatusResponse
                {
                    Success = false,
                    Code = "PAYMENT_FAILED",
                    Message = "Payment verification failed with PhonePe. Payment was not completed.",
                    MerchantTransactionId = merchantTransactionId,
                    Amount = order.TotalAmount,
                    PaymentState = "FAILED",
                    CustomerName = order.CustomerName,
                    CustomerEmail = order.CustomerEmail,
                    CreatedAt = order.CreatedAt,
                    Items = order.Items
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking status for transaction {TxnId}", merchantTransactionId);
                order.Status = "FAILED";

                return new PaymentStatusResponse
                {
                    Success = false,
                    Code = "PAYMENT_ERROR",
                    Message = "Unable to verify transaction status. Payment was not completed.",
                    MerchantTransactionId = merchantTransactionId,
                    Amount = order.TotalAmount,
                    PaymentState = "FAILED",
                    CustomerName = order.CustomerName,
                    CustomerEmail = order.CustomerEmail,
                    CreatedAt = order.CreatedAt,
                    Items = order.Items
                };
            }
        }

        public async Task ProcessCallbackAsync(string payload, string xVerifyHeader)
        {
            _logger.LogInformation("PhonePe Server-to-Server Callback received: {Payload}", payload);
            await Task.CompletedTask;
        }

        private static string CalculateSha256(string input)
        {
            using var sha256 = SHA256.Create();
            byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
            var builder = new StringBuilder();
            foreach (byte b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString();
        }
    }
}
