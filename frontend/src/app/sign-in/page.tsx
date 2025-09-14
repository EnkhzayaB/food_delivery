"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            NomNom-д нэвтрэх
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Бүртгэлтэй бол эндээс нэвтэрнэ үү
          </p>
        </div>
        <div className="mt-8">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-red-500 hover:bg-red-600 text-sm normal-case",
                card: "shadow-lg",
                headerTitle: "text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton:
                  "border border-gray-300 hover:bg-gray-50",
                socialButtonsBlockButtonText: "text-gray-700",
                formFieldLabel: "text-gray-700",
                formFieldInput:
                  "border-gray-300 focus:border-red-500 focus:ring-red-500",
                footerActionLink: "text-red-600 hover:text-red-500",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
