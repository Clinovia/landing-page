"use client";

import { Calendar, Infinity as InfinityIcon, Cloud, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// =============================================================================
// Design notes
// =============================================================================
// Background continues the rhythm: DesignedForClinics (stone-50) → here
// (white). This section is a conversion point, not a content-heavy one —
// four short facts and a single CTA, kept deliberately compact rather
// than padded out into full feature cards, so it reads as a concrete,
// bounded offer rather than another marketing section.

const FACTS = [
  { icon: Calendar, label: "60-Day Pilot" },
  { icon: InfinityIcon, label: "Unlimited Assessments" },
  { icon: Cloud, label: "No Installation" },
  { icon: GraduationCap, label: "Training Included" },
];

export default function PilotProgram() {
  return (
    <section id="pilot-program" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border border-slate-200 bg-stone-50 p-10 text-center sm:p-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Pilot Program
          </p>

          <h2 className="mt-4 font-serif text-2xl text-slate-900 sm:text-3xl">
            See it work in your clinic, before you commit to anything more.
          </h2>

          <div className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {FACTS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-medium text-slate-600">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-10 bg-teal-700 text-white hover:bg-teal-800"
            asChild
          >
            <Link href="/pilot
              ">Request Pilot</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}