"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import {
  AlzheimerPrognosis2yrBasicOutput,
} from "@/features/alzheimer/types";

interface Props {
  prognosis?: AlzheimerPrognosis2yrBasicOutput;
  onReset: () => void;
}

const RISK_STYLES: Record<string, string> = {
  low: "text-green-600",
  moderate: "text-yellow-600",
  high: "text-red-600",
};

export default function Prog2yrBasicResult({
  prognosis,
  onReset,
}: Props) {
  if (!prognosis) {
    return (
      <div className="p-4 border rounded bg-gray-50 mt-4 animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  const reportId =
    (prognosis as any).assessment_id || (prognosis as any).id;

  const safePercent = (value?: number | null) => {
    if (value === undefined || value === null || isNaN(value)) return "N/A";
    return `${(value * 100).toFixed(1)}%`;
  };

  const riskColor =
    RISK_STYLES[prognosis.risk_level?.toLowerCase() || ""] ||
    "text-gray-600";

  return (
    <ClinicalResultCard
      title="Alzheimer 2-Year Prognosis"
      reportId={reportId}
      modelName={prognosis.model_name}
      onReset={onReset}
      fields={[
        {
          label: "Progression Risk (2yr)",
          value: safePercent(
            prognosis.probability_progression_to_AD_within_2yrs
          ),
          highlight: true,
        },
        {
          label: "Stable Probability",
          value: safePercent(
            prognosis.probability_stable_within_2yrs
          ),
        },
        {
          label: "Risk Level",
          value: prognosis.risk_level?.toUpperCase() || "N/A",
          highlight: true,
          color: riskColor,
        },
      ]}
      features={prognosis.top_features?.map((f) =>
        f.replace(/_/g, " ")
      )}
    />
  );
}