// frontend/app/(marketing)/pilot/page.tsx
"use client";

import { useState } from "react";
import {
  Activity,
  FileText,
  FileCheck2,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// =============================================================================
// Design notes
// =============================================================================
// Restyled to match the established system (Hero.tsx / Why.tsx /
// Workflow.tsx / Validation.tsx / PilotProgram.tsx): serif headlines,
// mono uppercase eyebrows/labels, lucide-react icons, slate/stone
// neutrals, and — deliberately — a SINGLE teal accent throughout rather
// than the previous dual emerald/rose scheme. The Clinical/MRI toggle
// still switches content (tools, ideal-for, success metrics); it no
// longer switches the color scheme, since the rest of the site commits
// to one accent color everywhere.
//
// Pricing is now duration-based (60-day $3,000 / 90-day $5,000), the
// same for both editions — replacing the previous per-edition fee
// ranges ($4-8k Clinical / $3-6k MRI). Editions differ by feature set,
// not by price.
//
// Clinical Edition copy previously implied RAVLT specifically was
// required — fixed to mention LIMM as an accepted alternative, matching
// the actual product (RAVLT and LIMM are each independently optional).

type Edition = "clinical" | "mri";
type Duration = "60" | "90";

const content: Record<
  Edition,
  {
    label: string;
    tagline: string;
    heroDetail: string;
    tools: { name: string; desc: string; icon: typeof Activity }[];
    successMetrics: string[];
    idealFor: string[];
  }
> = {
  clinical: {
    label: "Clinical Edition",
    tagline:
      "Research-use risk estimation for 24-month progression from MCI to Alzheimer's disease, using routine clinical and cognitive data.",
    heroDetail:
      "We're onboarding a small number of memory clinics and neurology practices to evaluate the Clinical Edition — age, sex, MMSE, and either RAVLT Immediate Recall or LIMM Total — within real clinic workflows.",
    tools: [
      {
        name: "24-Month Risk Estimate",
        desc: "Estimates risk of progression from MCI to Alzheimer's disease over 24 months, using age, sex, MMSE, and whichever memory test (RAVLT or LIMM) you have available.",
        icon: Activity,
      },
      {
        name: "Clinician-Facing Summary",
        desc: "A structured, interpretable output designed to support discussions around monitoring, follow-up, and referral — not a standalone diagnosis.",
        icon: FileText,
      },
      {
        name: "Structured PDF Reports",
        desc: "Automatically generated summaries ready for documentation and care coordination.",
        icon: FileCheck2,
      },
    ],
    successMetrics: [
      "Number of patients assessed over the pilot period",
      "Time spent per assessment vs. current workflow",
      "Clinician confidence in the output (end-of-pilot survey)",
    ],
    idealFor: [
      "Memory clinics evaluating a research-use risk estimation tool",
      "Neurology practices with high cognitive assessment volume",
      "Clinicians interested in structured follow-up planning",
      "Practices without routine access to volumetric MRI",
    ],
  },
  mri: {
    label: "MRI-Enhanced Edition",
    tagline:
      "Research-use risk estimation for 24-month progression from MCI to Alzheimer's disease, combining clinical data with quantitative MRI measures.",
    heroDetail:
      "We're onboarding a small number of memory clinics with access to volumetric MRI to evaluate the MRI-Enhanced Edition within real clinic workflows.",
    tools: [
      {
        name: "24-Month Risk Estimate (MRI-Enhanced)",
        desc: "Builds on the Clinical Edition by adding quantitative MRI measures — hippocampus, entorhinal cortex, middle temporal gyrus, whole brain, and ventricles — when available.",
        icon: ScanLine,
      },
      {
        name: "Clinician-Facing Summary",
        desc: "A structured, interpretable output designed to support discussions around monitoring, follow-up, and referral — not a standalone diagnosis.",
        icon: FileText,
      },
      {
        name: "Structured PDF Reports",
        desc: "Automatically generated summaries ready for documentation, referrals, and care coordination.",
        icon: FileCheck2,
      },
    ],
    successMetrics: [
      "Number of patients assessed over the pilot period",
      "Agreement between model output and clinician judgment (spot-check review)",
      "Clinician confidence in the output (end-of-pilot survey)",
    ],
    idealFor: [
      "Memory clinics with routine volumetric MRI access",
      "Practices already ordering structural MRI for MCI workup",
      "Clinicians interested in combining imaging and cognitive data",
      "Practices interested in future external validation collaboration",
    ],
  },
};

const PILOT_STEPS = [
  {
    step: "1",
    title: "We define success together",
    desc: "Before the pilot starts, we agree on 2–3 measurable outcomes and a target patient cohort. If we can't define what success looks like, we don't start.",
  },
  {
    step: "2",
    title: "A structured engagement",
    desc: "Your team uses Clinovia with real patients. We provide direct support throughout. A mid-pilot check-in gives us a chance to course-correct early.",
  },
  {
    step: "3",
    title: "Results review and decision",
    desc: "At the end of the pilot, we review the outcomes against the criteria we agreed on. We either move to a full contract — with the pilot fee credited — or we part ways cleanly.",
  },
];

const PRICING_OPTIONS: {
  duration: Duration;
  label: string;
  price: string;
}[] = [
  { duration: "60", label: "60-Day Pilot", price: "$3,000" },
  { duration: "90", label: "90-Day Pilot", price: "$5,000" },
];

export default function PilotPage() {
  const [edition, setEdition] = useState<Edition>("clinical");
  const [duration, setDuration] = useState<Duration>("60");

  const c = content[edition];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* -----------------------------------------------------------
            Edition toggle
        ----------------------------------------------------------- */}
        <div className="mb-14 flex justify-center">
          <div className="flex gap-1 rounded-xl bg-stone-100 p-1">
            {(["clinical", "mri"] as Edition[]).map((ed) => (
              <button
                key={ed}
                onClick={() => setEdition(ed)}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                  edition === ed
                    ? "bg-teal-700 text-white"
                    : "text-slate-600 hover:bg-white hover:text-teal-700"
                }`}
              >
                {content[ed].label}
              </button>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------
            Hero
        ----------------------------------------------------------- */}
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Pilot Program · Research Use Only · Limited Availability
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-slate-900">
            Clinovia {c.label} for Memory Clinics
          </h1>

          <p className="mt-5 text-xl leading-relaxed text-slate-600">
            {c.tagline}
          </p>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
            {c.heroDetail}
          </p>
        </div>

        {/* -----------------------------------------------------------
            Not a trial callout
        ----------------------------------------------------------- */}
        <div className="mb-16 rounded-lg border border-slate-200 bg-stone-50 p-7">
          <p className="mb-3 text-lg font-semibold text-slate-900">
            This is not a software trial.
          </p>
          <p className="leading-relaxed text-slate-600">
            Our pilot is a structured engagement — scoped to a defined
            patient cohort, with agreed success criteria before we begin.
            Clinovia is a research-use tool, not a cleared diagnostic
            device; outputs are intended to support clinician discussion,
            not to replace clinical judgment. You&rsquo;ll work directly
            with our team, and at the end of the pilot we&rsquo;ll review
            the results together and decide if a full engagement makes
            sense.
          </p>
        </div>

        {/* -----------------------------------------------------------
            Tools
        ----------------------------------------------------------- */}
        <div className="mb-16">
          <h2 className="mb-6 font-serif text-2xl text-slate-900">
            What&rsquo;s included
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {c.tools.map(({ name, desc, icon: Icon }) => (
              <div
                key={name}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-stone-50 text-teal-700">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>

                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">
                  {name}
                </h3>

                <p className="text-sm leading-relaxed text-slate-500">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------
            Pilot structure
        ----------------------------------------------------------- */}
        <div className="mb-16">
          <h2 className="mb-6 font-serif text-2xl text-slate-900">
            How the pilot works
          </h2>

          <div className="space-y-4">
            {PILOT_STEPS.map((item) => (
              <div key={item.step} className="flex items-start gap-5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-teal-700">
                  {item.step}
                </div>

                <div>
                  <p className="mb-1 font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------
            Success metrics
        ----------------------------------------------------------- */}
        <div className="mb-16">
          <h2 className="mb-2 font-serif text-2xl text-slate-900">
            How we define success
          </h2>
          <p className="mb-5 text-sm text-slate-500">
            These are the metrics we use as a starting point. We finalize
            them with you before the pilot begins.
          </p>

          <ul className="space-y-3">
            {c.successMetrics.map((m) => (
              <li key={m} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-600" />
                <span className="text-sm text-slate-700">{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* -----------------------------------------------------------
            Ideal for
        ----------------------------------------------------------- */}
        <div className="mb-16">
          <h2 className="mb-5 font-serif text-2xl text-slate-900">
            Who this is for
          </h2>

          <ul className="space-y-3">
            {c.idealFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-600" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* -----------------------------------------------------------
            Pricing (duration-based, same for both editions)
        ----------------------------------------------------------- */}
        <div className="mb-16 rounded-lg border border-slate-200 bg-stone-50 p-7">
          <p className="mb-1 font-mono text-xs uppercase tracking-wide text-slate-500">
            Pilot Investment
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {PRICING_OPTIONS.map(({ duration: d, label, price }) => {
              const selected = duration === d;

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`rounded-lg border p-5 text-left transition-colors ${
                    selected
                      ? "border-teal-700 bg-white"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-wide text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 font-serif text-3xl text-slate-900">
                    {price}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Flat fee · Credited toward Year 1 contract
                  </p>
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            Same pricing applies to both the Clinical and MRI-Enhanced
            editions. Final terms are confirmed with you before you
            commit to anything.
          </p>
        </div>

        {/* -----------------------------------------------------------
            CTA
        ----------------------------------------------------------- */}
        <div className="border-t border-slate-200 pt-14 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            We&rsquo;re onboarding a limited number of clinics
          </p>

          <h3 className="mb-3 font-serif text-2xl text-slate-900">
            Ready to run a pilot with your clinic?
          </h3>

          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-slate-500">
            Start with a 20-minute walkthrough. We&rsquo;ll show you the
            tool with example patient data and answer any clinical or
            technical questions.
          </p>

          <Button
            size="lg"
            className="bg-teal-700 text-white hover:bg-teal-800"
            asChild
          >
            <a
              href={`mailto:sophchoe@gmail.com?subject=${encodeURIComponent(
                `Pilot Application — Clinovia ${c.label}`
              )}&body=${encodeURIComponent(
                `Hi Sophie,\n\nI'd like to schedule a 20-minute walkthrough and apply for a Clinovia pilot.\n\nEdition: ${c.label}\nPilot duration: ${duration}-day (${
                  PRICING_OPTIONS.find((p) => p.duration === duration)?.price
                })\n\nClinic / organization name:\nBest times for a call:\n\n`
              )}`}
            >
              Schedule a 20-Minute Walkthrough
            </a>
          </Button>

          <p className="mt-4 text-xs text-slate-400">
            No commitment required. Pick a time that works — we&rsquo;ll
            confirm within one business day.
          </p>
        </div>
      </div>
    </div>
  );
}