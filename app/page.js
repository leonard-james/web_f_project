"use client";

import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { UserProfile } from "@/components/user-profile";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

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
          <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col items-center text-center p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Final Project: Dynamic Web Application using Next.js and Tailwind CSS
              </h2>
              <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
                This project is all about building a modern, responsive website using
                powerful tools like Next.js and Tailwind CSS. You will practice real-world
                skills by connecting to an external API and presenting the data cleanly and
                interactively.
              </p>
            </div>
          </div>
        );
    }
  };

  return renderContent();
}
