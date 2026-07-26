# Angular + .NET Backend Integration Guide

## ✅ What Has Been Done

### Backend (.NET Web API)
✅ Created ASP.NET Core Web API project structure
✅ Added Controllers for Contact & Quote forms
✅ Created Models with validation
✅ Implemented Email Service (SMTP)
✅ Configured CORS for Angular
✅ Added Swagger for API testing

### Frontend (Angular)
✅ Created API Service (`src/app/services/api.service.ts`)
✅ Added environment configuration files
✅ Updated `contact.component.ts` to use backend API
✅ Updated `get-quote.component.ts` to use backend API
✅ Added HttpClient to app configuration

---

## 🚀 Setup Steps

### Step 1: Start the Backend

```bash
# Navigate to backend folder
cd Backend/JLITE.API

# Restore packages
dotnet restore

# Edit appsettings.json - Add your Gmail credentials
# SmtpUser: your-email@gmail.com
# SmtpPassword: your-gmail-app-password (not regular password!)

# Run the API
dotnet run
```

Note the port (usually `https://localhost:7001`).

### Step 2: Update Angular Environment

Edit `src/environments/environment.ts` and update the `apiUrl`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api'  // Match your backend port
};
```

### Step 3: Run Angular App

```bash
# In the root folder (where package.json is)
npm install
ng serve
```

Open `http://localhost:4200`

---

## 🧪 Testing

### Test Backend API (Swagger)
1. Open: `https://localhost:7001/swagger`
2. Try POST `/api/contact` with sample data
3. Try POST `/api/quote` with sample data

### Test Full Integration
1. Open Angular app: `http://localhost:4200`
2. Navigate to Contact form
3. Fill and submit - check backend console for logs
4. Check email inbox for received messages

---

## 📧 Gmail Setup (Important!)

To send emails via Gmail:

1. **Enable 2-Step Verification** on your Google Account
2. **Generate App Password:**
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Scroll down to "App passwords"
   - Generate new app password for "Mail"
3. **Use App Password** in `appsettings.json` (NOT your regular password)

---

## 🔧 Configuration Files

### Backend: `Backend/JLITE.API/appsettings.json`
```json
{
  "Email": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": "587",
    "SmtpUser": "your-email@gmail.com",
    "SmtpPassword": "your-16-char-app-password",
    "ToAddress": "jlite2025@gmail.com",
    "QuoteAddress": "jlite@jliteengineers.com"
  }
}
```

### Frontend: `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api'
};
```

---

## 🐛 Common Issues

### CORS Error
**Error:** "Access to fetch at 'https://localhost:7001/api/contact' from origin 'http://localhost:4200' has been blocked by CORS policy"

**Fix:** Ensure backend `Program.cs` has:
```csharp
app.UseCors("AllowAngularApp");
```

### SSL Certificate Error
**Error:** "NET::ERR_CERT_AUTHORITY_INVALID"

**Fix:** In development, Angular will accept self-signed certs. If issues persist:
```bash
dotnet dev-certs https --trust
```

### Email Not Sending
**Error:** "Authentication failed"

**Fix:**
- Use Gmail App Password (not regular password)
- Enable 2-Step Verification first
- Check SMTP port (587 for TLS)

---

## 📦 Project Structure

```
.
├── Backend/
│   └── JLITE.API/
│       ├── Controllers/          # API endpoints
│       ├── Models/               # Request models
│       ├── Services/             # Email service
│       ├── Program.cs            # App configuration
│       └── appsettings.json      # Email/SMTP config
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── contact/          # ✅ Updated to use API
│   │   │   └── get-quote/        # ✅ Updated to use API
│   │   └── services/
│   │       └── api.service.ts    # ✅ HTTP service
│   └── environments/
│       ├── environment.ts        # ✅ Dev API URL
│       └── environment.prod.ts   # ✅ Prod API URL
```

---

## 🌐 Production Deployment

### Backend (Azure/IIS/Linux)
1. Update CORS to allow production domain
2. Use secure config (Azure Key Vault, environment variables)
3. Publish: `dotnet publish -c Release`

### Frontend
1. Update `environment.prod.ts` with production API URL
2. Build: `ng build --configuration production`
3. Deploy `dist/` folder to hosting

---

## 📝 Next Steps

- [ ] Set up Gmail App Password
- [ ] Test contact form end-to-end
- [ ] Test quote form end-to-end
- [ ] Optional: Add database to store submissions
- [ ] Optional: Add admin panel to view submissions
- [ ] Deploy to production

---

## 🆘 Need Help?

Check the logs:
- **Backend:** Terminal where `dotnet run` is running
- **Frontend:** Browser DevTools → Console → Network tab
- **Email errors:** Backend console shows detailed SMTP errors

---

**You're all set!** Your Angular frontend is now connected to a .NET backend. 🎉
