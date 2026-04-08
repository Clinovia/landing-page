"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import { CHA2DS2VAScOutput } from "@/features/cardiology/types";

type Props = {
  output?: CHA2DS2VAScOutput;
};

const RISK_STYLES: Record<string, string> = {
  high: "text-red-600",
  moderate: "text-yellow-600",
  low: "text-green-600",
};

export default function CHA2DS2VAScResult({ output }: Props) {
  if (!output) {
    return (
      <div className="p-4 border rounded bg-gray-50 mt-4 animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    );
  }

  const reportId =
    (output as any).assessment_id || (output as any).id;

  const riskColor =
    RISK_STYLES[output.risk_category] || "text-gray-600";

  return (
    <ClinicalResultCard
      title="CHA₂DS₂-VASc Score"
      reportId={reportId}
      modelName={output.model_name}
      fields={[
        {
          label: "Score",
          value: output.score,
          highlight: true,
        },
        {
          label: "Risk",
          value: `${output.risk_category.toUpperCase()} Risk`,
          highlight: true,
          color: riskColor,
        },
      ]}
    />
  );
}