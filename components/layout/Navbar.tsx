"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/supabase/auth";
import { scrollToSection } from "@/components/ui/scrollToSection";
import { useActiveSection } from "@/components/layout/hooks/useActiveSection";

const NAV_LINKS = [
  { label: "Why", id: "why" },
  { label: "Workflow", id: "workflow" },
  { label: "Inputs", id: "inputs" },
  { label: "Validation", id: "validation" },
  { label: "Pilot", id: "pilot-program" },
  { label: "FAQ", id: "faq" },
] as const;

export default function Navbar() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const activeSection = useActiveSection(
    NAV_LINKS.map((link) => link.id)
  );

  // These section IDs only exist on the home page's one-page layout.
  // On any other route (/pilot, /collaborate, /login, etc.),
  // document.getElementById(id) finds nothing and scrollToSection
  // silently no-ops — so from elsewhere, navigate home with a #hash
  // instead, and let ScrollToHash (mounted in the root layout) handle
  // scrolling once the home page has actually rendered.
  function handleNavClick(id: string) {
    if (pathname === "/") {
      scrollToSection(id);
    } else {
      router.push(`/#${id}`);
    }
  }

  function handleLogoClick() {
    if (pathname === "/") {
      scrollToSection("hero");
    } else {
      router.push("/");
    }
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="text-xl font-semibold tracking-tight text-slate-900"
        >
          Clinovia
        </button>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-medium transition-colors ${
                pathname === "/" && activeSection === link.id
                  ? "text-teal-700"
                  : "text-slate-600 hover:text-teal-700"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          {!isLoading &&
            (user ? (
              <>
                <Link href="/risk-assessment">
                  <Button className="bg-teal-700 hover:bg-teal-800">
                    Launch Assessment
                  </Button>
                </Link>

                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>

                <Link href="/signup">
                  <Button className="bg-teal-700 hover:bg-teal-800">
                    Request Access
                  </Button>
                </Link>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}