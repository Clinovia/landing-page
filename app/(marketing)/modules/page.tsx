// frontend/app/(marketing)/modules/page.tsx
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
    name: "Clinical + Cognitive",
    description:
      "Predicts 24-month progression from Mild Cognitive Impairment to Alzheimer's disease using routine cognitive assessments and demographic information only.",
    inputs: [
      "Age",
      "Sex",
      "MMSE",
      "RAVLT Immediate Recall",
    ],
    outputs: [
      "24-month progression probability",
      "Risk category",
      "Model confidence",
      "Top contributing features",
      "Recommended next step",
    ],
    badge: "Live",
    badgeColor:
      "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Clinical + Cognitive + MRI",
    description:
      "Enhances prediction performance using structural MRI measurements for improved specificity and fewer false positives.",
    inputs: [
      "Age",
      "Sex",
      "MMSE",
      "RAVLT Immediate Recall",
      "Hippocampus",
      "Entorhinal",
      "MidTemp",
      "WholeBrain",
      "Ventricles",
    ],
    outputs: [
      "24-month progression probability",
      "Risk category",
      "Model confidence",
      "Top contributing features",
      "Recommended next step",
    ],
    badge: "Live",
    badgeColor:
      "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Multimodal Risk Assessment",
    description:
      "Incorporates genetics and advanced biomarkers including APOE genotype, CSF biomarkers, and PET imaging. Currently under evaluation.",
    inputs: [
      "Clinical + Cognitive + MRI",
      "APOE genotype",
      "CSF biomarkers",
      "PET imaging",
    ],
    outputs: [
      "Enhanced multimodal risk estimate",
      "Research-use risk stratification",
    ],
    badge: "Coming Soon",
    badgeColor:
      "bg-amber-100 text-amber-800 border-amber-200",
  },
];

function ModuleCard({
  module,
}: {
  module: Module;
}) {
  const isComingSoon =
    module.badge === "Coming Soon";

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
        isComingSoon ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {module.name}
        </h3>

        {module.badge && (
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${module.badgeColor}`}
          >
            {module.badge}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {module.description}
      </p>

      <div className="mt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Inputs
        </h4>

        <ul className="mt-3 space-y-2">
          {module.inputs.map((input) => (
            <li
              key={input}
              className="text-sm text-gray-700"
            >
              • {input}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Outputs
        </h4>

        <ul className="mt-3 space-y-2">
          {module.outputs.map((output) => (
            <li
              key={output}
              className="text-sm text-gray-700"
            >
              • {output}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ModulesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Clinical Modules
        </p>

        <h1 className="mt-4 text-5xl font-bold text-gray-900">
          First-Contact Risk Assessment
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Estimate 24-month progression risk in patients with mild
          cognitive impairment using routine assessments, with an
          optional MRI-enhanced pathway for improved precision.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Trained and validated on ADNI data · Research Use Only
        </p>
      </div>

      <section className="mt-16">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-[#1B4D3E]">
            Neurology — Alzheimer's Disease
          </h2>

          <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-400">
            Logistic Regression · Random Forest · XGBoost · ADNI
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {neurology.map((module) => (
            <ModuleCard
              key={module.name}
              module={module}
            />
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-col items-center gap-4">
        <Link
          href="/signup"
          className="rounded-xl bg-[#1B4D3E] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#163d31]"
        >
          Create Free Account
        </Link>

        <Link
          href="/login"
          className="text-sm text-gray-500 hover:underline"
        >
          Log in if you already have an account
        </Link>
      </div>
    </div>
  );
}