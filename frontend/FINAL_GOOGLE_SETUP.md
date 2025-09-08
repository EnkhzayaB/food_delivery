# 🔧 Final Google OAuth Setup

## ✅ Fixed Issues:

- ✅ Consolidated environment files
- ✅ Fixed port mismatch (now using 3001)
- ✅ Cleaned up conflicting variables

## 🚨 IMPORTANT: Update Google Cloud Console

Your app is now running on **port 3001**, so you need to update your redirect URI:

### Step 1: Go to Google Cloud Console

👉 https://console.cloud.google.com/apis/credentials

### Step 2: Edit Your OAuth Client

- Click on your OAuth 2.0 Client ID
- Update the **Authorized redirect URIs** to:
  ```
  http://localhost:3001/api/auth/callback/google
  ```
- Update the **Authorized JavaScript origins** to:
  ```
  http://localhost:3001
  ```
- Click **Save**

### Step 3: Add Your Real Credentials

Edit `/Users/enkhzaya/Desktop/food_delivery/frontend/.env.local`:

```bash
# Replace these lines:
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# With your actual credentials from Google Cloud Console
```

### Step 4: Restart Your App

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## 🎯 Test URLs:

- **Your app**: http://localhost:3001
- **Login page**: http://localhost:3001/log
- **Register page**: http://localhost:3001/register

## 🔍 Quick Test:

1. Go to http://localhost:3001/log
2. Click "Continue with Google"
3. Should now work properly!

---

**🎉 Once you update the redirect URI and credentials, Google sign-in will work perfectly!**
