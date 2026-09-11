using System.Threading.Tasks;
using JLITE.API.Models;
using JLITE.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace JLITE.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public ContactController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitContact([FromBody] ContactRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _emailService.SendContactEmailAsync(request);
            if (!success)
            {
                return StatusCode(500, new { message = "Failed to send email. Please try again later." });
            }

            return Ok(new { message = "Thank you! Your message has been sent successfully." });
        }
    }
}
