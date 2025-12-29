"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Decision Areas", href: "/#decision-areas" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  return (
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

        {/* Primary CTA */}
        <Link href="/request-discussion">
          <Button className="bg-green-800 hover:bg-[#1B4D3E]">
            Request Discussion
          </Button>
        </Link>
      </nav>
    </div>
  );
}