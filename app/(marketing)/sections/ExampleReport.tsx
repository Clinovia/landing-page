"use client";

import { FileDown } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// This section's job is to make the abstract "risk report" concrete —
// after Validation's dense evidence panel, this is a single, calm,
// legible artifact: what a clinician actually holds at the end of a
// visit. Card styling deliberately echoes an actual report/printout
// (generous whitespace, a clear risk-category badge, mono for the
// number) rather than another marketing card.
//
// NOTE: "Recommendation: Routine Monitoring" is carried over as-specified
// from the original section 5 copy. This is the same field flagged 🔶 in
// the copy doc pending the regulatory framing decision (informational
// context vs. directive guidance) — no change made here without that
// decision; update the label/copy once resolved.

export default function ExampleReport() {
  return (
    <section id="example-report" className="bg-stone-50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Example Report
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            A complete answer, not just a score
          </h2>
        </div>

        {/* Report card */}
        <div className="mx-auto mt-16 max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
            24-Month Risk
          </p>

          <div className="mt-3 flex items-baseline gap-4">
            <span className="font-mono text-5xl text-slate-900">18.7%</span>
            <span className="rounded-full bg-teal-50 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wide text-teal-700">
              Low
            </span>
          </div>

          <div className="mt-8 space-y-5 border-t border-slate-100 pt-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
                Recommendation
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Routine Monitoring
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
                Model Used
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Clinical + MMSE + RAVLT
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-stone-50"
          >
            <FileDown className="h-4 w-4" strokeWidth={1.75} />
            Download PDF
          </button>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-xs text-slate-400">
          Sample report for illustration. For Research Use Only.
        </p>
      </div>
    </section>
  );
}