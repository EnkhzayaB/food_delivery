#!/bin/bash

echo "🔧 Google OAuth Credentials Updater"
echo "===================================="
echo ""

echo "📋 Please enter your Google OAuth credentials:"
echo ""

read -p "🔑 Google Client ID (ends with .apps.googleusercontent.com): " CLIENT_ID
read -p "🔐 Google Client Secret (starts with GOCSPX-): " CLIENT_SECRET

echo ""
echo "📝 Updating .env.local file..."

# Backup current file
cp .env.local .env.local.backup

# Update the credentials
sed -i '' "s|GOOGLE_CLIENT_ID=.*|GOOGLE_CLIENT_ID=$CLIENT_ID|" .env.local
sed -i '' "s|GOOGLE_CLIENT_SECRET=.*|GOOGLE_CLIENT_SECRET=$CLIENT_SECRET|" .env.local

echo "✅ Credentials updated!"
echo ""
echo "📋 Current .env.local contents:"
echo "------------------------------"
cat .env.local
echo ""
echo "🚀 Now restart your dev server:"
echo "   1. Stop current server (Ctrl+C)"
echo "   2. Run: npm run dev"
echo "   3. Test Google sign-in!"
echo ""
echo "💾 Backup saved as .env.local.backup"
