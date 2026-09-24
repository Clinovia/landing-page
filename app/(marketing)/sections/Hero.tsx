"use client";

import { Users, Filter, ListChecks, FlaskConical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PIPELINE = [
  { icon: Users, label: "Candidate Pool" },
  { icon: Filter, label: "Risk Stratification" },
  { icon: ListChecks, label: "Prioritized Cohort" },
  { icon: FlaskConical, label: "Confirmatory Testing" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-stone-100 px-6 py-16 sm:py-28"
    >
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
          Trial Enrichment Agent · Independently Validated Models
        </p>

        {/* Headline */}
        <h1 className="mt-6 font-serif text-4xl leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
          Enrich Clinical-Trial Populations
          <br className="hidden sm:block" />
          Before Expensive Testing
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Clinovia&rsquo;s Trial Enrichment Agent uses clinical,
          cognitive, and biomarker-risk models to prioritize candidates
          before costly confirmatory testing and downstream trial procedures.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Button
            size="lg"
            className="bg-teal-700 text-white hover:bg-teal-800"
            asChild
          >
            <Link href="/contact" className="w-full text-center">
              Discuss a Trial
            </Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link href="/evidence">
              See the Evidence
            </Link>
          </Button>

        </div>

        {/* Pipeline */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="relative">

            <div className="absolute left-0 right-0 top-6 h-px bg-slate-200" />

            <div className="absolute left-0 right-0 top-6 h-px overflow-hidden">
              <div className="clinovia-rail-highlight h-px w-1/3 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            </div>

            <div className="relative flex justify-between">

              {PIPELINE.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700 shadow-sm">
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.75}
                    />
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