"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

import { logout } from "@/lib/supabase/auth";
import { scrollToSection } from "@/components/ui/scrollToSection";

import { useActiveSection } from "@/components/layout/hooks/useActiveSection";

const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "Platform", id: "platform" },
  { label: "Features", id: "features" },
  { label: "Clinical Pilot", id: "pilot" },
] as const;

export default function Navbar() {
  const { user, isLoading } = useAuth();

  const activeSection = useActiveSection(
    NAV_LINKS.map((link) => link.id)
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-[#1B4D3E]"
        >
          Clinovia.ai
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? "text-[#1B4D3E]"
                  : "text-slate-700 hover:text-[#1B4D3E]"
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="h-4 w-px bg-gray-200" />

          {!isLoading &&
            (user ? (
              <>
                <Link href="/mci-screening">
                  <Button variant="outline" className="rounded-xl">
                    MCI Screening
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="rounded-xl"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="rounded-xl">
                    Sign In
                  </Button>
                </Link>

                <Button
                  className="rounded-xl px-6"
                  onClick={() => scrollToSection("pilot")}
                >
                  Request Clinical Pilot
                </Button>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}