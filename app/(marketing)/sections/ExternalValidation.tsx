"use client";

// =============================================================================
// External Validation
// =============================================================================
// This section carries the credibility load of the page. It is intended for
// biostatisticians, medical monitors, and clinical-development teams, so it
// stays deliberately factual rather than promotional.
//
// IMPORTANT:
// AUC, sensitivity, specificity, and cohort size below are placeholders.
// Replace every 🔶 value with the actual reported result before publishing.
// Never publish placeholder or unverified performance metrics.
//
// Methodology:
// - Models are frozen before validation.
// - Validation cohorts are independent of model development.
// - No retraining, threshold tuning, or recalibration is performed on the
//   validation cohort.

const COHORTS = [
  {
    name: "NACC",
    role: "External validation cohort",
    n: "🔶 N =", // TODO: replace with reported cohort size
    metrics: [
      { label: "AUC", value: "🔶 0.00" },
      { label: "Sensitivity", value: "🔶 0%" },
      { label: "Specificity", value: "🔶 0%" },
    ],
  },
  {
    name: "OASIS-3",
    role: "External validation cohort",
    n: "🔶 N =", // TODO: replace with reported cohort size
    metrics: [
      { label: "AUC", value: "🔶 0.00" },
      { label: "Sensitivity", value: "🔶 0%" },
      { label: "Specificity", value: "🔶 0%" },
    ],
  },
];

const PRINCIPLES = [
  {
    title: "Frozen models",
    note: "Model parameters are locked before validation. No retraining, threshold tuning, or recalibration is performed on the validation cohort.",
  },
  {
    title: "Independent cohorts",
    note: "Validation cohorts are separate from the populations used for model development, with no overlap in the evaluated participants.",
  },
  {
    title: "External validation",
    note: "Performance is evaluated on data the model did not see during development, rather than relying solely on internal cross-validation.",
  },
];

export default function ExternalValidation() {
  return (
    <section id="validation" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            External Validation
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Frozen models. Independent cohorts.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Models are locked before validation and evaluated on independent
            cohorts that were not used for model development.
          </p>
        </div>

        {/* Cohort performance */}
        <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-2">
          {COHORTS.map(({ name, role, n, metrics }) => (
            <div
              key={name}
              className="rounded-lg border border-slate-200 bg-stone-50 p-8"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-xl text-slate-900">{name}</h3>
                <span className="font-mono text-xs text-slate-400">{n}</span>
              </div>

              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-slate-400">
                {role}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6">
                {metrics.map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="font-mono text-lg text-slate-900">
                      {value}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Methodology */}
        <div className="mx-auto mt-16 max-w-2xl divide-y divide-slate-100 border-y border-slate-100">
          {PRINCIPLES.map(({ title, note }) => (
            <div key={title} className="flex gap-6 py-5">
              <h4 className="w-40 shrink-0 font-mono text-xs uppercase tracking-wide text-teal-700">
                {title}
              </h4>

              <p className="text-sm leading-relaxed text-slate-600">
                {note}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/pilot"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-teal-700 hover:text-teal-800"
          >
            Request Validation Package
          </a>
        </div>
      </div>
    </section>
  );
}