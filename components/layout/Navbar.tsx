"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

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
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setLoading(false);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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

          {!loading &&
            (user ? (
              <Button onClick={handleLogout}>Logout</Button>
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
