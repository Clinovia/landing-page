export default function FeaturesSection() {
  const features = [
    {
      title: "Clinical Summary Report",
      description: [
        "Physician-ready PDF with calibrated amyloid likelihood and confidence band",
        "SHAP-style feature contribution analysis for explainable clinical review",
        "Longitudinal patient trajectory tracking across visits and stages",
      ],
    },
    {
      title: "4-Tier Risk Stratification",
      description: [
        "Watch, Concern, High Risk, and Urgent clinical action tiers",
        "Removes ambiguity by linking prediction output to concrete next steps",
        "Supports faster referral decisions and standardized care pathways",
      ],
    },
    {
      title: "PET Value Simulator",
      description: [
        "Determines whether confirmatory amyloid PET is likely to change management",
        "Balances amyloid probability, uncertainty, and clinical stage",
        "Visual PET utility dial instead of unnecessary numeric complexity",
      ],
    },
    {
      title: "NHI-Aware Treatment Pathway Router",
      description: [
        "Routes patients to the next clinical step based on tier and stage",
        "Supports Korean NHI workflows and reimbursement alignment",
        "Reduces administrative friction that delays specialist referrals",
      ],
    },
    {
      title: "Patient Communication Generator",
      description: [
        "Generates physician-reviewed Korean-language patient summaries",
        "Family-centered and non-alarming communication tailored to risk tier",
        "Concrete lifestyle and follow-up recommendations for better adherence",
      ],
    },
    {
      title: "Safety Override Layer",
      description: [
        "Flags uncertainty, discordant biomarkers, and atypical presentations",
        "Escalates unsafe or ambiguous cases for specialist review",
        "Preserves physician trust through transparent override logic",
      ],
    },
  ];

  return (
    <section id="Features" className="w-full bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1B4D3E] md:text-4xl">
            Core Platform Features
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            Built for real clinical workflows — not just prediction models. Each
            feature supports physician decisions, documentation, and faster
            treatment readiness.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
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