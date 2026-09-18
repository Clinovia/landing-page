"use client";

import { Users, Filter, ListChecks, FlaskConical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// =============================================================================
// Design notes
// =============================================================================
// Direction: "clinical instrument readout" rather than generic SaaS hero.
// - Display face: serif, for the headline only — evokes a journal/clinical
//   report register rather than a typical product-marketing sans.
// - Utility face: mono, uppercase, tracked out — used for the eyebrow label
//   and the flow-diagram captions, like instrument labeling.
// - Palette: warm paper background, ink text, a single restrained teal
//   accent for the signature flow line + primary CTA. No terracotta/cream
//   combo, no near-black+neon — deliberately avoided as AI-default looks.
// - Signature element: the Candidate Pool → Screen → Enrichment Agent →
//   Prioritized Cohort pipeline, rendered as a literal instrument rail with
//   a traveling highlight, not a generic icon-and-arrow row.
// - Motion respects prefers-reduced-motion (rail highlight is disabled,
//   not just slowed, for reduced-motion users).

const PIPELINE = [
  { icon: Users, label: "Candidate Pool" },
  { icon: Filter, label: "Trial Enrichment Agent" },
  { icon: ListChecks, label: "Prioritized Cohort" },
  { icon: FlaskConical, label: "Confirmatory Testing" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-stone-50 px-6 py-20 sm:py-28">
      <style>{`
        @keyframes clinovia-rail-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .clinovia-rail-highlight {
          animation: clinovia-rail-sweep 3.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .clinovia-rail-highlight {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          Trial Enrichment Agent · NACC + OASIS-3 Validated
        </p>

        {/* Headline */}
        <h1 className="mt-6 font-serif text-4xl leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
          Reduce Costly Screen-Failures
          <br className="hidden sm:block" /> Before Confirmatory Testing
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Clinovia&rsquo;s Trial Enrichment Agent stratifies your candidate
          pool by progression and biomarker risk &mdash; using models
          validated on independent cohorts &mdash; before you spend on PET
          or CSF confirmation.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="bg-teal-700 text-white hover:bg-teal-800"
            asChild
          >
            <Link href="/pilot" className="w-full text-center">
              Book a Pilot
            </Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link href="/validation">Request Validation Data</Link>
          </Button>
        </div>

        {/* Signature element: the pipeline rail */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="relative">
            {/* Rail track */}
            <div className="absolute left-0 right-0 top-6 h-px bg-slate-200" />

            {/* Traveling highlight */}
            <div className="absolute left-0 right-0 top-6 h-px overflow-hidden">
              <div className="clinovia-rail-highlight h-px w-1/3 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            </div>

            {/* Nodes */}
            <div className="relative flex justify-between">
              {PIPELINE.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700 shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-wide text-slate-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regulatory disclaimer */}
        <p className="mt-16 text-xs text-slate-400">
          For Research Use Only. Not a diagnostic device.
        </p>
      </div>
    </section>
  );
}