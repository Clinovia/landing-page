export default function About() {
  return (
    <section id="about" className="py-16 bg-white w-full">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1B4D3E] mb-4">
            About Clinovia.ai
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Clinovia.ai provides protocol-aware clinical intelligence to help
            CROs and pharmaceutical teams make better trial decisions using
            rigorous statistics, interpretable machine learning, and clear
            analytical reasoning.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p>
            Clinovia.ai is a clinical intelligence consultancy focused on helping
            CROs and pharmaceutical teams extract actionable insight from complex
            clinical data. The practice is consulting-first, prioritizing
            decision support over automation or product-driven analytics.
          </p>

          <p>
            Founded by a researcher with over a decade of experience in machine
            learning and clinical analytics, Clinovia’s work is informed by
            academic collaboration and exposure to research environments at
            leading institutions, including Columbia University, Stanford
            University, and The University of Texas at Dallas.
          </p>

          <p>
            We work at the intersection of clinical science, statistics, and
            applied AI. Our focus is not on building black-box models, but on
            delivering analysis that clinical and regulatory teams can trust,
            interpret, and act upon.
          </p>

          <p>
            Clinovia.ai supports trial teams across trial design, cohort
            assessment, and safety analysis by transforming complex clinical
            datasets into decision-ready insight. Every engagement emphasizes
            methodological transparency, validation, and clearly stated
            assumptions.
          </p>

          <p>
            Our work is grounded in real-world experience with longitudinal,
            multi-modal clinical data and spans domains such as cardiometabolic
            disease and neurodegeneration. We prioritize statistical rigor,
            reproducibility, and clinical relevance over novelty or automation
            for its own sake.
          </p>

          <p>
            Analytical workflows are standardized internally to ensure quality
            and consistency, while outputs are tailored to each client’s
            protocol, objectives, and decision context.
          </p>
        </div>

        {/* Values / Positioning */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-[#1B4D3E] mb-2">
              Clinical Trust
            </h4>
            <p>
              Methods clinicians recognize. Results they can explain.
              Limitations stated clearly.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1B4D3E] mb-2">
              Statistical Rigor
            </h4>
            <p>
              Effect sizes, uncertainty, validation, and robustness — not just
              p-values or model scores.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1B4D3E] mb-2">
              Decision Leverage
            </h4>
            <p>
              Analysis designed to inform real trial decisions, not academic
              curiosity or model performance alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
