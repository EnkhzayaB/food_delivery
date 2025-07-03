"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#1c1c1f] text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-8 h-8" />
        <div>
          <h1 className="font-bold text-xl">
            Nom<span className="text-red-500">Nom</span>
          </h1>
          <p className="text-sm text-gray-300">Swift delivery</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/register">
          <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
            Sign up
          </button>
        </Link>
        <Link href="/log">
          <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
            Log in
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
