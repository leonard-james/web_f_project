import React from "react";
import Link from "next/link";

export default function HomeSidebar() {
  return (
    <nav className="w-full bg-gray-100 border-b shadow flex flex-col items-center px-4 py-3 gap-2">
      <div className="flex gap-4 mb-2">
        <Link href="/" className="px-4 py-2 rounded font-bold text-lg bg-yellow-400 text-white hover:bg-yellow-500 transition">Home</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/user_profile" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">User Profile</Link>
        <Link href="/posts" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">Posts</Link>
        <Link href="/dashboard" className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition">Dashboard</Link>
      </div>
    </nav>
  );
} 