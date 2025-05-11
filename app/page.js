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
            <div className="px-4 lg:px-6">
              {/* Default content */}
            </div>
          </>
        );
    }
  };

  return renderContent();
}
