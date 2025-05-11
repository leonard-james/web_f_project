"use client";

import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const pathname = usePathname();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility state

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev); // Toggle the sidebar visibility
  };

  const renderContent = () => {
    switch (pathname) {
      case "/user_profile":
        return (
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col items-center text-center p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              User Profile
            </h2>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
              This is the user profile page. The content adjusts dynamically based on the sidebar state.
            </p>
          </div>
        );
      case "/posts":
        return <div>Posts Content</div>;
      case "/dashboard":
        return <div>Dashboard Content</div>;
      default:
        return (
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col items-center text-center p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Final Project: Dynamic Web Application using Next.js and Tailwind CSS
            </h2>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
              This project is all about building a modern, responsive website using powerful tools like Next.js and Tailwind CSS. You will practice real-world skills by connecting to an external API and presenting the data cleanly and interactively.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Sidebar toggle icon */}
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-all"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar rendered as fixed on the left */}
      {isSidebarVisible && (
        <div className="fixed top-0 left-0 h-full w-64 transition-all duration-300">
          <AppSidebar />
        </div>
      )}

      {/* Main content container gets left padding if sidebar is visible */}
      <div className={`transition-all duration-300 ${isSidebarVisible ? "pl-64" : ""}`}>
        <div className="flex min-h-screen items-center justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
