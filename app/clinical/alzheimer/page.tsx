"use client";

import ModuleCard from "@/components/shared/ModuleCard";

const modules = [
  {
    name: "Stage 1 — Clinical Screening",
    description:
      "Estimates 24-month MCI-to-AD progression risk from routine clinical variables. Routes high-risk patients to Stage 2a (plasma) and/or Stage 2b (MRI).",
    inputs: [
      "Age, sex, years of education",
      "APOE ε4 count (0, 1, or 2)",
      "MMSE",
      "ECog study partner total & memory discrepancy",
      "RAVLT immediate recall & forgetting",
    ],
    outputs: [
      "Risk class: High Risk Progressor / Low Risk Monitor",
      "24-month progression probability",
      "Model confidence",
      "Top contributing features",
      "Next step routing",
    ],
    href: "/clinical/alzheimer/stage1-clinical",
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
    href: "/clinical/alzheimer/stage2a-plasma",
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
    href: "/clinical/alzheimer/stage2b-mri",
  },
  {
    name: "Decision Support",
    description:
      "Unified clinician workflow integrating Stage 1, Stage 2a, and Stage 2b into a consolidated Alzheimer’s decision-support system.",
    inputs: [
      "Clinical screening outputs",
      "Plasma biomarker outputs",
      "MRI neurodegeneration outputs",
    ],
    outputs: [
      "4-tier risk stratification",
      "Treatment pathway recommendations",
      "PET utility guidance",
      "Clinical summary report",
      "Patient communication summary",
    ],
    href: "/clinical/alzheimer/decision-support",
  },
];

export default function NeurologyPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B4D3E]">
          Alzheimer's Pipeline
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Stage 1 → Stage 2a + Stage 2b → Decision Support
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <ModuleCard key={mod.name} {...mod} />
        ))}
      </div>
    </div>
  );
}