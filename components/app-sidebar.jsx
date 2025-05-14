"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { X, EyeIcon, FileTextIcon, UsersIcon, LayoutDashboardIcon, HomeIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      color: "bg-yellow-500 hover:bg-yellow-600 text-white",
    },
    {
      title: "Users",
      url: "/user_profile",
      icon: UsersIcon,
      color: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    {
      title: "Posts",
      url: "/posts",
      icon: FileTextIcon,
      color: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      color: "bg-purple-500 hover:bg-purple-600 text-white",
    },
  ],
};

export function AppSidebar({ isOpen = false, onClose = () => {}, ...props }) {
  const router = useRouter();

  const handleNavigation = (url) => {
    router.push(url);
    onClose(); // Close sidebar after navigation on mobile
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}

      <Sidebar
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen || props.variant === "desktop" ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
        {...props}
      >
        <SidebarHeader className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-semibold leading-tight">ViewPoint</span>
              <p className="text-xs sm:text-sm text-gray-500 leading-normal">
                User Profiles, Posts & Insights
              </p>
            </div>
          </div>

          {/* Close Button for Mobile */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-black rounded-full hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </SidebarHeader>

        <div className="my-3 sm:my-4" />

        <SidebarContent className="p-3 sm:p-4">
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={`w-full flex items-center gap-2 justify-start shadow-md hover:shadow-lg rounded-lg p-2.5 sm:p-3 border-2 border-black mb-2 sm:mb-3 ${item.color}`}
                  onClick={() => handleNavigation(item.url)}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
