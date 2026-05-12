"use client";
import Link from "next/link";

type Module = {
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
  badge?: string;
  badgeColor?: string;
};

const neurology: Module[] = [
  {
    name: "Stage 1 — Clinical Screening",
    description:
      "Estimates 24-month MCI-to-AD progression risk from routine clinical variables. Routes high-risk patients to Stage 2a and/or 2b.",
    inputs: [
      "Age, sex, education",
      "APOE ε4 count",
      "MMSE",
      "ECog (study partner total & memory discrepancy)",
      "RAVLT immediate & forgetting",
    ],
    outputs: [
      "Risk class: High Risk Progressor / Low Risk Monitor",
      "24-month progression probability",
      "Model confidence",
      "Top contributing features",
      "Next step routing",
    ],
    badge: "Live",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Stage 2a — Plasma Amyloid Triage",
    description:
      "Estimates amyloid burden from blood-based biomarkers. Runs in parallel with Stage 2b and feeds the fusion layer.",
    inputs: [
      "Plasma Aβ42/40 ratio",
      "p-tau217",
      "GFAP",
      "NfL",
      "Age, APOE ε4, education, MMSE (covariates)",
    ],
    outputs: [
      "Amyloid probability (0–100%)",
      "Classification: Amyloid Positive / Negative",
      "Risk band: Low / Intermediate / High",
      "Recommendation: Order / Consider / Defer PET",
      "Top contributing features",
    ],
    badge: "Live",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Stage 2b — MRI Neurodegeneration Gate",
    description:
      "Confirms or rules out structural neurodegeneration using MRI volumetrics and longitudinal atrophy trajectories. Runs in parallel with Stage 2a.",
    inputs: [
      "Hippocampal, entorhinal, ventricular, whole-brain volumes",
      "Intracranial volume (ICV)",
      "Longitudinal slopes: hippocampus, ventricles, whole brain",
      "Age, APOE ε4 (covariates)",
    ],
    outputs: [
      "MRI risk probability",
      "Classification: N+ Positive / N+ Negative",
      "Risk band: Low / Intermediate / High",
      "Clinical interpretation",
      "Next step routing",
    ],
    badge: "Live",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Fusion Layer",
    description:
      "Combines Stage 2a plasma and Stage 2b MRI outputs into a final amyloid burden estimate and PET/CSF referral recommendation.",
    inputs: ["Stage 2a output", "Stage 2b output"],
    outputs: ["Final amyloid estimate", "PET/CSF referral recommendation"],
    badge: "Coming Soon",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
];

function ModuleCard({ module }: { module: Module }) {
  const isComingSoon = module.badge === "Coming Soon";
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${isComingSoon ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
        <h3 className="text-base font-semibold text-[#1B4D3E]">{module.name}</h3>
        {module.badge && (
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${module.badgeColor}`}>
            {module.badge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{module.description}</p>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Inputs</p>
          <ul className="space-y-1">
            {module.inputs.map((i) => (
              <li key={i} className="flex items-start gap-1.5 text-gray-700">
                <span className="mt-1 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Outputs</p>
          <ul className="space-y-1">
            {module.outputs.map((o) => (
              <li key={o} className="flex items-start gap-1.5 text-gray-700">
                <span className="mt-1 w-1 h-1 rounded-full bg-[#1B4D3E] shrink-0" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ModulesPage() {
  return (
    <div className="mx-auto max-w-6xl py-16 px-6">
      <h1 className="mt-8 text-4xl font-bold mb-2 text-center text-[#1B4D3E]">
        Clinical Modules
      </h1>
      <p className="text-center text-gray-500 text-sm mb-14">
        All Alzheimer's models trained and validated on ADNI data · For research use only
      </p>

      {/* Neurology */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-[#1B4D3E]">Neurology — Alzheimer's</h2>
          <span className="text-xs font-medium text-gray-400 border border-gray-200 rounded-full px-2.5 py-0.5">
            Random Forest · XGBoost · ADNI
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {neurology.map((m) => <ModuleCard key={m.name} module={m} />)}
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <Link
          href="/signup?redirect=/clinical/alzheimer"
          className="bg-[#1B4D3E] text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-[#163d31] transition-colors"
        >
          Join Pilot Program
        </Link>
        <Link href="/login" className="text-sm text-gray-400 hover:underline">
          Log in if you have an account
        </Link>
      </div>
    </div>
  );
}