import Image from "next/image";

export default function PlatformSection() {
  const inputs = [
    "Age",
    "Sex",
    "RAVLT immediate recall",
    "MMSE",
  ];

  const outputs = [
    "24-month progression probability",
    "Risk classification",
    "Confidence score",
    "SHAP-based explainability",
  ];

  const metrics = [
    { label: "AUC", value: "0.912" },
    { label: "Sensitivity", value: "0.870" },
    { label: "Specificity", value: "0.824" },
    { label: "Accuracy", value: "0.835" },
    { label: "Brier Score", value: "0.120" },
    { label: "Skill Score", value: "0.310" },
  ];

  return (
    <section id="platform" className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
            How It Works
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#16382F] md:text-5xl">
            Clinical Progression Screening
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Clinovia estimates 24-month risk of progression from mild
            cognitive impairment to Alzheimer's dementia using four
            routinely collected clinical variables — no additional
            testing, imaging, or laboratory biomarkers required.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16 hidden justify-center lg:flex">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-green-700">
              1 · Enter Routine Values
            </span>

            <div className="h-px w-12 bg-gray-300" />

            <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-green-700">
              2 · Risk Estimate Returned
            </span>

            <div className="h-px w-12 bg-gray-300" />

            <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-green-700">
              3 · SHAP Explanation
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="h-1.5 w-full bg-green-600" />

          <div className="p-8 md:p-10">
            {/* Badge */}
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Core Model
              </span>

              <span className="text-sm font-semibold text-green-700">
                AUC 0.912
              </span>
            </div>

            {/* Inputs / Outputs */}
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Inputs
                </p>

                <ul className="space-y-2">
                  {inputs.map((input) => (
                    <li
                      key={input}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                      {input}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Outputs
                </p>

                <ul className="space-y-2">
                  {outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16382F]" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Validated Performance
              </p>

              <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
                {metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="text-lg font-bold text-[#16382F]">
                      {metric.value}
                    </p>

                    <p className="text-[11px] uppercase tracking-wide text-gray-400">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SHAP Visualizations */}
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* SHAP Bar */}
              <div className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Feature Importance
                </p>

                <div className="flex flex-1 items-center justify-center">
                  <Image
                    src="/images/mci_screening_shap_bar.png"
                    alt="Feature importance for the 24-month progression risk model"
                    width={1200}
                    height={800}
                    className="h-56 w-auto object-contain"
                  />
                </div>
              </div>

              {/* SHAP Beeswarm */}
              <div className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Feature Impact Distribution
                </p>

                <div className="flex flex-1 items-center justify-center">
                  <Image
                    src="/images/mci_screening_shap_beeswarm.png"
                    alt="SHAP value distribution across patients"
                    width={1200}
                    height={800}
                    className="h-56 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-gray-400">
          Model developed using Alzheimer's Disease Neuroimaging Initiative
          (ADNI) data. Research use only. Not approved for clinical
          diagnosis or treatment decision-making.
        </p>
      </div>
    </section>
  );
}