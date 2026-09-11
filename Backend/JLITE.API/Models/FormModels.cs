using System.ComponentModel.DataAnnotations;

namespace JLITE.API.Models
{
    public class ContactRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = string.Empty;

        public string? Subject { get; set; }

        [Required(ErrorMessage = "Message is required")]
        public string Message { get; set; } = string.Empty;
    }

    public class QuoteRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone is required")]
        public string Phone { get; set; } = string.Empty;

        public string? Company { get; set; }

        [Required(ErrorMessage = "Project type is required")]
        public string ProjectType { get; set; } = string.Empty;

        public string? SiteType { get; set; }
        public string? Quantity { get; set; }
        public string? Budget { get; set; }
        public string? Location { get; set; }
        public string? Timeline { get; set; }
        public string? Urgency { get; set; }
        public string? Details { get; set; }
    }
}
