import React from "react";
import Link from "next/link";

export default function HomeSidebar() {
  return (
    <nav className="w-full bg-gray-100 border-b shadow flex items-center px-4 py-3 gap-6">
      <Link href="/" className="font-bold text-lg text-blue-600 hover:text-blue-800 transition">Home</Link>
      <Link href="/user_profile" className="text-gray-700 hover:text-blue-600 transition">User Profile</Link>
      <Link href="/posts" className="text-gray-700 hover:text-green-600 transition">Posts</Link>
      <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition">Dashboard</Link>
    </nav>
  );
} 