// app/(public)/layout.tsx
"use client";

import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/cardiology", "/neurology"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        {!shouldHideNavbar && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!shouldHideNavbar && <Footer />}
      </body>
    </html>
  );
}