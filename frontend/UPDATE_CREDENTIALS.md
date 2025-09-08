# 🔑 Update Google OAuth Credentials

## 🚨 The Problem

You still have placeholder credentials in your `.env.local` file:

```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📋 Step-by-Step Fix:

### Step 1: Get Your Real Credentials

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your **OAuth 2.0 Client IDs** section
3. Click on your client ID (should be there already)
4. Copy both:
   - **Client ID** (ends with `.apps.googleusercontent.com`)
   - **Client secret** (starts with `GOCSPX-`)

### Step 2: Update .env.local File

Open `/Users/enkhzaya/Desktop/food_delivery/frontend/.env.local` and replace:

**FROM:**

```bash
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**TO:**

```bash
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_actual_secret_here
```

### Step 3: Update Redirect URI (Important!)

In Google Cloud Console, make sure your OAuth client has this redirect URI:

```
http://localhost:3001/api/auth/callback/google
```

### Step 4: Restart Your App

```bash
# Stop current server (Ctrl+C in terminal)
npm run dev
```

## 🧪 Test:

Go to http://localhost:3001/log and click "Continue with Google"

## 💡 Quick Check:

Your real Google Client ID should look like:

- `123456789-abc123def456ghi789.apps.googleusercontent.com`

Your real Google Client Secret should look like:

- `GOCSPX-AbCdEf123456789`

---

**🎯 Once you update these, Google sign-in will work immediately!**
