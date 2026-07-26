# 🚀 Frontend Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Backend is deployed and accessible online
- [ ] Update `src/environments/environment.prod.ts` with live backend URL
- [ ] Test the production build locally
- [ ] Configure CORS on backend to allow your live domain

---

## Option 1: Firebase Hosting (RECOMMENDED - Already Configured!)

### Prerequisites
- Firebase account (free tier available)
- Firebase CLI installed

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase (if needed)

```bash
firebase init hosting
```

Select:
- Use existing project or create new one
- Public directory: `dist/voltx/browser`
- Configure as single-page app: **Yes**
- Set up automatic builds: **No**

### Step 4: Build for Production

```bash
npm run build
```

This creates optimized files in `dist/voltx/browser/`

### Step 5: Deploy to Firebase

```bash
firebase deploy --only hosting
```

### Step 6: Get Your Live URL

After deployment, Firebase will give you a URL like:
```
https://your-project.web.app
```

### Step 7: Update Backend CORS

Add your Firebase URL to backend CORS in `Program.cs`:

```csharp
policy.WithOrigins(
    "http://localhost:4200",
    "https://your-project.web.app",
    "https://your-project.firebaseapp.com"
)
```

---

## Option 2: Netlify (Easy & Free)

### Method A: Netlify CLI

**Step 1: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**Step 2: Build**
```bash
npm run build
```

**Step 3: Deploy**
```bash
netlify deploy --prod --dir=dist/voltx/browser
```

### Method B: Drag & Drop (Easiest!)

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to: https://app.netlify.com/drop

3. Drag and drop the `dist/voltx/browser` folder

4. Get your live URL: `https://random-name.netlify.app`

### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  publish = "dist/voltx/browser"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Option 3: Vercel (Fast & Modern)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
vercel --prod
```

Follow prompts:
- Setup: Yes
- Which scope: Your account
- Link to existing: No
- Project name: jlite
- Directory: ./
- Override settings: No

### Step 3: Configure Build Settings

Vercel will auto-detect Angular. If needed, set:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/voltx/browser`

---

## Option 4: GitHub Pages (Free)

### Step 1: Install Angular CLI GitHub Pages Tool

```bash
npm install -g angular-cli-ghpages
```

### Step 2: Build for GitHub Pages

```bash
ng build --configuration production --base-href "/repository-name/"
```

### Step 3: Deploy

```bash
npx angular-cli-ghpages --dir=dist/voltx/browser
```

Your site will be at: `https://username.github.io/repository-name/`

---

## Option 5: Traditional Web Server (Apache/Nginx)

### Step 1: Build

```bash
npm run build
```

### Step 2: Upload Files

Upload everything in `dist/voltx/browser/` to your web server.

### Step 3: Configure Server

**For Apache (.htaccess):**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**For Nginx:**

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /var/www/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## 🔧 Post-Deployment Steps

### 1. Update Backend CORS

In `Backend/JLITE.API/Program.cs`:

```csharp
policy.WithOrigins(
    "http://localhost:4200",           // Development
    "https://yourdomain.com",          // Production
    "https://www.yourdomain.com"       // Production with www
)
```

### 2. Test Your Live Site

Visit your deployed URL and test:
- [ ] Contact form submits successfully
- [ ] Quote form submits successfully
- [ ] Check browser console for errors
- [ ] Test on mobile devices

### 3. Setup Custom Domain (Optional)

**Firebase:**
```bash
firebase hosting:channel:deploy production
```
Then add custom domain in Firebase Console.

**Netlify:**
Go to: Domain Settings → Add custom domain

**Vercel:**
Go to: Project Settings → Domains → Add

---

## 🚀 Quick Deploy Commands

### Firebase (Recommended)
```bash
npm run build
firebase deploy --only hosting
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist/voltx/browser
```

### Vercel
```bash
vercel --prod
```

---

## 🐛 Common Issues

### Issue 1: "Cannot GET /" or 404 on refresh

**Solution:** Configure server for SPA routing (see Option 5 above)

### Issue 2: API calls fail with CORS error

**Solution:** Add your live domain to backend CORS policy

### Issue 3: Assets not loading

**Solution:** Check `base-href` in build command:
```bash
ng build --base-href "/"
```

### Issue 4: Build fails

**Solution:** Clear cache and rebuild:
```bash
rm -rf node_modules dist .angular
npm install
npm run build
```

---

## 📊 Deployment Comparison

| Platform | Free Tier | SSL | Custom Domain | Speed | Ease |
|----------|-----------|-----|---------------|-------|------|
| **Firebase** | ✅ 10GB/month | ✅ Auto | ✅ Yes | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Netlify** | ✅ 100GB/month | ✅ Auto | ✅ Yes | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Vercel** | ✅ 100GB/month | ✅ Auto | ✅ Yes | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ✅ 1GB | ✅ Auto | ✅ Yes | ⭐⭐⭐ | ⭐⭐⭐ |

---

## 🎯 Recommended: Firebase Deployment

Since you already have Firebase configured, here's the **complete workflow**:

```bash
# 1. Update production environment
# Edit src/environments/environment.prod.ts with your backend URL

# 2. Build
npm run build

# 3. Test locally
cd dist/voltx/browser
npx http-server -p 8080

# 4. Deploy to Firebase
firebase deploy --only hosting

# 5. Get your URL
firebase hosting:channel:list
```

Your site will be live at: `https://your-project.web.app` 🎉

---

## 📝 Notes

- Always test production build locally before deploying
- Update backend CORS after deployment
- Use environment variables for sensitive data
- Enable HTTPS (most platforms do this automatically)
- Monitor build size: `npm run build -- --stats-json`

---

## 🆘 Need Help?

If deployment fails:
1. Check build output for errors
2. Verify all dependencies are installed
3. Test production build locally
4. Check platform-specific logs
5. Verify backend is accessible from the internet

---

**You're ready to deploy!** Choose a platform and follow the steps above. 🚀
