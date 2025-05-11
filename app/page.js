"use client";

import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { UserProfile } from "@/components/user-profile";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl flex flex-col lg:flex-row overflow-hidden mx-auto">
              {/* Left: Image */}
              <div className="w-full lg:w-1/2 h-72 lg:h-auto p-10">
                <Image
                  src="/main page.png"
                  alt="Main page"
                  layout="responsive"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Description */}
              <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Final Project: Dynamic Web Application using Next.js and Tailwind CSS
                </h2>
                <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                  {`This project is all about building a modern, responsive website using powerful tools like Next.js and Tailwind CSS. You&#39;ll practice real-world skills by connecting to an external API and presenting the data cleanly and interactively.`}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
}
