using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace JLITE.API.Models
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

    public class CreatePaymentRequest
    {
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Pincode { get; set; } = string.Empty;
        public List<OrderItemDto> Items { get; set; } = new();
        public decimal TotalAmount { get; set; }
    }

    public class PaymentInitResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string MerchantTransactionId { get; set; } = string.Empty;
        public string RedirectUrl { get; set; } = string.Empty;
    }

    public class PaymentStatusResponse
    {
        public bool Success { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string MerchantTransactionId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string PaymentState { get; set; } = string.Empty; // COMPLETED, FAILED, PENDING
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
    }

    // PhonePe Internal Request/Response DTOs
    public class PhonePePayRequestPayload
    {
        [JsonPropertyName("merchantId")]
        public string MerchantId { get; set; } = string.Empty;

        [JsonPropertyName("merchantTransactionId")]
        public string MerchantTransactionId { get; set; } = string.Empty;

        [JsonPropertyName("merchantUserId")]
        public string MerchantUserId { get; set; } = string.Empty;

        [JsonPropertyName("amount")]
        public long AmountInPaise { get; set; }

        [JsonPropertyName("redirectUrl")]
        public string RedirectUrl { get; set; } = string.Empty;

        [JsonPropertyName("redirectMode")]
        public string RedirectMode { get; set; } = "REDIRECT";

        [JsonPropertyName("callbackUrl")]
        public string CallbackUrl { get; set; } = string.Empty;

        [JsonPropertyName("mobileNumber")]
        public string MobileNumber { get; set; } = string.Empty;

        [JsonPropertyName("paymentInstrument")]
        public PhonePePaymentInstrument PaymentInstrument { get; set; } = new();
    }

    public class PhonePePaymentInstrument
    {
        [JsonPropertyName("type")]
        public string Type { get; set; } = "PAY_PAGE";
    }

    public class PhonePeApiResponse<T>
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("code")]
        public string Code { get; set; } = string.Empty;

        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;

        [JsonPropertyName("data")]
        public T? Data { get; set; }
    }

    public class PhonePePayData
    {
        [JsonPropertyName("merchantId")]
        public string MerchantId { get; set; } = string.Empty;

        [JsonPropertyName("merchantTransactionId")]
        public string MerchantTransactionId { get; set; } = string.Empty;

        [JsonPropertyName("instrumentResponse")]
        public PhonePeInstrumentResponse? InstrumentResponse { get; set; }
    }

    public class PhonePeInstrumentResponse
    {
        [JsonPropertyName("type")]
        public string Type { get; set; } = string.Empty;

        [JsonPropertyName("redirectInfo")]
        public PhonePeRedirectInfo? RedirectInfo { get; set; }
    }

    public class PhonePeRedirectInfo
    {
        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;

        [JsonPropertyName("method")]
        public string Method { get; set; } = string.Empty;
    }

    public class PhonePeStatusData
    {
        [JsonPropertyName("merchantId")]
        public string MerchantId { get; set; } = string.Empty;

        [JsonPropertyName("merchantTransactionId")]
        public string MerchantTransactionId { get; set; } = string.Empty;

        [JsonPropertyName("transactionId")]
        public string TransactionId { get; set; } = string.Empty;

        [JsonPropertyName("amount")]
        public long Amount { get; set; }

        [JsonPropertyName("state")]
        public string State { get; set; } = string.Empty;

        [JsonPropertyName("responseCode")]
        public string ResponseCode { get; set; } = string.Empty;
    }

    // In-memory order tracking record
    public class OrderRecord
    {
        public string MerchantTransactionId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Pincode { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
        public string Status { get; set; } = "PENDING"; // PENDING, SUCCESS, FAILED
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
