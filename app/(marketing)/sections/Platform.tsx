import Link from "next/link";
import Image from "next/image";

export default function PlatformSection() {
  const stages = [
    {
      stage: "Stage 1",
      title: "Clinical Progression Screening",
      purpose:
        "Estimates 24-month cognitive progression risk using structured clinical and neuropsychological variables.",
      inputs: [
        "Demographics and education",
        "APOE ε4 status",
        "MMSE",
        "ECog functional measures",
        "RAVLT memory performance",
      ],
      outputs: [
        "24-month progression probability",
        "Risk stratification",
        "Confidence score",
        "Explainability insights",
      ],
      accent: "green",
      shap: "/images/stage1_shap_bar.png",
      shapAlt: "Stage 1 SHAP feature importance",
      metric: "AUC 0.916",
      href: "/research/stage1-clinical",
    },
    {
      stage: "Stage 2a",
      title: "Plasma Biomarker Intelligence",
      purpose:
        "Estimates amyloid-associated neurodegenerative risk using blood biomarkers and clinical covariates.",
      inputs: [
        "Plasma Aβ42/40 ratio",
        "Plasma pTau217",
        "GFAP",
        "NfL",
        "Clinical covariates",
      ],
      outputs: [
        "Amyloid probability score",
        "Risk band classification",
        "PET triage recommendation",
        "Biomarker explainability",
      ],
      accent: "purple",
      shap: "/images/stage2a_shap_bar.png",
      shapAlt: "Stage 2a SHAP feature importance",
      metric: "AUC 0.915",
      href: "/research/stage2a-plasma",
    },
    {
      stage: "Stage 2b",
      title: "MRI Neurodegeneration Analysis",
      purpose:
        "Characterizes structural neurodegeneration using MRI volumetrics and longitudinal atrophy trajectories.",
      inputs: [
        "Hippocampal volume",
        "Entorhinal volume",
        "Ventricular expansion",
        "Whole-brain atrophy",
        "Longitudinal MRI trajectories",
      ],
      outputs: [
        "MRI neurodegeneration risk",
        "N+ classification",
        "Structural trajectory analysis",
        "Multimodal fusion input",
      ],
      accent: "blue",
      shap: "/images/stage2b_shap_bar.png",
      shapAlt: "Stage 2b SHAP feature importance",
      metric: "Longitudinal MRI",
      href: "/research/stage2b-mri",
    },
  ];

  const accentStyles = {
    green: {
      border: "border-green-600",
      badge: "bg-green-500/10 text-green-700 border-green-200",
      metric: "text-green-700",
      button:
        "border-green-600 text-green-700 hover:bg-green-50",
    },
    purple: {
      border: "border-purple-600",
      badge: "bg-purple-500/10 text-purple-700 border-purple-200",
      metric: "text-purple-700",
      button:
        "border-purple-600 text-purple-700 hover:bg-purple-50",
    },
    blue: {
      border: "border-blue-600",
      badge: "bg-blue-500/10 text-blue-700 border-blue-200",
      metric: "text-blue-700",
      button:
        "border-blue-600 text-blue-700 hover:bg-blue-50",
    },
  };

  return (
    <section
      id="Platform"
      className="w-full bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-green-700">
            Platform Architecture
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-[#16382F]">
            Longitudinal Multimodal Brain Health Intelligence
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Clinovia integrates clinical cognition, plasma biomarkers,
            and MRI neurodegeneration analysis into a longitudinal
            multimodal risk stratification pipeline.
          </p>
        </div>

        {/* Pipeline */}
        <div className="hidden lg:flex items-center justify-center mb-16">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <span className="px-4 py-2 rounded-full border border-green-200 bg-green-50 text-green-700">
              Stage 1
            </span>

            <div className="w-12 h-px bg-gray-300" />

            <span className="px-4 py-2 rounded-full border border-purple-200 bg-purple-50 text-purple-700">
              Stage 2a
            </span>

            <div className="w-12 h-px bg-gray-300" />

            <span className="px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700">
              Stage 2b
            </span>

            <div className="w-12 h-px bg-gray-300" />

            <span className="px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-700">
              Fusion Layer
            </span>
          </div>
        </div>

        {/* Stage Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {stages.map((stage) => {
            const style =
              accentStyles[
                stage.accent as keyof typeof accentStyles
              ];

            return (
              <div
                key={stage.stage}
                className={`flex flex-col rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden`}
              >
                {/* Top Accent */}
                <div className={`h-1.5 w-full ${style.border.replace("border", "bg")}`} />

                <div className="flex flex-col flex-1 p-7">
                  
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${style.badge}`}
                    >
                      {stage.stage}
                    </span>

                    <span
                      className={`text-sm font-semibold ${style.metric}`}
                    >
                      {stage.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#16382F] leading-tight">
                    {stage.title}
                  </h3>

                  {/* Purpose */}
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    {stage.purpose}
                  </p>

                  {/* SHAP */}
                  <div className="mt-6 rounded-2xl border border-gray-100 overflow-hidden bg-gray-50">
                    <div className="px-4 pt-4">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                        Feature Importance
                      </p>
                    </div>

                    <Image
                      src={stage.shap}
                      alt={stage.shapAlt}
                      width={1200}
                      height={800}
                      className="w-full object-contain"
                    />
                  </div>

                  {/* Inputs */}
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                      Inputs
                    </p>

                    <ul className="space-y-2">
                      {stage.inputs.map((input) => (
                        <li
                          key={input}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
                          {input}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outputs */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                      Outputs
                    </p>

                    <ul className="space-y-2">
                      {stage.outputs.map((output) => (
                        <li
                          key={output}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#16382F] shrink-0" />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link
                      href={stage.href}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${style.button}`}
                    >
                      View White Paper →

                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fusion Banner */}
        <div className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                Fusion Layer — Coming Soon
              </p>

              <h3 className="mt-2 text-xl font-bold text-amber-900">
                Multimodal Longitudinal Risk Fusion
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-amber-800 max-w-3xl">
                Future Clinovia models will integrate cognition, plasma
                biomarkers, and MRI neurodegeneration trajectories into
                a unified longitudinal brain health intelligence layer.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-gray-400 leading-relaxed">
          Models developed using Alzheimer&apos;s Disease Neuroimaging
          Initiative (ADNI) data. Research use only. Not approved for
          clinical diagnosis or treatment decision-making.
        </p>
      </div>
    </section>
  );
}