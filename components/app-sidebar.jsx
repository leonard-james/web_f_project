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

export function AppSidebar(props) {
  const router = useRouter();

  const handleNavigation = (url) => {
    router.push(url);
    // onClose(); // Remove or comment this out if not using mobile overlay
  };

  return (
    <Sidebar {...props} className={`bg-gray-200 ${props.className || ''}`}>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex gap-3">
          <EyeIcon className="h-6 w-6 shrink-0" />
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-tight">ViewPoint</span>
            <p className="text-sm text-gray-500 leading-normal">
              User Profiles, Posts & Insights
            </p>
          </div>
        </div>

        {/* Close Button for Mobile */}
        <button
          className="md:hidden text-gray-600 hover:text-black"
          onClick={props.onClose}
          aria-label="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </SidebarHeader>

      <div className="my-4" />

      <SidebarContent className="p-4">
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className={`w-full flex items-center gap-2 justify-start shadow-md hover:shadow-lg rounded-lg p-3 border-2 border-black mb-3 ${item.color}`}
                onClick={() => handleNavigation(item.url)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
