"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import { AlzheimerRiskScreenerOutput } from "@/features/alzheimer/types";

type Props = {
  output?: AlzheimerRiskScreenerOutput;
};

const RISK_STYLES: Record<string, string> = {
  low: "text-green-600",
  moderate: "text-yellow-600",
  high: "text-red-600",
};

export default function AlzheimerRiskResult({ output }: Props) {
  if (!output) {
    return (
      <div className="p-4 border rounded bg-gray-50 mt-4 animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const reportId =
    (output as any).assessment_id || (output as any).id;

  const riskColor =
    RISK_STYLES[output.risk_category?.toLowerCase() || ""] ||
    "text-gray-600";

  const displayRisk = output.risk_category
    ? output.risk_category.charAt(0).toUpperCase() +
      output.risk_category.slice(1)
    : "N/A";

  return (
    <ClinicalResultCard
      title="Alzheimer Risk Screening"
      reportId={reportId}
      modelName={output.model_name}
      fields={[
        {
          label: "Risk Level",
          value: displayRisk,
          highlight: true,
          color: riskColor,
        },
      ]}
      features={
        output.recommendation
          ? [output.recommendation]
          : undefined
      }
    />
  );
}