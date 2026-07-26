# JLITE Backend API - Setup Instructions

## Prerequisites
- .NET 8.0 SDK or later
- Visual Studio 2022 / VS Code / Rider

## Quick Start

### 1. Navigate to Backend Folder
```bash
cd Backend/JLITE.API
```

### 2. Restore Dependencies
```bash
dotnet restore
```

### 3. Configure Email Settings
Edit `appsettings.json` and update the email configuration:

```json
{
  "Email": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": "587",
    "SmtpUser": "your-email@gmail.com",
    "SmtpPassword": "your-gmail-app-password",
    "ToAddress": "jlite2025@gmail.com",
    "QuoteAddress": "jlite@jliteengineers.com"
  }
}
```

**For Gmail:**
- Go to Google Account → Security → 2-Step Verification
- Generate an "App Password" (not your regular password)
- Use that app password in `SmtpPassword`

### 4. Run the API
```bash
dotnet run
```

The API will start at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:7001` (default)

### 5. Test with Swagger
Open browser: `https://localhost:7001/swagger`

## API Endpoints

### POST /api/contact
Submit contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I need help with..."
}
```

### POST /api/quote
Submit quote request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "company": "ABC Ltd",
  "projectType": "Electrical Installation",
  "siteType": "Commercial",
  "quantity": "10 units",
  "budget": "₹2,00,000 – ₹10,00,000",
  "location": "Chennai",
  "timeline": "2 months",
  "urgency": "Standard (1–2 weeks)",
  "details": "Additional project details..."
}
```

## CORS Configuration
By default, the API allows requests from `http://localhost:4200` (Angular dev server).

To add more origins, edit `Program.cs`:
```csharp
policy.WithOrigins("http://localhost:4200", "https://yoursite.com")
```

## Production Deployment

### Update CORS for Production
```csharp
policy.WithOrigins("https://your-production-domain.com")
```

### Secure Configuration
- Use environment variables or Azure Key Vault for email credentials
- Never commit `appsettings.json` with real passwords
- Use `appsettings.Production.json` for production settings

## Troubleshooting

**Email not sending:**
- Check SMTP credentials
- Ensure "Less secure app access" is OFF and use App Password for Gmail
- Check firewall/antivirus blocking port 587

**CORS errors:**
- Verify Angular app URL matches the CORS policy
- Check browser console for specific CORS error messages
