"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/CartContext";

function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/log");
      return;
    }

    if (role !== "ADMIN") {
      router.push("/");
      return;
    }
  }, [isLoggedIn, role, router]);

  // Show loading while checking auth
  if (!isLoggedIn || role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Checking permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
export default Layout;
