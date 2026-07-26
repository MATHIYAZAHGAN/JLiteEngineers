# Quick Firebase Deployment Script
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  JLITE - Firebase Deployment Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if Firebase CLI is installed
Write-Host "[1/5] Checking Firebase CLI..." -ForegroundColor Yellow
if (!(Get-Command firebase -ErrorAction SilentlyContinue)) {
    Write-Host "Firebase CLI not found. Installing..." -ForegroundColor Red
    npm install -g firebase-tools
}
Write-Host "Firebase CLI found!" -ForegroundColor Green
Write-Host ""

# Step 2: Build production
Write-Host "[2/5] Building production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}
Write-Host "Build successful!" -ForegroundColor Green
Write-Host ""

# Step 3: Check build output
Write-Host "[3/5] Checking build output..." -ForegroundColor Yellow
if (Test-Path "dist/voltx/browser") {
    Write-Host "Build output found at dist/voltx/browser/" -ForegroundColor Green
} else {
    Write-Host "Build output not found! Check for errors." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 4: Deploy to Firebase
Write-Host "[4/5] Deploying to Firebase..." -ForegroundColor Yellow
firebase deploy --only hosting

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 5: Success
Write-Host "[5/5] Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your site is now live!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Copy the hosting URL from above" -ForegroundColor White
Write-Host "2. Update backend CORS with this URL" -ForegroundColor White
Write-Host "3. Test contact and quote forms" -ForegroundColor White
Write-Host ""
