"use client";

import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const pathname = usePathname();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

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
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AppSidebar visible={isSidebarVisible} />
      </div>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarVisible ? "pl-64" : ""}`}>
        <div className="flex min-h-screen items-center justify-center p-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
