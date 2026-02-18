// components/layout/Navbar.tsx — Simplified with useAuth()
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // ✅ Use your global auth hook

const NAV_LINKS = [
  { label: "Home", href: "/#Hero" },
  { label: "About", href: "/#how-we-work" },
  { label: "Research Tools", href: "/#specialty-research-tools" },
  { label: "Decision Areas", href: "/#decision-areas" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Demo", href: "/explore" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const { user, isLoading } = useAuth(); // ✅ Get auth state from context
  const { supabase } = useAuth(); // ✅ Or destructure if you need direct access

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // ✅ AuthContext listener auto-updates UI — no manual state management
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-[#1B4D3E]">
          Clinovia.ai
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1B4D3E] hover:underline transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth buttons — isLoading prevents flicker */}
          {!isLoading &&
            (user ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}