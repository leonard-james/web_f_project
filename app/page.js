"use client";

import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";

export default function HomePage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="w-64">
          <AppSidebar />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col text-left gap-4 p-6 md:p-10">
          {/* Title with Toggle Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Final Project: Dynamic Web Application using Next.js and Tailwind CSS
            </h2>
          </div>
          {/* Description */}
          <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
            This project is all about building a modern, responsive website using powerful tools like Next.js and Tailwind CSS. You will practice real-world skills by connecting to an external API and presenting the data cleanly and interactively.
          </p>
        </div>
      </main>
    </div>
  );
}