import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import Navigation from "@/app/_navigation/Navigation";
import Sidebar from "@/app/_navigation/sidebar/components/sidebar";
import { RedirectToast } from "@/components/shared/RedirectToast";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticketing Apps",
  description: "Bounty Your Ticket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navigation />
          <div className="flex h-screen overflow-hidden border-collapse">
            <Sidebar />
            <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">
              {children}
            </main>
          </div>
          <Toaster expand />
          <RedirectToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
