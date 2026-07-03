export default function FeaturesSection() {
  const features = [
    {
      title: "Simple Inputs, No New Workflow",
      description: [
        "Uses only age, sex, RAVLT_immediate, and MMSE",
        "Nothing outside what's already routinely collected at intake",
        "No additional testing, imaging, or labs required",
      ],
    },
    {
      title: "Transparent, Explainable Output",
      description: [
        "SHAP-based explanation for every individual prediction",
        "Shows which inputs drove a patient's risk score",
        "Supports clinical trust and easier documentation",
      ],
    },
    {
      title: "Validated Performance",
      description: [
        "AUC 0.91 · Sensitivity 0.87 · Specificity 0.82 on held-out ADNI data",
        "Calibrated risk output (Brier score 0.12, skill score 0.31 vs. baseline)",
        "Built and tested on a minimal, reproducible 4-feature model",
      ],
    },
    {
      title: "Built for First Contact",
      description: [
        "Designed for the PCP or memory clinic intake moment",
        "Supports earlier, more consistent triage — not a diagnosis",
        "Standardizes who gets prioritized for specialist referral",
      ],
    },
  ];

  return (
    <section id="features" className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1B4D3E] md:text-4xl">
            Why Clinovia
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            One simple, validated tool for first-contact risk stratification —
            not a stack of modules to learn.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <h3 className="mb-3 text-lg font-semibold text-[#1B4D3E]">
                {feature.title}
              </h3>
              <ul className="space-y-2">
                {feature.description.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}