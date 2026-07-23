"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { scrollToSection } from "@/components/ui/scrollToSection";

/**
 * Mount this once, near the top level (e.g. root layout), alongside
 * Navbar. It has no visual output — its only job is: whenever the
 * current path is "/" and the URL has a #hash (e.g. because Navbar
 * just router.push()'d here from /pilot or /collaborate), scroll to
 * that section.
 *
 * A plain `router.push("/#why")` alone doesn't reliably scroll on
 * arrival — the browser only auto-scrolls to a hash on a full page
 * load, not a client-side route transition. This fills that gap.
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.replace("#", "");

    if (!hash) return;

    // Wait a frame so the page's sections are actually laid out before
    // scrollToSection measures offsets — scrolling in the same tick as
    // navigation can land in the wrong place if layout hasn't settled.
    const raf = requestAnimationFrame(() => scrollToSection(hash));

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}