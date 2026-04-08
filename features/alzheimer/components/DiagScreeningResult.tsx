"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";

export type AlzheimerDiagnosisScreeningOutput = {
  patient_id?: string | number | null;
  model_name?: string;
  model_version?: string;
  predicted_class: "CN" | "MCI" | "AD";
  confidence: number;
  probabilities: Record<string, number>;
  top_features?: string[] | null;
  assessment_id?: string;
  id?: string;
};

type Props = {
  result?: AlzheimerDiagnosisScreeningOutput;
};

const CLASS_STYLES: Record<string, string> = {
  AD: "text-red-600",
  MCI: "text-yellow-600",
  CN: "text-green-600",
};

export default function DiagnosisScreeningResult({ result }: Props) {
  if (!result) {
    return (
      <div className="p-4 border rounded bg-gray-50 mt-4 animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  const reportId = result.assessment_id || result.id;

  const classColor =
    CLASS_STYLES[result.predicted_class] || "text-gray-600";

  return (
    <ClinicalResultCard
      title="Alzheimer Screening"
      reportId={reportId}
      modelName={result.model_name}
      fields={[
        {
          label: "Diagnosis",
          value: result.predicted_class,
          highlight: true,
          color: classColor,
        },
        {
          label: "Confidence",
          value: `${(result.confidence * 100).toFixed(1)}%`,
          highlight: true,
        },
      ]}
      features={result.top_features || undefined}
    />
  );
}