import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/lib/context/session/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(inter.className, "w-full overflow-x-hidden")}>
        <SessionProvider>
          <Header />
        </SessionProvider>
        {children}
        <Toaster />
      </body>
    </html>
  );
}