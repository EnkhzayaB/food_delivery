// Environment configuration checker
export const checkGoogleAuthConfig = () => {
  const requiredEnvVars = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  };

  const missing = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error("❌ Missing environment variables:", missing);
    console.log(
      "📝 Please check your .env.local file and ensure these variables are set:"
    );
    missing.forEach((key) => console.log(`   - ${key}`));
    return false;
  }

  console.log("✅ All Google OAuth environment variables are configured");

  // Additional validation
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (clientId && !clientId.endsWith(".apps.googleusercontent.com")) {
    console.warn(
      "⚠️  GOOGLE_CLIENT_ID should end with '.apps.googleusercontent.com'"
    );
  }

  return true;
};

// Check configuration in development
if (process.env.NODE_ENV === "development") {
  checkGoogleAuthConfig();
}
