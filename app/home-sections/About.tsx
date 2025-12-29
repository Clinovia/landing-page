export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50 w-full">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1B4D3E] mb-4">
            About Clinovia.ai
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Protocol-aware clinical intelligence for CROs and pharma teams.
            Rigorous statistics, interpretable ML, and clear analytical reasoning.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Clinovia.ai is a clinical intelligence consultancy that transforms complex clinical data into actionable decisions. We're consulting-first, not product-driven.
            </p>
            <p>
              Founded by a researcher with over a decade in ML and clinical analytics, our work draws from collaborations at Columbia, Stanford, and UT Dallas.
              We don't build black-box models. We deliver analysis that clinical and regulatory teams can trust, interpret, and act upon—spanning trial design, cohort assessment, and safety analysis.
            </p>
            <p>
              Our methods prioritize statistical rigor, reproducibility, and clinical relevance. Every engagement emphasizes transparency, validation, and clearly stated assumptions.
            </p>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h4 className="font-semibold text-[#1B4D3E] mb-2 text-base">
              Clinical Trust
            </h4>
            <p className="text-sm text-gray-600">
              Methods clinicians recognize. Results they can explain. Limitations stated clearly.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h4 className="font-semibold text-[#1B4D3E] mb-2 text-base">
              Statistical Rigor
            </h4>
            <p className="text-sm text-gray-600">
              Effect sizes, uncertainty, validation, and robustness—not just p-values or model scores.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h4 className="font-semibold text-[#1B4D3E] mb-2 text-base">
              Decision Leverage
            </h4>
            <p className="text-sm text-gray-600">
              Analysis designed to inform real trial decisions, not academic curiosity alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}