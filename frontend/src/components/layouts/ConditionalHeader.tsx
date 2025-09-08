"use client";
import { usePathname } from "next/navigation";
import { Header } from "./Header";

export const ConditionalHeader = () => {
  const pathname = usePathname();

  // Don't show header on auth pages (register, log) or admin pages
  const hideHeader =
    pathname.startsWith("/register") ||
    pathname.startsWith("/log") ||
    pathname.startsWith("/admin");

  if (hideHeader) {
    return null;
  }

  return <Header />;
};
