"use client";

import { FileDown } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// Rebuilt against a real agent report (see demo_001 run), not a
// single-patient score card. The report's actual shape is a cohort
// funnel (source → eligible → scored) plus an enrichment table showing
// how score thresholds concentrate likely-positive candidates into
// smaller, higher-yield groups. That table is the ROI argument, so it's
// the visual anchor of the card, not a footnote.
//
// Numbers below mirror the real demo_001 output exactly (18-participant
// cohort, actual score thresholds) rather than invented figures, since
// this is meant to be a faithful sample, not an idealized one.
//
// NOTE: enrichment_ratio / NNS / observed_prevalence were null in the
// source run (no ground-truth labels in the synthetic demo cohort) — so
// this card deliberately shows N and score threshold only, and omits
// those columns rather than fabricating values for them. Revisit once a
// labeled demo run is available.
//
// Color scheme aligned to TheProblem.tsx: bg-white section, teal-700
// eyebrow, slate-900 headline, slate-600 body, stone-100 card surface.

const FUNNEL = [
  { label: "Source Cohort", value: 30 },
  { label: "Eligibility-Filtered", value: 18 },
  { label: "Clinovia-Scored", value: 18 },
];

const ENRICHMENT = [
  { selection: "Top 50%", n: 9, threshold: 0.4945 },
  { selection: "Top 30%", n: 6, threshold: 0.6027 },
  { selection: "Top 20%", n: 4, threshold: 0.6358 },
  { selection: "Top 10%", n: 2, threshold: 0.7009 },
];

export default function ExampleReport() {
  return (
    <section id="example-report" className="bg-white px-6 py-14 sm:py-28">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Example Workflow
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            One protocol, one ranked cohort
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            The agent applies your eligibility criteria, scores every
            remaining candidate, and shows exactly how tightening the
            threshold concentrates your highest-likelihood candidates into
            a smaller group.
          </p>
        </div>

        {/* Report card */}
        <div className="mx-auto mt-16 max-w-lg rounded-lg border border-slate-200 bg-stone-100 p-8 shadow-sm">
          {/* Funnel */}
          <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
            Executive Summary
          </p>

          <div className="mt-4 space-y-3">
            {FUNNEL.map(({ label, value }, i) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{label}</span>
                <span className="font-mono text-sm text-slate-900">
                  {value}
                  {i === 0 && (
                    <span className="ml-2 text-xs text-slate-400">
                      participants
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Scoring summary */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
              Clinovia Score &middot; A+T+ Probability
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="font-mono text-lg text-slate-900">0.18</p>
                <p className="mt-1 text-[11px] text-slate-400">Min</p>
              </div>
              <div>
                <p className="font-mono text-lg text-slate-900">0.49</p>
                <p className="mt-1 text-[11px] text-slate-400">Median</p>
              </div>
              <div>
                <p className="font-mono text-lg text-slate-900">0.48</p>
                <p className="mt-1 text-[11px] text-slate-400">Mean</p>
              </div>
              <div>
                <p className="font-mono text-lg text-slate-900">0.71</p>
                <p className="mt-1 text-[11px] text-slate-400">Max</p>
              </div>
            </div>
          </div>

          {/* Enrichment table */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
              Enrichment by Threshold
            </p>

            <div className="mt-4 space-y-2.5">
              {ENRICHMENT.map(({ selection, n, threshold }) => (
                <div
                  key={selection}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-600">{selection}</span>
                  <span className="font-mono text-slate-500">
                    n={n}
                  </span>
                  <span className="font-mono text-slate-900">
                    &ge; {threshold.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-stone-50"
          >
            <FileDown className="h-4 w-4" strokeWidth={1.75} />
            Download Full Report
          </button>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-xs text-slate-400">
          Sample output from a synthetic demo cohort. For Research Use Only.
        </p>
      </div>
    </section>
  );
}