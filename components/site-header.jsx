"use client";

import { Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const pageTitles = {
  "/": "Overview",
  "/user_profile": "User profiles",
  "/posts": "Posts",
  "/dashboard": "Dashboard",
};

export function SiteHeader() {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const title = pageTitles[pathname] || "ViewPoint";

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-10">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {isMobile ? (
            <button
              className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100"
              onClick={() => setOpenMobile(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : (
            <SidebarTrigger className="rounded-xl text-slate-600 hover:bg-slate-100" />
          )}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">ViewPoint</p>
            <h1 className="text-sm font-semibold text-slate-900 sm:text-base">{title}</h1>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <Search className="h-4 w-4" />
          <span>Explore your community</span>
        </div>
      </div>
    </header>
  );
}
