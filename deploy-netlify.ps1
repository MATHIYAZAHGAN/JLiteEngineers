# Quick Netlify Deployment Script
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  JLITE - Netlify Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if Netlify CLI is installed
Write-Host "[1/4] Checking Netlify CLI..." -ForegroundColor Yellow
if (!(Get-Command netlify -ErrorAction SilentlyContinue)) {
    Write-Host "Netlify CLI not found. Installing..." -ForegroundColor Red
    npm install -g netlify-cli
}
Write-Host "Netlify CLI found!" -ForegroundColor Green
Write-Host ""

# Step 2: Build production
Write-Host "[2/4] Building production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}
Write-Host "Build successful!" -ForegroundColor Green
Write-Host ""

# Step 3: Deploy to Netlify
Write-Host "[3/4] Deploying to Netlify..." -ForegroundColor Yellow
Write-Host "(You may need to login on first run)" -ForegroundColor Gray
netlify deploy --prod --dir=dist/voltx/browser

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 4: Success
Write-Host "[4/4] Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your site is now live!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Copy the hosting URL from above" -ForegroundColor White
Write-Host "2. Update backend CORS with this URL" -ForegroundColor White
Write-Host "3. Test contact and quote forms" -ForegroundColor White
Write-Host ""
