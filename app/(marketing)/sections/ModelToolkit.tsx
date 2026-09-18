"use client";

import { Check } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// The "ladder" here isn't a pricing tier list — it's a match-to-your-protocol
// argument, so each rung is framed by what data a study already collects,
// not by what the model needs. The agent (previous section) is the one
// that actually selects a tier per candidate; this section exists to show
// that no protocol is excluded for lacking a modality — there's a rung for
// what you already have. Kept as a simple stacked list rather than another
// instrument rail, since this isn't a sequential process like the Problem
// or Agent sections — it's a set of parallel options, and forcing a
// numbered-sequence visual onto non-sequential content would misrepresent it.

const TIERS = [
  {
    name: "Clinical",
    inputs: "Age, sex, MMSE",
    note: "Fastest to apply. No added assessments beyond routine intake.",
  },
  {
    name: "Clinical + Cognitive",
    inputs: "+ RAVLT and/or LIMM",
    note: "Higher precision when cognitive testing is already in protocol.",
  },
  {
    name: "Clinical + MRI",
    inputs: "+ structural MRI",
    note: "Highest precision for studies with imaging already scheduled.",
  },
];

export default function ModelToolkit() {
  return (
    <section id="model-toolkit" className="bg-stone-50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Clinovia Model Toolkit
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Match the model to your protocol
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            The agent selects from validated models matched to whatever your
            protocol already collects &mdash; no new assessments required to
            get started.
          </p>
        </div>

        {/* Tier list */}
        <div className="mx-auto mt-16 max-w-lg divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white shadow-sm">
          {TIERS.map(({ name, inputs, note }) => (
            <div key={name} className="flex gap-4 p-6 sm:p-8">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <Check className="h-3.5 w-3.5" strokeWidth={2} />
              </div>

              <div>
                <h3 className="font-serif text-lg text-slate-900">{name}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-slate-400">
                  {inputs}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-sm text-slate-500">
          Use the data your study already collects &mdash; the agent handles
          the rest.
        </p>
      </div>
    </section>
  );
}