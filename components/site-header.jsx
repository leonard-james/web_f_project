"use client";

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { setOpenMobile } = useSidebar()

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <button
          className="md:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300"
          onClick={() => setOpenMobile(true)}
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Project</h1>
      </div>
    </header>
  )
}
