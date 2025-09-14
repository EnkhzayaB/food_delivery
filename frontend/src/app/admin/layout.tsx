"use client";
import { CartProvider } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Admin эрх шалгах
  const isAdmin =
    user?.publicMetadata?.role === "admin" ||
    user?.privateMetadata?.role === "admin";

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/sign-in");
        return;
      }

      if (!isAdmin) {
        router.push("/");
        return;
      }
    }
  }, [isLoaded, isSignedIn, isAdmin, router]);

  // Loading хүлээх
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Admin биш бол хоосон харуулах (redirect хийгдэж байгаа)
  if (!isSignedIn || !isAdmin) {
    return null;
  }

  return <CartProvider>{children}</CartProvider>;
}
export default Layout;
