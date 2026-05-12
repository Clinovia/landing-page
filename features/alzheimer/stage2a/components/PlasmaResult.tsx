"use client";
import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import type { Stage2aPlasmaModelOutput } from "../types";

type Props = {
  result?: Stage2aPlasmaModelOutput;
};

const RISK_COLORS: Record<string, string> = {
  HIGH: "text-red-600",
  INTERMEDIATE: "text-yellow-600",
  LOW: "text-green-600",
};

export default function PlasmaResult({ result }: Props) {
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
  const riskColor = RISK_COLORS[result.risk_band] || "text-gray-600";

  console.log("reportId:", reportId, "result keys:", Object.keys(result));

  return (
    <ClinicalResultCard
      title="Stage 2A — Plasma Amyloid Triage"
      reportId={reportId}
      modelName={result.model_version || "Stage2A Plasma"}
      fields={[
        {
          label: "Prediction",
          value: result.predicted_class,
          highlight: true,
        },
        {
          label: "Amyloid Probability",
          value: `${(result.amyloid_positive_probability * 100).toFixed(1)}%`,
          highlight: true,
        },
        {
          label: "Confidence",
          value: `${(result.confidence * 100).toFixed(1)}%`,
        },
        {
          label: "Risk Band",
          value: result.risk_band,
          color: riskColor,
          highlight: true,
        },
        {
          label: "Recommendation",
          value: result.recommendation.replaceAll("_", " ").toLowerCase(),
        },
      ]}
    />
  );
}