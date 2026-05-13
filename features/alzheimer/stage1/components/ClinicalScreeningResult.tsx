"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import type { Stage1ClinicalScreeningOutput } from "../types";

type Props = {
  result?: Stage1ClinicalScreeningOutput;
};

const RISK_COLORS: Record<string, string> = {
  HIGH_RISK_PROGRESSOR: "text-red-600",
  LOW_RISK_MONITOR: "text-green-600",
};

export function ClinicalScreeningResult({ result }: Props) {
  if (!result) {
    return (
      <div className="p-4 border rounded bg-gray-50 mt-4 animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  const reportId = (result as any).assessment_id || (result as any).id;
  const riskColor = RISK_COLORS[result.predicted_class] || "text-gray-600";

  console.log("reportId:", reportId, "result keys:", Object.keys(result));

  return (
    <ClinicalResultCard
      title="Stage 1 — Clinical Screening"
      reportId={reportId}
      modelName={result.model_version || "Stage1 Clinical"}
      fields={[
        {
          label: "Predicted Class",
          value: result.predicted_class.replaceAll("_", " "),
          highlight: true,
          color: riskColor,
        },
        {
          label: "24-Month Progression Risk",
          value: `${(result.progression_probability * 100).toFixed(1)}%`,
          highlight: true,
        },
        {
          label: "Confidence",
          value: `${(result.confidence * 100).toFixed(1)}%`,
        },
        {
          label: "Threshold Used",
          value: `${(result.threshold_used * 100).toFixed(1)}%`,
        },
        {
          label: "Next Step",
          value: result.next_step.replaceAll("_", " ").toLowerCase() ?? "—",
        },
      ]}
    />
  );
}