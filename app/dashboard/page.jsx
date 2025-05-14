"use client";

import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import { Menu } from "lucide-react"; // Icon for menu

export default function HomePage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Sidebar (Overlay) */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarVisible(false)}
        >
          <div
            className="w-64 bg-white h-full p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <AppSidebar />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-64">
        <AppSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto flex flex-col gap-6 p-4 sm:p-6 md:p-10">
          {/* Header with Mobile Menu Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Final Project: Dynamic Web Application using Next.js and Tailwind CSS
            </h2>
            {/* Toggle Button (Mobile only) */}
            <button
              className="md:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={() => setIsSidebarVisible(true)}
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            This project is all about building a modern, responsive website using powerful tools like Next.js and Tailwind CSS. You will practice real-world skills by connecting to an external API and presenting the data cleanly and interactively.
          </p>
        </div>
      </main>
    </div>
  );
}
