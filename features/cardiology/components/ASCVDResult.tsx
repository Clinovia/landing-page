"use client";

import { ASCVDOutput } from "@/features/cardiology/types";
import ClinicalResultCard from "@/components/shared/ClinicalResultCard";

type Props = {
  output?: ASCVDOutput;
};

const CATEGORY_COLORS: Record<string, string> = {
  high: "text-red-600",
  intermediate: "text-yellow-600",
  borderline: "text-orange-600",
  low: "text-green-600",
};

export default function ASCVDResult({ output }: Props) {
  if (!output) return null;

  const reportId =
    (output as any).assessment_id || (output as any).id;

  const categoryColor =
    CATEGORY_COLORS[output.risk_category] || "text-gray-700";

  return (
    <ClinicalResultCard
      title="ASCVD 10-Year Risk"
      fields={[
        {
          label: "Risk",
          value: `${output.risk_percentage.toFixed(1)}%`,
          highlight: true,
        },
        {
          label: "Category",
          value: output.risk_category,
          highlight: true,
          color: categoryColor,
        },
      ]}
      modelName={output.model_name}
      reportId={reportId}
    />
  );
}