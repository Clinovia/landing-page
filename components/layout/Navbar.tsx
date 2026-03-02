"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

const NAV_LINKS = [
  { label: "Home", href: "/#Hero" },
  { label: "About", href: "/#About" },
  { label: "Research Tools", href: "/#SpecialtyTools" },
  { label: "Decision Areas", href: "/#DecisionAreas" },
  { label: "How We Work", href: "/#HowWeWork" },
];

export default function Navbar() {
  const { user, isLoading } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-[#1B4D3E]">
          Clinovia.ai
        </Link>
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
          {!isLoading && (
            user ? (
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}