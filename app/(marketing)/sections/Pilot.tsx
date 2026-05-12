export default function PilotSection() {
  return (
    <section id="Pilot" className="w-full bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">

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

        <div className="grid gap-6 text-sm text-gray-600 md:grid-cols-3">
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
            <h4 className="mb-2 font-semibold text-[#1B4D3E]">Korea-Specific Workflow</h4>
            <p>
              Built with NHI routing, diagnosis code support, and
              tertiary referral pathways in mind.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}