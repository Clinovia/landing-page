"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/supabase/auth";

const NAV_LINKS = [
  { label: "Platform", href: "/#Platform" },
  { label: "Features", href: "/#Features" },
  { label: "Clinical Pilot", href: "/#Pilot" },
];

export default function Navbar() {
  const { user, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#1B4D3E]">
          Clinovia.ai
        </Link>

        {/* Right side: nav + auth together */}
        <div className="hidden items-center gap-6 lg:flex">
          
          {/* Nav links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#1B4D3E]"
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-4 w-px bg-gray-200" />

          {/* Auth buttons */}
          {!isLoading && (
            user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="rounded-xl">Dashboard</Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="rounded-xl">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="rounded-xl">Sign In</Button>
                </Link>
                <Link href="/#Pilot">
                  <Button className="rounded-xl px-6">Request Clinical Pilot</Button>
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}