# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "Food Delivery App")
4. Click "Create"

## Step 2: Enable APIs

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for and enable these APIs:
   - **Google+ API** (for user profile)
   - **Gmail API** (optional, for email access)

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Configure the consent screen first if prompted:
   - Choose "External" user type
   - Fill in app name: "Food Delivery App"
   - Add your email as developer contact
   - Add scopes: `./auth/userinfo.email`, `./auth/userinfo.profile`
4. For the OAuth client:
   - Application type: "Web application"
   - Name: "Food Delivery Web Client"
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     ```

## Step 4: Configure Environment Variables

Create a file called `.env.local` in your frontend directory with:

```bash
# Replace with your actual Google OAuth credentials
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a-random-32-character-secret-key-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Step 5: Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

## Step 6: Test the Integration

1. Start your backend: `cd backend && npm run dev`
2. Start your frontend: `cd frontend && npm run dev`
3. Go to `http://localhost:3000/log`
4. Click "Continue with Google"
5. You should see Google's OAuth consent screen

## Troubleshooting

- **"redirect_uri_mismatch"**: Check your redirect URIs in Google Console
- **"invalid_client"**: Check your Client ID and Secret
- **"access_blocked"**: Make sure your OAuth consent screen is configured
- **Backend connection fails**: Check your backend is running on port 8000

## Testing with Real Gmail

Once configured, you can test with:

- Your own Gmail account
- Any Gmail account (they'll see the consent screen)
- Google Workspace accounts (if configured)
