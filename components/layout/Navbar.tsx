"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/#Hero" },
  { label: "About", href: "/#About" },
  { label: "Research Tools", href: "/#SpecialtyTools" },
  { label: "Decision Areas", href: "/#DecisionAreas" },
  { label: "How We Work", href: "/#HowWeWork" },
];

export default function Navbar() {
  const { user, isLoading } = useAuth();
  //const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    //router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
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

          {!isLoading && (
            user ? (
              <div className="flex items-center space-x-3">
                
                {/* Dashboard */}
                <Link href="/protected">
                  <Button variant="outline">Dashboard</Button>
                </Link>

                {/* Billing (🔥 upgrade entry) */}
                <Link href="/protected/billing">
                  <Button variant="outline">Billing</Button>
                </Link>

                {/* Logout */}
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>

                <Link href="/modules">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )
          )}
        </nav>
      </div>
    </header>
  );
}