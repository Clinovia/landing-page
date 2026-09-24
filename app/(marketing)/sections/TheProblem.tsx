"use client";

import { Users, ClipboardCheck, Syringe, XCircle } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// This section mirrors the Hero's instrument-rail motif, but the rail here
// terminates in a red "failure" node rather than a resolved outcome — the
// visual argument is "this is where the funnel breaks today." Section 3
// (Trial Enrichment Agent) reuses the same rail shape with a resolved,
// teal-toned final node, so the two sections read as before/after.

const FUNNEL = [
  { icon: Users, label: "Candidate Pool" },
  { icon: ClipboardCheck, label: "Site Prescreen" },
  { icon: Syringe, label: "Confirmatory Testing" },
  { icon: XCircle, label: "Screen Failure" },
];

const COSTS = [
  "Patient burden",
  "Site burden",
  "Lost recruitment time",
  "Unnecessary cost",
];

export default function TheProblem() {
  return (
    <section id="problem" className="bg-white px-6 py-14 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          The CRO Problem
        </p>

        <h2 className="mt-6 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
          Expensive confirmation happens too early
        </h2>

        {/* Funnel rail */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-slate-200" />

            <div className="relative flex justify-between">
              {FUNNEL.map(({ icon: Icon, label }, i) => {
                const isFailure = i === FUNNEL.length - 1;

                return (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border bg-stone-100 shadow-sm ${
                        isFailure
                          ? "border-red-200 text-red-500"
                          : "border-slate-200 text-teal-700"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>

                    <span
                      className={`font-mono text-[11px] uppercase tracking-wide ${
                        isFailure ? "text-red-500" : "text-slate-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cost list */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-4 text-left sm:grid-cols-4 sm:text-center">
          {COSTS.map((cost) => (
            <p key={cost} className="text-sm leading-relaxed text-slate-600">
              {cost}
            </p>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-xl font-serif text-xl italic leading-relaxed text-slate-700">
          What if risk stratification happened upstream?
        </p>
      </div>
    </section>
  );
}

