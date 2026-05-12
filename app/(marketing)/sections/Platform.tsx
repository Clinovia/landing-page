export default function PlatformSection() {
  const stages = [
    {
      stage: "Stage 1",
      title: "Clinical Screening",
      purpose:
        "Estimates 24-month MCI-to-AD progression risk using routinely available clinical variables. High-risk patients are routed to parallel confirmatory stages.",
      inputs: [
        "Age, sex, years of education",
        "APOE ε4 allele count (0, 1, or 2)",
        "MMSE score",
        "ECog — study partner total & memory discrepancy",
        "RAVLT immediate recall & forgetting score",
      ],
      outputs: [
        "Risk class: High Risk Progressor or Low Risk Monitor",
        "24-month progression probability",
        "Model confidence score",
        "Top contributing features",
        "Next step: Proceed to Stage 2 or Clinical Monitoring",
      ],
      color: "border-green-700",
      badgeColor: "bg-green-50 text-green-800 border-green-200",
      shap: "/images/stage1_shap_bar.png",
      shapAlt: "Stage 1 SHAP feature importance",
    },
    {
      stage: "Stage 2a",
      title: "Plasma Amyloid Triage",
      purpose:
        "Estimates amyloid burden from blood-based biomarkers. Runs in parallel with Stage 2b — both results feed into the fusion layer.",
      inputs: [
        "Plasma Aβ42/40 ratio",
        "Phosphorylated tau 217 (p-tau217)",
        "GFAP",
        "Neurofilament light chain (NfL)",
        "Age, APOE ε4, education, MMSE (covariates)",
      ],
      outputs: [
        "Amyloid probability score (0–100%)",
        "Classification: Amyloid Positive or Negative",
        "Risk band: Low / Intermediate / High",
        "Recommendation: Order PET / Consider PET / Defer PET",
        "Forwarded to fusion layer",
      ],
      color: "border-purple-700",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
      shap: "/images/stage2a_shap_bar.png",
      shapAlt: "Stage 2a SHAP feature importance",
    },
    {
      stage: "Stage 2b",
      title: "MRI Neurodegeneration Gate",
      purpose:
        "Confirms or rules out structural neurodegeneration using MRI volumetrics and longitudinal atrophy trajectories. Runs in parallel with Stage 2a.",
      inputs: [
        "Hippocampal, entorhinal, ventricular, whole-brain volumes",
        "Intracranial volume (ICV)",
        "Longitudinal slopes: hippocampus, ventricles, whole brain",
        "Age, APOE ε4 (covariates)",
      ],
      outputs: [
        "MRI risk probability",
        "Classification: N+ Positive or N+ Negative",
        "Risk band: Low / Intermediate / High",
        "Clinical interpretation",
        "Next step: Plasma / Multimodal / Monitoring",
      ],
      color: "border-blue-700",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
      shap: "/images/stage2b_shap_bar.png",
      shapAlt: "Stage 2b SHAP feature importance",
    },
  ];

  return (
    <section id="Platform" className="w-full bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* Section header */}
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1B4D3E] md:text-4xl">
            Multi-Stage Diagnostic Pipeline
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            Built on ADNI data, the pipeline routes patients from clinical
            screening through parallel plasma amyloid triage and MRI
            neurodegeneration gating before converging at a fusion layer.
          </p>
        </div>

        {/* Pipeline flow diagram */}
        <div className="mb-12 hidden md:flex flex-col items-center">

          {/* Stage 1 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#1B4D3E] text-white text-xs font-bold flex items-center justify-center">
              1
            </div>
            <span className="mt-1.5 text-xs text-gray-500 font-medium">Clinical Screening</span>
          </div>

          {/* Fork */}
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-start gap-32">
            <div className="flex flex-col items-center">
              <div className="w-px h-4 bg-gray-300" />
              <div className="w-8 h-8 rounded-full bg-purple-700 text-white text-xs font-bold flex items-center justify-center">
                2a
              </div>
              <span className="mt-1.5 text-xs text-gray-500 font-medium">Plasma Triage</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-4 bg-gray-300" />
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">
                2b
              </div>
              <span className="mt-1.5 text-xs text-gray-500 font-medium">MRI Gate</span>
            </div>
          </div>

          {/* Converge */}
          <div className="relative w-48 h-8">
            <div className="absolute left-1/4 top-0 w-px h-4 bg-gray-300" />
            <div className="absolute right-1/4 top-0 w-px h-4 bg-gray-300" />
            <div className="absolute left-1/4 right-1/4 top-4 h-px bg-gray-300" />
            <div className="absolute left-1/2 top-4 w-px h-4 bg-gray-300 -translate-x-1/2" />
          </div>

          {/* Fusion */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
              F
            </div>
            <span className="mt-1.5 text-xs text-gray-500 font-medium">Fusion Layer</span>
            <span className="text-xs text-amber-600 font-medium mt-0.5">Coming soon</span>
          </div>
        </div>

        {/* Stage cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {stages.map((stage) => (
            <div
              key={stage.stage}
              className={`flex flex-col rounded-2xl border-t-4 ${stage.color} border border-gray-200 bg-white p-6 shadow-sm`}
            >
              <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full border ${stage.badgeColor} mb-4`}>
                {stage.stage}
              </span>

              <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">{stage.title}</h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">{stage.purpose}</p>

              {/* SHAP chart */}
              <div className="mb-5 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 px-3 pt-3 mb-2">
                  Feature Importance (SHAP)
                </p>
                <img
                  src={stage.shap}
                  alt={stage.shapAlt}
                  className="w-full object-contain max-h-40"
                />
              </div>

              <div className="mt-auto space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Inputs</p>
                  <ul className="space-y-1">
                    {stage.inputs.map((input) => (
                      <li key={input} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Outputs</p>
                  <ul className="space-y-1">
                    {stage.outputs.map((output) => (
                      <li key={output} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1B4D3E] shrink-0" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fusion banner */}
        <div className="mt-10 flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 px-6 py-4">
          <div className="w-8 h-8 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
            F
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-900">Fusion Layer — Coming Soon</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Stage 2a plasma and Stage 2b MRI outputs will be combined using a late-fusion
              model to produce a final amyloid burden estimate and PET/CSF referral recommendation.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          All models trained and validated on ADNI (Alzheimer's Disease Neuroimaging Initiative) data.
          For research use only — not approved for clinical diagnosis.
        </p>
      </div>
    </section>
  );
}