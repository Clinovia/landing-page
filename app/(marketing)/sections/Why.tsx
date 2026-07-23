"use client";

import { ListChecks, ScanLine, FileCheck2 } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// Continues Hero.tsx's visual language: stone/teal/slate palette, mono
// uppercase labels for data/instrument-style captions, serif for the
// section headline. Background flips to white here to create a gentle
// section break against Hero's stone-50, without introducing a new palette.
//
// The three cards are parallel features, not sequential steps — so no
// numbered markers (01/02/03); each is identified by icon + label instead.

type CardConfig = {
  icon: typeof ListChecks;
  title: string;
  description: string;
  tags: string[];
};

const CARDS: CardConfig[] = [
  {
    icon: ListChecks,
    title: "Uses data you already collect",
    description:
      "No new tests, no new equipment — just the routine cognitive workup most memory clinics already perform.",
    tags: ["Age", "Sex", "MMSE", "RAVLT or LIMM"],
  },
  {
    icon: ScanLine,
    title: "MRI when available",
    description:
      "No workflow changes. Enter MRI measurements if available, and Clinovia automatically applies a more informative model.",
    tags: ["Hippocampus", "Entorhinal", "+3 more"],
  },
  {
    icon: FileCheck2,
    title: "A report in seconds",
    description:
      "A complete risk assessment, ready before the visit ends.",
    tags: ["Probability", "Risk Category", "Recommendations", "PDF"],
  },
];

export default function Why() {
  return (
    <section id="why" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Why Clinovia
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Built around how memory clinics already work
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, description, tags }) => (
            <div
              key={title}
              className="rounded-lg border border-slate-200 bg-stone-50 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}