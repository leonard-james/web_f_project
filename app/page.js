"use client";

import "./globals.css";
import { Menu } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 p-4 md:p-10 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto flex flex-col text-left gap-4 p-4 sm:p-6 md:p-10">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Final Project: Dynamic Web Application using Next.js and Tailwind CSS
          </h2>
        </div>
        {/* Description */}
        <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
          This project is all about building a modern, responsive website using powerful tools like Next.js and Tailwind CSS. You will practice real-world skills by connecting to an external API and presenting the data cleanly and interactively.
        </p>
      </div>
    </main>
  );
}
