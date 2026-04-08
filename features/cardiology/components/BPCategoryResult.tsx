"use client";

import { BPCategoryOutput } from "@/features/cardiology/types";
import ClinicalResultCard from "@/components/shared/ClinicalResultCard";

type Props = {
  output?: BPCategoryOutput;
};

export default function BPCategoryResult({ output }: Props) {
  if (!output) return null;

  const reportId =
    (output as any).assessment_id || (output as any).id;

  return (
    <ClinicalResultCard
      title="Blood Pressure Category"
      fields={[
        {
          label: "Category",
          value: output.category.replace(/_/g, " ").toUpperCase(),
          highlight: true,
          color: "text-blue-600",
        },
      ]}
      modelName={output.model_name}
      reportId={reportId}
    />
  );
}