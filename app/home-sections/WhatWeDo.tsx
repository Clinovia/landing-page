import Link from "next/link";

export default function WhatWeDo() {
  const decisionCapabilities = [
    {
      name: "Protocol-aware clinical logic",
      description:
        "Analysis explicitly aligned with trial objectives, endpoints, and inclusion/exclusion criteria — ensuring insights are relevant, defensible, and regulator-ready.",
    },
    {
      name: "Statistical analysis for trial de-risking",
      description:
        "Rigorous exploratory and confirmatory analyses to assess signal strength, cohort balance, uncertainty, and trial failure risk.",
    },
    {
      name: "Patient stratification & cohort intelligence",
      description:
        "Identification of clinically meaningful subgroups, responder profiles, and latent risk strata to support enrichment and enrollment decisions.",
    },
    {
      name: "Interpretable AI & predictive modeling",
      description:
        "Predictive models with transparent drivers (e.g., SHAP-based explanations) designed to inform decisions — not replace clinical judgment.",
    },
  ];

  return (
    <section id="what-we-do" className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1B4D3E] mb-2">
            What We Do
          </h2>
          <p className="text-lg text-[#1B4D3E] leading-relaxed max-w-2xl mx-auto">
            <strong>Protocol-aware clinical intelligence for de-risking trials.</strong>{" "}
            We support CRO and Pharma teams with rigorous statistics,
            interpretable ML, and decision-focused analysis.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-end">
          {/* Left Column */}
          <div className="flex flex-col">
            {decisionCapabilities.map((item, index) => (
              <div key={item.name} className="py-3">
                <p className="text-gray-700">
                  <span className="font-semibold text-[#1B4D3E]">
                    {item.name}:
                  </span>{" "}
                  {item.description}
                </p>
                {index !== decisionCapabilities.length - 1 && (
                  <hr className="border-t border-gray-200 mt-4" />
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Visual Example (no CTA) */}
          <div
            className="bg-gray-50 text-[#1B4D3E] rounded-2xl p-6 shadow-sm border border-gray-200"
            style={{ width: "90%", marginLeft: "auto" }}
          >
            <div className="mb-4">
              <img
                src="/images/ascvd.png"
                alt="Example clinical analysis"
                className="w-full rounded-lg shadow-sm"
              />
            </div>

            <p className="text-sm text-gray-700">
              Example exploratory analysis illustrating cohort characterization,
              risk stratification, and interpretable modeling outputs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
