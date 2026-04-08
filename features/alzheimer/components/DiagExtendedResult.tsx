"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import { AlzheimerDiagnosisExtendedOutput } from "@/features/alzheimer/types";

type Props = {
  output?: AlzheimerDiagnosisExtendedOutput;
};

const CLASS_STYLES: Record<string, string> = {
  AD: "text-red-600",
  MCI: "text-yellow-600",
  CN: "text-green-600",
};

export default function DiagExtendedResult({ output }: Props) {
  if (!output) {
    return (
      <div className="p-4 border rounded bg-gray-50 mt-4 animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  const reportId =
    (output as any).assessment_id || (output as any).id;

  const classColor =
    CLASS_STYLES[output.predicted_class] || "text-gray-600";

  return (
    <ClinicalResultCard
      title="Alzheimer Diagnosis (Extended)"
      reportId={reportId}
      modelName={output.model_name}
      fields={[
        {
          label: "Diagnosis",
          value: output.predicted_class,
          highlight: true,
          color: classColor,
        },
        {
          label: "Confidence",
          value: `${(output.confidence * 100).toFixed(1)}%`,
          highlight: true,
        },
      ]}
      features={output.top_features?.map((f) =>
        f.replace("_bl", "")
      )}
    />
  );
}