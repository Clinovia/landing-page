"use client";

// =============================================================================
// Design notes
// =============================================================================
// This is the section a skeptical reviewer (academic, CRO scientist) reads
// most carefully — so restraint matters more here than anywhere else on
// the page. No icons, no motion, no persuasive framing: a data panel that
// states cohort, method, and numbers plainly, then two short callouts that
// state real limitations (precision, external validation status) as
// unhedged facts rather than footnotes. "No hype. Just evidence." is the
// literal design brief for this section, not just its closing line.
//
// Background returns to white, continuing the white/stone-50 alternation
// from Hero → Why → Workflow → (here).

const STATS = [
  { label: "Development Cohort", value: "ADNI", sub: "n = 2,430" },
  {
    label: "Validation Method",
    value: "5×10 CV",
    sub: "Bootstrap 95% CI",
  },
];

const AUC_RANGES = [
  { label: "Clinical Models", value: "0.87 – 0.92" },
  { label: "Clinical + MRI Models", value: "0.91 – 0.93" },
];

const EXTERNAL_VALIDATION = [
  { cohort: "NACC", status: "In Progress" },
  { cohort: "OASIS-3", status: "In Progress" },
];

export default function Validation() {
  return (
    <section id="validation" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Validation
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Cross-validated on ADNI. External validation underway.
          </h2>
        </div>

        {/* -----------------------------------------------------------
            Cohort / method stats
        ----------------------------------------------------------- */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {STATS.map(({ label, value, sub }) => (
            <div
              key={label}
              className="rounded-lg border border-slate-200 bg-stone-50 p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-2 font-serif text-2xl text-slate-900">
                {value}
              </p>
              <p className="mt-0.5 text-sm text-slate-500">{sub}</p>
            </div>
          ))}
        </div>

        {/* -----------------------------------------------------------
            AUC ranges
        ----------------------------------------------------------- */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {AUC_RANGES.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg border border-slate-200 bg-stone-50 p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate-500">
                AUC — {label}
              </p>
              <p className="mt-2 font-mono text-2xl text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* -----------------------------------------------------------
            External validation status
        ----------------------------------------------------------- */}
        <div className="mt-4 rounded-lg border border-slate-200 bg-stone-50 p-6">
          <p className="font-mono text-[11px] uppercase tracking-wide text-slate-500">
            External Validation
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            {EXTERNAL_VALIDATION.map(({ cohort, status }) => (
              <div
                key={cohort}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-3 pr-2"
              >
                <span className="text-sm font-medium text-slate-700">
                  {cohort}
                </span>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-amber-700">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------
            Precision / robustness callouts
        ----------------------------------------------------------- */}
        <div className="mt-10 space-y-6 border-t border-slate-200 pt-10">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              A note on precision
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              At each model&rsquo;s optimal risk threshold, roughly 3 in 5
              patients flagged high-risk go on to progress within 24
              months. The models are stronger at ruling out low risk
              (NPV ≈ 0.96) than at confirming high risk — worth keeping in
              mind when interpreting an individual report.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Robustness across model architectures
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Episodic memory measures carrying the dominant predictive
              signal, with MRI providing the largest benefit when cognitive
              testing is limited, held consistently across two independent
              model architectures — logistic regression and gradient
              boosting.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          No hype. Just evidence.
        </p>
      </div>
    </section>
  );
}