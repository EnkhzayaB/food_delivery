# 🔑 Get Your Google OAuth Credentials

## ✅ Status: Environment file created!

Your app should now start without errors. The Google Sign-In button will show an error message until you complete this setup.

## 🚀 Quick Setup (5 minutes)

### Step 1: Go to Google Cloud Console

👉 **Click here**: https://console.cloud.google.com

### Step 2: Create/Select Project

- Click "Select a project" → "New Project"
- Name: "Food Delivery App" (or any name)
- Click "Create"

### Step 3: Enable Google+ API

- Go to "APIs & Services" → "Library"
- Search: "Google+ API"
- Click it and press "Enable"

### Step 4: Create OAuth Credentials

- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth 2.0 Client IDs"

#### First-time setup (OAuth Consent Screen):

- Choose "External" user type
- App name: "Food Delivery App"
- User support email: your email
- Developer contact: your email
- Click "Save and Continue" through all steps

#### Create the OAuth Client:

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
- Click "Create"

### Step 5: Copy Your Credentials

You'll see a popup with:

- **Client ID**: `123456789.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-abcdefghijklmnop`

### Step 6: Update Your .env.local

Replace the placeholder values in `/frontend/.env.local`:

```bash
# Replace these lines:
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# With your actual credentials:
GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnop
```

### Step 7: Restart Your App

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

## 🎉 Test It!

1. Go to `http://localhost:3000/log`
2. Click "Continue with Google"
3. You should see Google's real sign-in screen!

## 🆘 Need Help?

- **"redirect_uri_mismatch"**: Check your redirect URI exactly matches
- **"invalid_client"**: Double-check your Client ID and Secret
- **Still not working?**: Check the detailed guide in `GOOGLE_OAUTH_SETUP.md`

---

**💡 Tip**: Keep your Client Secret private! Never commit it to version control.
