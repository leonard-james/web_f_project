"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeIcon, FileTextIcon, UsersIcon, LayoutDashboardIcon, HomeIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Users",
      url: "/user_profile",
      icon: UsersIcon,
    },
    {
      title: "Posts",
      url: "/posts",
      icon: FileTextIcon,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
  ],
};

export function AppSidebar(props) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar {...props} className={`border-r border-slate-200 bg-white ${props.className || ""}`}>
      <SidebarHeader className="px-5 py-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-950 text-white shadow-sm">
            <EyeIcon className="h-5 w-5" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-base font-semibold leading-tight tracking-tight text-slate-950">ViewPoint</span>
            <p className="mt-1 truncate text-xs text-slate-500">People, posts & insights</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-3">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Workspace
        </p>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                className="mb-1 h-11 w-full justify-start gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 data-[active=true]:bg-slate-950 data-[active=true]:text-white data-[active=true]:hover:bg-slate-800 data-[active=true]:hover:text-white"
              >
                <Link
                  href={item.url}
                  aria-current={pathname === item.url ? "page" : undefined}
                  onClick={() => setOpenMobile(false)}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
