import Link from "next/link";

export default function DecisionAreas() {
  const decisionAreas = [
    {
      name: "Trial Design Intelligence",
      description: [
        "Early estimation of trial success probability",
        "Identification of key drivers influencing primary endpoints",
        "Sensitivity analysis to stress-test assumptions",
      ],
    },
    {
      name: "Cohort Quality & Stratification",
      description: [
        "Unsupervised discovery of clinically meaningful subgroups",
        "Responder vs non-responder profiling",
        "Biomarker- and feature-driven cohort enrichment strategies",
      ],
    },
    {
      name: "Safety & AE Risk",
      description: [
        "Adverse event frequency, timing, and severity analysis",
        "Time-to-event and survival modeling",
        "Early warning indicators for high-risk subpopulations",
      ],
    },
  ];

  return (
    <section id="decision-areas" className="py-16 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1B4D3E] mb-3">
            Decision Areas
          </h2>
          <p className="text-lg text-[#1B4D3E] leading-relaxed max-w-3xl mx-auto">
            Where Clinovia.ai supports clinical teams with statistically grounded,
            interpretable analysis for confident trial decisions.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Column: Visual Example */}
          <div
            className="bg-white text-[#1B4D3E] rounded-2xl p-6 shadow-sm flex flex-col border border-gray-200"
            style={{ width: "90%" }}
          >
            <div className="mb-4">
              <img
                src="/images/shap_global.png"
                alt="SHAP feature importance visualization"
                className="w-full rounded-lg shadow-sm"
              />
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              SHAP-based feature interpretability for an Alzheimer’s disease
              classification model, illustrating transparent drivers of risk
              prediction.
            </p>
          </div>

          {/* Right Column: Decision Areas */}
          <div className="flex flex-col justify-start space-y-6">
            {decisionAreas.map((area, index) => (
              <div key={area.name}>
                <h3 className="text-base font-semibold text-[#1B4D3E] mb-2">
                  {area.name}
                </h3>
                {area.description.map((line, i) => (
                  <p key={i} className="text-gray-700 mb-1">
                    {line}
                  </p>
                ))}
                {index !== decisionAreas.length - 1 && (
                  <hr className="border-t border-gray-300 mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
