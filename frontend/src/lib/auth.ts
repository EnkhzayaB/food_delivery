import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { checkGoogleAuthConfig } from "./check-env";

// Check configuration in development
if (process.env.NODE_ENV === "development") {
  checkGoogleAuthConfig();
}

// Temporarily allow app to start without Google credentials for setup
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn(
    "⚠️ Google OAuth credentials are missing. Google sign-in will not work until configured."
  );
  console.log(
    "📝 Follow the setup guide in GOOGLE_OAUTH_SETUP.md to get your credentials."
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Only include GoogleProvider if credentials are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                scope: "openid email profile",
                prompt: "select_account",
              },
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        console.log("Google sign in attempt:", {
          email: profile?.email,
          name: profile?.name,
        });
        try {
          // Send user data to your backend
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            }/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: profile?.email,
                name: profile?.name,
                googleId: profile?.sub,
                picture: profile?.picture,
              }),
            }
          );

          const result = await response.json();
          console.log("Backend response:", result);

          if (!response.ok) {
            console.error("Backend error:", result);
            return false;
          }

          return result.success;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/log",
    error: "/log",
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
