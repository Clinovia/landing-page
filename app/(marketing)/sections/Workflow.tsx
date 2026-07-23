"use client";

import { User, ListChecks, ScanLine, Brain } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// This section carries the core differentiator, so it gets its own visual
// treatment rather than reusing Hero's exact pattern verbatim: a vertical
// intake stepper (left) paired with the routing table it resolves to
// (right). The stepper deliberately does NOT reuse Hero's animated rail
// sweep — that motion is spent once, in the hero, per the "spend your
// boldness in one place" principle. This section is static and precise,
// like a decision table, which suits "you never choose the model" better
// than another animated moment would.
//
// Icon vocabulary intentionally reused from Hero/Why (User, ListChecks,
// ScanLine, Brain) rather than introducing new icons for the same
// concepts — reinforces recognition across sections instead of novelty
// for its own sake.

const STEPS = [
  {
    icon: User,
    title: "Patient Information",
    detail: "Age, sex",
  },
  {
    icon: ListChecks,
    title: "Cognitive Assessment",
    detail: "MMSE required · RAVLT or LIMM",
  },
  {
    icon: ScanLine,
    title: "MRI",
    detail: "Optional",
  },
  {
    icon: Brain,
    title: "Clinovia",
    detail: "Selects the most appropriate validated model",
  },
];

const ROUTING = [
  {
    data: "MMSE only",
    model: "Clinical (MMSE)",
    auc: "0.87",
    highlight: false,
  },
  {
    data: "MMSE + RAVLT",
    model: "Clinical (RAVLT)",
    auc: "0.91",
    highlight: false,
  },
  {
    data: "MMSE + LIMM",
    model: "Clinical (LIMM)",
    auc: "0.90",
    highlight: false,
  },
  {
    data: "MMSE + RAVLT + LIMM",
    model: "Clinical (Complete)",
    auc: "0.92",
    highlight: false,
  },
  {
    data: "Any of the above + MRI",
    model: "Clinical + MRI",
    auc: "0.91 – 0.93",
    highlight: true,
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="bg-stone-50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            One Workflow
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            You never choose the model. Clinovia does.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            One intake replaces separate &ldquo;Cognitive&rdquo; and
            &ldquo;Cognitive + MRI&rdquo; products. Whatever data you enter,
            Clinovia routes it to the correspondingly validated model —
            automatically.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* -------------------------------------------------------
              Intake stepper
          ------------------------------------------------------- */}
          <div className="relative">
            <div
              className="absolute bottom-6 left-6 top-6 w-px bg-slate-200"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {STEPS.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="relative flex items-start gap-4">
                  <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <div className="pt-2.5">
                    <p className="font-semibold text-slate-900">{title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* -------------------------------------------------------
              Routing table
          ------------------------------------------------------- */}
          <div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-stone-50">
                    <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      Data Available
                    </th>
                    <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      Model Applied
                    </th>
                    <th className="px-4 py-3 text-right font-mono text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      AUC
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {ROUTING.map(({ data, model, auc, highlight }) => (
                    <tr
                      key={data}
                      className={`border-b border-slate-100 last:border-b-0 ${
                        highlight ? "bg-teal-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-slate-700">{data}</td>
                      <td className="px-4 py-3 text-slate-700">{model}</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-900">
                        {auc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Every combination is routed to a separately validated model —
              nothing is estimated from a partial or imputed feature set.
              AUC figures are cross-validated (5×10 repeated CV); see
              Validation for confidence intervals and methodology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}