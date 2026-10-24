"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const pageTitles = {
  "/": "Overview",
  "/user_profile": "User profiles",
  "/posts": "Posts",
  "/dashboard": "Dashboard",
};

export function SiteHeader() {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const title = pageTitles[pathname] || "ViewPoint";

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-10">
      <div className="flex w-full items-center gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:hidden"
            onClick={() => setOpenMobile(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <SidebarTrigger className="hidden rounded-xl text-slate-600 hover:bg-slate-100 md:grid" />
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">ViewPoint</p>
            <h1 className="truncate text-sm font-semibold text-slate-900 sm:text-base">{title}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
