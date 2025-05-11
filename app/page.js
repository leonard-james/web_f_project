"use client";

import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { UserProfile } from "@/components/user-profile"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export default function Page() {
  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case "/user_profile":
        return <UserProfile />;
      case "/posts":
        return <div>Posts Content</div>;
      case "/dashboard":
        return <div>Dashboard Content</div>;
      default:
        return (
          <>
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center py-10 px-2 sm:px-4 md:px-8">
              <img src="/main%20pagae.png" alt="Main Page" className="w-full max-w-4xl rounded-lg shadow mb-8 object-cover" />
              <div className="bg-white rounded-lg shadow p-4 sm:p-6 md:p-8 w-full max-w-3xl text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Final Project: Dynamic Web Application using Next.js and Tailwind CSS</h2>

                <p className="text-gray-700 text-base md:text-lg">
                  This project is all about building a modern, responsive website with Next.js and Tailwind CSS. You'll practice real-world skills by connecting to an external API and showing the data in a clean, user-friendly way.
                </p>
              </div>
            </div>
            <div className="px-4 lg:px-6">
              {/* Default content */}
            </div>
          </>
        );
    }
  };

  return renderContent();
}
