"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import type { Stage2bMRIGateOutput } from "../types";

type Props = {
  result?: Stage2bMRIGateOutput;
};

const RISK_COLORS: Record<string, string> = {
  HIGH: "text-red-600",
  INTERMEDIATE: "text-yellow-600",
  LOW: "text-green-600",
};

const CLASS_COLORS: Record<string, string> = {
  N_POSITIVE: "text-red-600",
  N_NEGATIVE: "text-green-600",
};

export default function MriResult({ result }: Props) {
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
  const classColor = CLASS_COLORS[result.predicted_class] || "text-gray-600";
  const riskColor = RISK_COLORS[result.risk_band] || "text-gray-600";

  console.log("reportId:", reportId, "result keys:", Object.keys(result));

  return (
    <ClinicalResultCard
      title="Stage 2B — MRI Neurodegeneration Gate"
      reportId={reportId}
      modelName={result.model_version || "Stage2B MRI"}
      fields={[
        {
          label: "Predicted Class",
          value: result.predicted_class.replaceAll("_", " "),
          highlight: true,
          color: classColor,
        },
        {
          label: "N+ Probability",
          value: `${(result.mri_risk_probability * 100).toFixed(1)}%`,
          highlight: true,
        },
        {
          label: "Confidence",
          value: `${(result.confidence * 100).toFixed(1)}%`,
        },
        {
          label: "Risk Band",
          value: result.risk_band,
          highlight: true,
          color: riskColor,
        },
        {
          label: "Next Step",
          value: result.next_step.replaceAll("_", " ").toLowerCase() ?? "—",
        },
        {
          label: "Clinical Interpretation",
          value: result.clinical_interpretation ?? "—",
        },
      ]}
    />
  );
}