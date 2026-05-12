"use client";
import Link from "next/link";
import ModuleCard from "@/components/shared/ModuleCard";
import { useAuth } from "@/context/AuthContext";

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
    name: "Fusion Layer",
    description:
      "Combines Stage 2a plasma and Stage 2b MRI outputs into a final amyloid burden estimate and PET/CSF referral recommendation.",
    inputs: ["Stage 2a output", "Stage 2b output"],
    outputs: ["Final amyloid burden estimate", "PET/CSF referral recommendation"],
    href: "#",
    disabled: true,
  },
];

const stats = [
  { label: "Active Stages", value: "3" },
  { label: "Models", value: "XGBoost · RF" },
  { label: "Training Data", value: "ADNI" },
  { label: "Status", value: "Research Use Only" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B4D3E]">
            Welcome{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Alzheimer's Decision Support Pipeline · Stage 1 → 2a + 2b (parallel) → Fusion
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-700">
          Research Use Only
        </span>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
          >
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              {s.label}
            </p>
            <p className="text-sm font-semibold text-[#1B4D3E] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-[#1B4D3E]">Run Assessment</h2>
          <Link
            href="/clinical/alzheimer/reports"
            className="text-sm text-[#1B4D3E] hover:underline font-medium"
          >
            View past reports →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <ModuleCard key={mod.name} {...mod} />
          ))}
        </div>
      </div>

      {/* Footer disclaimer */}
      <p className="text-xs text-gray-400 text-center pt-4 border-t border-gray-100">
        All models trained and validated on ADNI data. Not approved for clinical diagnosis
        or treatment decisions. For research use only.
      </p>
    </div>
  );
}