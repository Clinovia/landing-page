export default function PilotSection() {
  return (
    <section id="Pilot" className="w-full bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1B4D3E] md:text-4xl">
            Join the Clinical Pilot Program
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700">
            Partner with Clinovia.ai to bring structured, explainable
            Alzheimer's diagnostics into real clinical practice — from early
            screening through PET optimization and treatment readiness.
          </p>
        </div>

        <p className="mb-10 text-center text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Designed for hospitals, memory clinics, and neurology practices,
          the pilot evaluates Clinovia across the full diagnostic pathway:
          plasma biomarker triage, MRI gating, referral timing, and
          physician-ready reporting — measured by real workflow adoption,
          not just model metrics.
        </p>

        {/* Feature cards */}
        <div className="grid gap-6 text-sm text-gray-600 md:grid-cols-3 mb-14">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <h4 className="mb-2 font-semibold text-[#1B4D3E]">Physician Adoption</h4>
            <p>
              Explainable outputs, physician-ready reports, and
              specialist-safe escalation logic built for clinical trust.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <h4 className="mb-2 font-semibold text-[#1B4D3E]">Operational ROI</h4>
            <p>
              Reduce unnecessary PET orders, accelerate referrals, and
              improve DMT candidate identification.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <h4 className="mb-2 font-semibold text-[#1B4D3E]">Clinical Workflow Integration</h4>
            <p>
              Adaptable to local diagnostic pathways, referral structures,
              and institutional reporting requirements across healthcare systems.
            </p>
          </div>
        </div>

        {/* Validation collaboration callout */}
        <div className="rounded-2xl border border-[#1B4D3E]/20 bg-[#1B4D3E]/5 px-8 py-8 mb-10 text-center">
          <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">
            Seeking Validation Collaborators
          </h3>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-2">
            We are actively partnering with clinical researchers for both
            <strong> retrospective validation</strong> — applying Clinovia's models to existing
            cohort data — and <strong>external validation</strong> across independent sites and
            populations.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xl mx-auto">
            If you are a researcher with access to relevant imaging, biomarker, or
            longitudinal Alzheimer's datasets and are interested in co-authorship or
            collaborative validation studies, we welcome your inquiry.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="inline-block rounded-lg bg-[#1B4D3E] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#163d31] transition-colors"
          >
            Express Interest in Collaboration
          </a>
          <a
            href="#models"
            className="inline-block rounded-lg border border-[#1B4D3E] px-8 py-3 text-sm font-semibold text-[#1B4D3E] hover:bg-[#1B4D3E]/5 transition-colors"
          >
            Explore the Models →
          </a>
        </div>

      </div>
    </section>
  );
}