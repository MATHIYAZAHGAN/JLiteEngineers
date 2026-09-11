using System.Threading.Tasks;
using JLITE.API.Models;
using JLITE.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace JLITE.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuoteController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public QuoteController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitQuote([FromBody] QuoteRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _emailService.SendQuoteEmailAsync(request);
            if (!success)
            {
                return StatusCode(500, new { message = "Failed to send quote request. Please try again later." });
            }

            return Ok(new { message = "Thank you! Your quote request has been submitted successfully." });
        }
    }
}
