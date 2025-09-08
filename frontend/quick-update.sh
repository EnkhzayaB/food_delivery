#!/bin/bash

echo "🔧 Quick Google OAuth Update"
echo "============================"
echo ""
echo "Current placeholder values:"
grep "GOOGLE_CLIENT" .env.local
echo ""
echo "Enter your real Google OAuth credentials:"
echo ""

read -p "Google Client ID (from Google Cloud Console): " CLIENT_ID
read -p "Google Client Secret (from Google Cloud Console): " CLIENT_SECRET

echo ""
echo "Updating .env.local..."

# Create backup
cp .env.local .env.local.backup

# Update credentials
sed -i '' "s|GOOGLE_CLIENT_ID=.*|GOOGLE_CLIENT_ID=$CLIENT_ID|" .env.local
sed -i '' "s|GOOGLE_CLIENT_SECRET=.*|GOOGLE_CLIENT_SECRET=$CLIENT_SECRET|" .env.local

echo "✅ Updated! New values:"
grep "GOOGLE_CLIENT" .env.local
echo ""
echo "🚀 Now restart your dev server:"
echo "   1. Stop current server (Ctrl+C)"
echo "   2. Run: npm run dev"
echo "   3. Test at: http://localhost:3001/log"
