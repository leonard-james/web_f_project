"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button"; // Import your custom Button component

import {
  ArrowUpCircleIcon,
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
      title: "User Profile",
      url: "/user_profile",
      icon: UsersIcon,
      color: "bg-blue-500 hover:bg-blue-600 text-white", // Blue button
    },
    {
      title: "Posts",
      url: "/posts",
      icon: FileTextIcon,
      color: "bg-green-500 hover:bg-green-600 text-white", // Green button
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      color: "bg-purple-500 hover:bg-purple-600 text-white", // Purple button
    },
   
  ],
};

export function AppSidebar({ ...props }) {
  const router = useRouter(); // Initialize useRouter
  const [activeButton, setActiveButton] = React.useState(null);

  const handleButtonClick = (item) => {
    setActiveButton(item.title);
    router.push(item.url);
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
          <SidebarMenuItem key="Home">
            <SidebarMenuButton
              asChild
              className={`w-full flex items-center gap-2 justify-start shadow-md hover:shadow-lg rounded-lg p-3 bg-yellow-500 hover:bg-yellow-600 text-white border-2 border-black mb-3 ${activeButton === "Home" ? "ring-2 ring-offset-2 ring-offset-white ring-black" : ""}`}
              onClick={() => { setActiveButton("Home"); router.push("/"); }}
            >
              <Button>
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`w-full flex items-center gap-2 justify-start shadow-md hover:shadow-lg rounded-lg p-3 border-2 border-black mb-3 ${
                  item.color
                } ${activeButton === item.title ? "ring-2 ring-offset-2 ring-offset-white ring-black" : ""}`}
                onClick={() => handleButtonClick(item)}
              >
                <Button>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}