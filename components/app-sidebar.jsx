"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  FileTextIcon,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Posts",
      url: "#",
      icon: FileTextIcon,
    },
    {
      title: "Charts",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">ViewPoint</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Use only NavMain for navigation */}
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* Removed SidebarFooter containing NavUser */}
    </Sidebar>
  );
}
