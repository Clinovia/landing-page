"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#hero" },
  { label: "Modules", href: "/explore" },
  { label: "Cardiology", href: "/#cardiology" },
  { label: "Neurology", href: "/#neurology" },
  { label: "Related Papers", href: "/#papers" },
  { label: "Features", href: "/#features" },
];

export default function Navbar() {
  const supabase = createClientComponentClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /** Load user once on mount */
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setLoading(false);
    };

    loadUser();

    /** Listen to login/logout changes */
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  /** Logout handler */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
        
        {/* Brand */}
        <div className="text-2xl font-bold text-[#1B4D3E]">
          <Link href="/" className="hover:underline transition-colors">
            Clinovia
          </Link>
        </div>

        <nav className="flex space-x-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1B4D3E] font-normal hover:underline hover:text-green-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth */}
          {loading ? (
            <div className="ml-4 text-gray-400">Loading...</div>
          ) : user ? (
            <Button onClick={handleLogout} className="ml-4">
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="ml-4">Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
