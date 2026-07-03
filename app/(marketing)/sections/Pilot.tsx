import Link from "next/link";

export default function PilotSection() {
  return (
    <section id="pilot" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-[#1B4D3E]">
            Partner With Clinovia
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Most MCI patients are referred without clear risk stratification
            at first contact. We're building the evidence and the
            partnerships to fix that — as a clinical pilot, or as a research
            collaboration.
          </p>
        </div>

        {/* Two tracks */}
        <div className="grid gap-6 md:grid-cols-2 mb-14">
          {/* Clinical Pilot */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="h-1.5 w-full bg-green-600" />

            <div className="p-7 flex flex-col flex-1">
              <span className="inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold bg-green-500/10 text-green-700 border-green-200 mb-4">
                Clinical Pilot
              </span>

              <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">
                Bring Clinovia Into Your Intake Workflow
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                For PCPs and memory clinics ready to test first-contact risk
                stratification on routinely collected data — no new testing,
                imaging, or labs required.
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {[
                  "Uses only age, sex, RAVLT, and MMSE",
                  "Explainable, physician-ready risk output",
                  "Early access shapes the product roadmap",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/apply"
                className="inline-block text-center rounded-lg bg-[#1B4D3E] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#163d31] transition-colors"
              >
                Apply for Pilot Access
              </Link>
            </div>
          </div>

          {/* Academic Collaboration */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="h-1.5 w-full bg-blue-600" />

            <div className="p-7 flex flex-col flex-1">
              <span className="inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-700 border-blue-200 mb-4">
                Academic Collaboration
              </span>

              <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">
                Help Us Validate Across Cohorts
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                We're seeking academic partners for retrospective and
                external validation of Clinovia's models across independent
                and international cohorts.
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {[
                  "Co-authorship on validation studies",
                  "Access to model outputs and explainability data",
                  "Fit for cohort holders and clinical researchers",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:sophie@clinovia.ai?subject=Research%20Collaboration%20Inquiry"
                className="inline-block text-center rounded-lg border border-[#1B4D3E] px-6 py-3 text-sm font-semibold text-[#1B4D3E] hover:bg-[#1B4D3E]/5 transition-colors"
              >
                Propose a Collaboration
              </a>
            </div>
          </div>
        </div>

        {/* Proof-point banner */}
        <div className="rounded-2xl border border-[#1B4D3E]/20 bg-[#1B4D3E]/5 px-8 py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1B4D3E]/70 mb-3">
            Preliminary Cross-Cohort Signal
          </p>

          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            In a retrospective analysis using NACC harmonized data—with
            PHC_mem and PHC_cog as proxies for RAVLT and MMSE—the same
            feature, memory performance, emerged as the top predictor,
            consistent with our ADNI-trained model. We're looking for
            academic partners to formally validate this across independent
            and international cohorts.
          </p>
        </div>
      </div>
    </section>
  );
}