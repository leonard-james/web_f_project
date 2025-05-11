"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  SidebarTrigger,
  FileTextIcon,
  UsersIcon,
  LayoutDashboardIcon,
  HomeIcon,
  EyeIcon,
} from "lucide-react";

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

export function AppSidebar({ ...props }) {
  const router = useRouter();

  const handleNavigation = (url) => {
    router.push(url); // Navigate to the specified URL
  };

  return (
    <Sidebar
      className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        props.variant === "inset" ? "translate-x-0" : "-translate-x-full"
      }`}
      {...props}
    >
      <SidebarHeader>
        <div className="flex gap-3 mb-6">
          <EyeIcon className="h-6 w-6 shrink-0" />
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-tight">ViewPoint</span>
            <div className="text-sm text-gray-500 leading-normal">
              <p>User Profiles, Posts & Visual Insights</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <div className="my-4" />
      <SidebarContent>
        <SidebarMenu>
          {/* Dynamic Buttons for Other Pages */}
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