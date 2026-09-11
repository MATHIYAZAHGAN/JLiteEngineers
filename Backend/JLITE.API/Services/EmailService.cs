using JLITE.API.Models;
using System.Net;
using System.Net.Mail;

namespace JLITE.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendContactEmailAsync(ContactRequest request)
        {
            try
            {
                var emailBody = $@"
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> {request.Name}</p>
                    <p><strong>Email:</strong> {request.Email}</p>
                    <p><strong>Subject:</strong> {request.Subject ?? "New Enquiry from JLite Website"}</p>
                    <p><strong>Message:</strong></p>
                    <p>{request.Message}</p>
                    <hr>
                    <p><em>Reply to: {request.Email}</em></p>
                ";

                return await SendEmailAsync(
                    to: _configuration["Email:ToAddress"] ?? "jlite2025@gmail.com",
                    subject: request.Subject ?? "New Contact Form Submission",
                    body: emailBody,
                    replyTo: request.Email
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending contact email");
                return false;
            }
        }

        public async Task<bool> SendQuoteEmailAsync(QuoteRequest request)
        {
            try
            {
                var emailBody = $@"
                    <h2>New Quote Request</h2>
                    <table style='border-collapse: collapse; width: 100%;'>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Name:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Name}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Email:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Email}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Phone:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Phone}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Company:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Company ?? "N/A"}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Project Type:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.ProjectType}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Site Type:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.SiteType ?? "N/A"}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Quantity:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Quantity ?? "N/A"}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Budget:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Budget ?? "N/A"}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Location:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Location ?? "N/A"}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Timeline:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Timeline ?? "N/A"}</td></tr>
                        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Urgency:</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{request.Urgency ?? "N/A"}</td></tr>
                    </table>
                    <h3>Additional Details:</h3>
                    <p>{request.Details ?? "N/A"}</p>
                    <hr>
                    <p><em>Reply to: {request.Email}</em></p>
                ";

                return await SendEmailAsync(
                    to: _configuration["Email:QuoteAddress"] ?? "jlite@jliteengineers.com",
                    subject: $"Quote Request – {request.ProjectType} | {request.Name}",
                    body: emailBody,
                    replyTo: request.Email
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending quote email");
                return false;
            }
        }

        public async Task<bool> SendOrderConfirmationEmailAsync(OrderRecord order)
        {
            try
            {
                var itemRows = string.Join("", order.Items.Select(i => $@"
                    <tr>
                        <td style='padding: 8px; border: 1px solid #ddd;'>{i.Name}</td>
                        <td style='padding: 8px; border: 1px solid #ddd; text-align: center;'>{i.Quantity}</td>
                        <td style='padding: 8px; border: 1px solid #ddd; text-align: right;'>₹{i.Price:N2}</td>
                        <td style='padding: 8px; border: 1px solid #ddd; text-align: right;'>₹{(i.Price * i.Quantity):N2}</td>
                    </tr>
                "));

                var emailBody = $@"
                    <h2>🎉 Order Confirmed! (JLite Engineers)</h2>
                    <p>Dear <strong>{order.CustomerName}</strong>,</p>
                    <p>Thank you for choosing JLite Engineers! Your order has been placed successfully via PhonePe.</p>

                    <h3>Order Summary</h3>
                    <p><strong>Transaction ID:</strong> {order.MerchantTransactionId}</p>
                    <p><strong>Date:</strong> {order.CreatedAt:dd MMM yyyy, hh:mm tt} UTC</p>
                    <p><strong>Shipping Address:</strong> {order.ShippingAddress}, {order.City} - {order.Pincode}</p>
                    <p><strong>Phone:</strong> {order.CustomerPhone}</p>

                    <table style='border-collapse: collapse; width: 100%; margin-top: 15px;'>
                        <thead>
                            <tr style='background-color: #f2f2f2;'>
                                <th style='padding: 8px; border: 1px solid #ddd; text-align: left;'>Product</th>
                                <th style='padding: 8px; border: 1px solid #ddd; text-align: center;'>Qty</th>
                                <th style='padding: 8px; border: 1px solid #ddd; text-align: right;'>Unit Price</th>
                                <th style='padding: 8px; border: 1px solid #ddd; text-align: right;'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemRows}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan='3' style='padding: 8px; border: 1px solid #ddd; text-align: right;'>Grand Total:</th>
                                <th style='padding: 8px; border: 1px solid #ddd; text-align: right;'>₹{order.TotalAmount:N2}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <br>
                    <p>We will prepare your dispatch shortly. For queries, contact us at <a href='mailto:jlite2025@gmail.com'>jlite2025@gmail.com</a> or +91 73581 78174.</p>
                ";

                // Send copy to customer
                await SendEmailAsync(
                    to: order.CustomerEmail,
                    subject: $"Order Confirmation – JLite Engineers ({order.MerchantTransactionId})",
                    body: emailBody
                );

                // Send notification copy to admin
                await SendEmailAsync(
                    to: _configuration["Email:ToAddress"] ?? "jlite2025@gmail.com",
                    subject: $"New Order Received [{order.MerchantTransactionId}] - ₹{order.TotalAmount:N2}",
                    body: emailBody
                );

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending order confirmation email");
                return false;
            }
        }

        private async Task<bool> SendEmailAsync(string to, string subject, string body, string? replyTo = null)
        {
            var smtpHost = _configuration["Email:SmtpHost"] ?? "smtp.gmail.com";
            var smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
            var smtpUser = _configuration["Email:SmtpUser"];
            var smtpPass = _configuration["Email:SmtpPassword"];

            if (string.IsNullOrEmpty(smtpUser) || string.IsNullOrEmpty(smtpPass))
            {
                _logger.LogWarning("Email credentials not configured. Email not sent.");
                return false;
            }

            using var client = new SmtpClient(smtpHost, smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(smtpUser, smtpPass)
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpUser),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mailMessage.To.Add(to);

            if (!string.IsNullOrEmpty(replyTo))
            {
                mailMessage.ReplyToList.Add(replyTo);
            }

            await client.SendMailAsync(mailMessage);
            return true;
        }
    }
}
