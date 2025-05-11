import './globals.css';
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
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/eye-icon.png" type="image/png" />
        <title>ViewPoint</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <div className="flex min-h-screen">
            <div className="flex-1">
              <SiteHeader />
              <main className="p-6 md:p-8 lg:p-10 flex flex-col items-center w-full">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
