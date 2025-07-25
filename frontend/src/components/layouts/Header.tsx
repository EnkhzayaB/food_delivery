"use client";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { ShoppingCart, User } from "lucide-react";

export const Header = () => {
  const { isLoggedIn, email, logout } = useAuth();

  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-8 h-8" />
        <div>
          <h1 className="font-bold text-xl">
            Nom<span className="text-red-500">Nom</span>
          </h1>
          <p className="text-sm text-gray-300">Swift delivery</p>
        </div>
      </div>

      <div className="flex gap-2 items-center md:gap-4">
        <ShoppingCart className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
        {isLoggedIn ? (
          <div className="relative group">
            <button className="bg-red-500 p-2 rounded-full">
              <User className="text-white" />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black p-4 shadow rounded top-full right-0">
              <p>{email}</p>
              <button
                onClick={logout}
                className="mt-2 bg-gray-200 px-2 py-1 rounded"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link href="/register">
              <button className="border border-white px-3 py-1 rounded">
                Sign up
              </button>
            </Link>
            <Link href="/log">
              <button className="bg-red-500 px-3 py-1 rounded">Log in</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
