"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

// =============================================================================
// Design notes
// =============================================================================
// Same "calm single artifact" register as ExampleReport — this card is the
// flagship model made concrete: three routine inputs in, four AT(N)
// biomarker categories out. Deliberately shown as a probability
// distribution across all four categories (not a single flagged
// yes/no) — this is the model's actual output shape, and stratifying
// across categories is what makes "prioritization" downstream possible.
// Bar widths below are illustrative sample values, not live data.

const AT_N_CATEGORIES = [
  { label: "A+T+", value: 61 },
  { label: "A+", value: 22 },
  { label: "A-T-", value: 12 },
  { label: "A-", value: 5 },
];

export default function CSFPrescreening() {
  return (
    <section id="csf-prescreening" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            CSF / Amyloid Prescreening
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            The first layer of enrichment
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Predicts amyloid/tau (AT) status from age, sex, and MMSE alone
            &mdash; before any invasive or imaging-based confirmation.
          </p>
        </div>

        {/* Model card */}
        <div className="mx-auto mt-16 max-w-md rounded-lg border border-slate-200 bg-stone-50 p-8 shadow-sm">
          <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
            Inputs
          </p>

          <p className="mt-1 text-sm text-slate-700">
            Age &middot; Sex &middot; MMSE
          </p>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
              Predicted AT(N) Status
            </p>

            <div className="mt-4 space-y-3">
              {AT_N_CATEGORIES.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 font-mono text-xs text-slate-600">
                    {label}
                  </span>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-teal-600"
                      style={{ width: `${value}%` }}
                    />
                  </div>

                  <span className="w-10 shrink-0 text-right font-mono text-xs text-slate-500">
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-1 border-t border-slate-200 pt-6 text-sm text-slate-500">
            <p>No PET.</p>
            <p>No MRI.</p>
            <p>No lumbar puncture for the initial assessment.</p>
          </div>
        </div>

        {/* Link to validation */}
        <div className="mt-8 text-center">
          <Link
            href="#validation"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-teal-700 hover:text-teal-800"
          >
            View Validation
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-xs text-slate-400">
          Sample output for illustration. For Research Use Only.
        </p>
      </div>
    </section>
  );
}

