"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import {
  ECGInterpretationOutput,
} from "@/features/cardiology/types";

type Props = {
  interpretation?: ECGInterpretationOutput;
  onReset: () => void;
};

const RISK_STYLES: Record<string, string> = {
  low: "text-green-600",
  routine: "text-green-600",
  moderate: "text-yellow-600",
  medium: "text-yellow-600",
  high: "text-red-600",
  urgent: "text-red-600",
};

export default function ECGInterpretationResult({
  interpretation,
  onReset,
}: Props) {
  if (!interpretation) {
    return (
      <div className="p-4 border rounded bg-gray-50 mt-4 animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    );
  }

  const reportId =
    (interpretation as any).assessment_id ||
    (interpretation as any).id;

  const riskColor =
    RISK_STYLES[interpretation.overall_risk] || "text-gray-600";

  return (
    <ClinicalResultCard
      title="ECG Interpretation"
      reportId={reportId}
      modelName={interpretation.model_name}
      onReset={onReset}
      fields={[
        {
          label: "Rhythm",
          value: interpretation.rhythm || "N/A",
          highlight: true,
        },
        {
          label: "Overall Risk",
          value:
            interpretation.overall_risk?.toUpperCase() || "N/A",
          highlight: true,
          color: riskColor,
        },
      ]}
      features={interpretation.findings?.map((f) =>
        f.charAt(0).toUpperCase() + f.slice(1)
      )}
    />
  );
}