"use client";

import { Stethoscope, History, Microscope, ClipboardCheck } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// Background continues the rhythm from Validation (white) → here
// (stone-50); the three-stone-50-in-a-row issue upstream (Workflow /
// Inputs / ExampleReport) is being addressed separately, per the human's
// note — not touched in this file.
//
// Lighter-weight than Why.tsx's cards on purpose: four use cases, each
// a short icon + title + one line, laid out as a single row of compact
// items rather than bordered cards — these are use-case labels, not
// features to sell individually, so they shouldn't compete visually
// with the Why section's three core value props.

const USE_CASES = [
  {
    icon: Stethoscope,
    title: "Routine Assessment",
    description:
      "Fits into an existing MCI workup — no new equipment or tests required.",
  },
  {
    icon: History,
    title: "Retrospective Validation",
    description:
      "Apply Clinovia to historical patient data to see how it would have performed.",
  },
  {
    icon: Microscope,
    title: "Clinical Research",
    description: "Support cohort characterization and enrichment analyses.",
  },
  {
    icon: ClipboardCheck,
    title: "Trial Screening",
    description:
      "Help identify likely progressors for enrollment in progression-focused trials.",
  },
];

export default function DesignedForClinics() {
  return (
    <section id="designed-for-clinics" className="bg-stone-50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Designed for Memory Clinics
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Built for how the data is actually used
          </h2>
        </div>

        {/* Use case grid */}
        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}