import type { Metadata } from "next";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "NomNom - Authentication",
  description: "Sign in or sign up to your NomNom account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
