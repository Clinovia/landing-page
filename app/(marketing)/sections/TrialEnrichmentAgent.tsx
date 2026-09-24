"use client";

import { FileStack, Cpu, ListOrdered, Syringe, Users2 } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// Resolved counterpart to TheProblem's rail: same instrument-rail shape,
// but every node stays teal (no failure state) and terminates in an
// "Enriched Population" outcome. This is the centerpiece section — the
// agent, not any single model, is the subject of every line of copy here.
// Integration channels are folded in as a quiet caption rather than a
// separate section, per the finalized structure.

const PIPELINE = [
  { icon: FileStack, label: "Protocol + Cohort" },
  { icon: Cpu, label: "Trial Enrichment Agent" },
  { icon: ListOrdered, label: "Risk Prioritization" },
  { icon: Syringe, label: "Confirmatory Testing" },
  { icon: Users2, label: "Enriched Population" },
];

export default function TrialEnrichmentAgent() {
  return (
    <section id="agent" className="bg-stone-100 px-6 py-14 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          Clinovia Trial Enrichment Agent
        </p>

        <h2 className="mt-6 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
          Move risk stratification upstream
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Give the agent your protocol and candidate cohort. It applies the
          validated models that match your available data, ranks candidates
          by likely biomarker and progression status, and hands off a
          prioritized shortlist &mdash; before you spend on confirmatory
          testing.
        </p>

        {/* Pipeline rail */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-slate-200" />
            <div className="absolute left-0 right-0 top-6 h-px overflow-hidden">
              <div className="clinovia-rail-highlight h-px w-1/4 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            </div>

            <div className="relative flex justify-between">
              {PIPELINE.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700 shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="max-w-[6rem] font-mono text-[11px] uppercase tracking-wide text-slate-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integration note */}
        <p className="mx-auto mt-16 max-w-md text-sm text-slate-500">
          Connects to your existing workflow &mdash; CSV, API, CTMS, or EDC.
        </p>
      </div>
    </section>
  );
}