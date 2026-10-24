import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ViewPoint",
  description: "ViewPoint - User Profiles, Posts & Visual Insights",
  icons: {
    icon: "/eyeicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <div className="flex min-h-screen bg-slate-50">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <SiteHeader />
              <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
