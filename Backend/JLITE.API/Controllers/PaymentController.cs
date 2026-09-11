using System.IO;
using System.Text;
using System.Threading.Tasks;
using JLITE.API.Models;
using JLITE.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace JLITE.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPhonePeService _phonePeService;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(IPhonePeService phonePeService, ILogger<PaymentController> logger)
        {
            _phonePeService = phonePeService;
            _logger = logger;
        }

        /// <summary>
        /// Initiates a PhonePe Payment Transaction for products checkout
        /// </summary>
        [HttpPost("initiate")]
        public async Task<IActionResult> InitiatePayment([FromBody] CreatePaymentRequest request)
        {
            if (request == null || request.Items == null || request.Items.Count == 0)
            {
                return BadRequest(new { success = false, message = "Cart items cannot be empty." });
            }

            if (string.IsNullOrWhiteSpace(request.CustomerName) || string.IsNullOrWhiteSpace(request.CustomerPhone))
            {
                return BadRequest(new { success = false, message = "Customer name and phone number are required." });
            }

            _logger.LogInformation("Payment initiation request received for {CustomerName}, Amount: ₹{Amount}", request.CustomerName, request.TotalAmount);

            var result = await _phonePeService.InitiatePaymentAsync(request);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Checks the payment status of a given merchant transaction ID
        /// </summary>
        [HttpGet("status/{merchantTransactionId}")]
        public async Task<IActionResult> GetStatus(string merchantTransactionId)
        {
            if (string.IsNullOrWhiteSpace(merchantTransactionId))
            {
                return BadRequest(new { success = false, message = "Transaction ID is required." });
            }

            _logger.LogInformation("Checking status for transaction: {TxnId}", merchantTransactionId);

            var result = await _phonePeService.CheckStatusAsync(merchantTransactionId);
            return Ok(result);
        }

        /// <summary>
        /// Server-to-Server Callback / Webhook handler for PhonePe
        /// </summary>
        [HttpPost("callback")]
        public async Task<IActionResult> Callback()
        {
            try
            {
                using var reader = new StreamReader(Request.Body, Encoding.UTF8);
                string payload = await reader.ReadToEndAsync();
                string xVerify = Request.Headers["X-VERIFY"].ToString();

                _logger.LogInformation("PhonePe Webhook callback received. X-VERIFY: {Header}", xVerify);

                await _phonePeService.ProcessCallbackAsync(payload, xVerify);
                return Ok(new { success = true });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error processing PhonePe callback");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
    }
}
