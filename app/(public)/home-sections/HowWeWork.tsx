export default function HowWeWork() {
  const steps = [
    {
      title: "Secure Data Access & Context",
      description: [
        "Secure transfer of de-identified clinical data",
        "Review of protocol, endpoints, and analysis goals",
        "Alignment on key risks and decision questions",
      ],
    },
    {
      title: "Cohort Understanding & Data Quality",
      description: [
        "Baseline cohort characterization",
        "Missingness and data quality assessment",
        "Identification of imbalance or feasibility risks",
      ],
    },
    {
      title: "Statistical Validation & Robustness",
      description: [
        "Hypothesis-driven statistical testing",
        "Effect sizes and uncertainty estimation",
        "Sensitivity and subgroup consistency analyses",
      ],
    },
    {
      title: "Interpretable Predictive Modeling (Optional)",
      description: [
        "Risk prediction for response, AEs, or trial failure",
        "Interpretable ML with feature attribution",
        "Validation and stability analysis",
      ],
    },
    {
      title: "Decision-Ready Reporting",
      description: [
        "Clear visualizations and summary tables",
        "Clinical interpretation of findings",
        "Actionable recommendations tied to trial decisions",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1B4D3E] mb-4">
            How We Work
          </h2>
          <p className="text-lg text-[#1B4D3E] leading-relaxed max-w-3xl mx-auto">
            A structured, protocol-aware approach designed for clinical teams and CRO workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#1B4D3E] mb-3">
                {step.title}
              </h3>
              <ul className="space-y-2">
                {step.description.map((item, i) => (
                  <li key={i} className="text-gray-700 text-sm">
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
