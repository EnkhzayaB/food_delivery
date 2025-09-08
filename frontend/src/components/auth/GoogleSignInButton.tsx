"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface GoogleSignInButtonProps {
  text?: string;
  className?: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

export const GoogleSignInButton = ({
  text = "Continue with Google",
  className = "",
  onSuccess,
  onError,
}: GoogleSignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Check if Google OAuth is configured
  const isConfigured =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_GOOGLE_CONFIGURED !== "false";

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      console.log("Starting Google sign in...");

      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      console.log("Google sign in result:", result);

      if (result?.error) {
        console.error("Google sign in error:", result.error);
        let errorMessage = "Failed to sign in with Google.";

        switch (result.error) {
          case "OAuthSignin":
            errorMessage =
              "Error constructing OAuth URL. Check your Google OAuth configuration.";
            break;
          case "OAuthCallback":
            errorMessage =
              "Error handling OAuth callback. Check your redirect URI.";
            break;
          case "OAuthCreateAccount":
            errorMessage = "Could not create user account. Please try again.";
            break;
          case "EmailCreateAccount":
            errorMessage =
              "Email address already in use with different provider.";
            break;
          case "Callback":
            errorMessage = "Error in callback. Please check server logs.";
            break;
          case "OAuthAccountNotLinked":
            errorMessage =
              "Account exists with different provider. Try signing in with email.";
            break;
          default:
            errorMessage = `Authentication error: ${result.error}`;
        }

        onError?.(errorMessage);
      } else if (result?.ok) {
        console.log("Google sign in successful");
        onSuccess?.(result);
        // Redirect to home page or dashboard
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      onError?.("Network error. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )}
      <span className="text-gray-700 font-medium">{text}</span>
    </button>
  );
};
