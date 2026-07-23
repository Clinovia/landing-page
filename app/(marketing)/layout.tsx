// app/(public)/layout.tsx
"use client";

import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToHash from "@/components/layout/ScrollToHash";
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
        {/*
          ScrollToHash has no visual output — it just watches for
          navigation back to "/" with a #hash (e.g. Navbar router.push()'d
          here from /pilot or /collaborate) and scrolls to that section.
          Mounted unconditionally, outside the shouldHideNavbar check,
          since it needs to run regardless of whether Navbar itself is
          visible on the current route.
        */}
        <ScrollToHash />

        {!shouldHideNavbar && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!shouldHideNavbar && <Footer />}
      </body>
    </html>
  );
}