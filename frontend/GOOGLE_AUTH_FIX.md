# 🔧 Fix Google OAuth "Invalid Client" Error

## 🎯 The Issue

You're getting "Error 401: invalid_client" because your `.env.local` still has placeholder values.

## ✅ Quick Fix (2 steps):

### Step 1: Get Your Real Credentials from Google Cloud Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID (it should be there already)
3. Click on it to see the details
4. Copy the **Client ID** and **Client Secret**

### Step 2: Update Your .env.local File

Replace the placeholder values in `/Users/enkhzaya/Desktop/food_delivery/frontend/.env.local`:

**Current (placeholder values):**

```bash
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Replace with your real values:**

```bash
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_real_secret_here
```

### Step 3: Verify Redirect URI

Make sure in Google Cloud Console your OAuth client has this exact redirect URI:

```
http://localhost:3000/api/auth/callback/google
```

### Step 4: Restart the App

```bash
# Stop the current dev server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

## 🔍 Double-Check Checklist:

- ✅ OAuth consent screen is configured
- ✅ Redirect URI: `http://localhost:3000/api/auth/callback/google`
- ✅ JavaScript origins: `http://localhost:3000`
- ✅ Real Client ID (ends with `.apps.googleusercontent.com`)
- ✅ Real Client Secret (starts with `GOCSPX-`)
- ✅ App restarted after updating `.env.local`

## 🎉 Success Test:

Once fixed, you should see Google's account selection screen instead of the error page!

---

**📞 Need help?** The error shows you're very close - Google is responding to your OAuth request!
