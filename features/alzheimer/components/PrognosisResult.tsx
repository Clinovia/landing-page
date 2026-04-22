"use client";

import ClinicalResultCard from "@/components/shared/ClinicalResultCard";
import { AlzheimerUnifiedPrognosisOutput } from "@/features/alzheimer/types";

type ExtendedOutput = AlzheimerUnifiedPrognosisOutput & {
  assessment_id?: string;
  id?: string;
  pdf_url?: string;
};

type Props = {
  output?: ExtendedOutput;
  onReset?: () => void;
};

const RISK_STYLES: Record<string, string> = {
  high: "text-red-600",
  low: "text-green-600",
};

export default function PrognosisResult({ output, onReset }: Props) {
  if (!output) {
    return (
      <div className="p-4 border rounded bg-gray-50 mt-4 animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  const reportId = output.assessment_id || output.id;

  const riskColor =
    RISK_STYLES[output.risk_level] || "text-gray-600";

  const percent = (
    (output.probability_progression ?? 0) * 100
  ).toFixed(1);

  const horizonLabel = output.horizon
    ? output.horizon.replace("yr", "-Year")
    : "-";

  const diagnostic = output.diagnostic_performance;

  return (
    <ClinicalResultCard
      title="Alzheimer Prognosis"
      reportId={reportId}
      modelName={diagnostic?.mode}
      fields={[
        {
          label: "Progression Risk",
          value: `${percent}% (${horizonLabel})`,
          highlight: true,
          color: riskColor,
        },
        {
          label: "Risk Level",
          value: output.risk_level?.toUpperCase?.() || "-",
          highlight: true,
          color: riskColor,
        },
        {
          label: "No Progression",
          value: `${(
            (output.probability_no_progression ?? 0) * 100
          ).toFixed(1)}%`,
        },
        {
          label: "Threshold",
          value: diagnostic?.threshold ?? "-",
        },
        {
          label: "Sensitivity",
          value: diagnostic?.sensitivity != null
            ? `${(diagnostic.sensitivity * 100).toFixed(1)}%`
            : "-",
        },
        {
          label: "Specificity",
          value: diagnostic?.specificity != null
            ? `${(diagnostic.specificity * 100).toFixed(1)}%`
            : "-",
        },
      ]}
      features={
        output.summary_text
          ? [output.summary_text]
          : undefined
      }
    >
      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {onReset && (
          <button
            onClick={onReset}
            className="text-sm text-gray-600 underline"
          >
            New Assessment
          </button>
        )}

        {output.pdf_url && (
          <a href={output.pdf_url} target="_blank">
            <button className="text-sm text-blue-600 underline">
              Download PDF
            </button>
          </a>
        )}
      </div>
    </ClinicalResultCard>
  );
}