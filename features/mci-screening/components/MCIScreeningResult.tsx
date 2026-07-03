// frontend/features/mci-screening/components/MCIScreeningResult.tsx
"use client";

import ClinicalResultCard from "@/components/shared/MCIScreeningResultCard";
import type { MCIScreeningOutput } from "../types";

type Props = {
  result?: MCIScreeningOutput;
};

const RISK_COLORS: Record<string, string> = {
  HIGH: "text-red-600",
  INTERMEDIATE: "text-amber-600",
  LOW: "text-green-600",
};

const formatPercent = (value: number): string => `${(value * 100).toFixed(1)}%`;

const formatLabel = (value?: string): string =>
  value?.replaceAll("_", " ") ?? "-";

const titleCase = (value?: string): string => {
  const label = formatLabel(value);
  return label === "-" ? label : label.charAt(0) + label.slice(1).toLowerCase();
};

export function MCIScreeningResult({ result }: Props) {
  if (!result) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        Run the clinical screening model to view results.
      </div>
    );
  }

  const {
    assessment_id,
    progression_probability,
    risk_category,
    confidence,
    threshold_used,
    recommended_next_step,
    top_features,
    pdf_url,
  } = result;

  // Flag when the continuous probability sits close to the decision
  // threshold - this is where clinicians most need the plain-language
  // context, since small shifts here can change the recommendation.
  const nearThreshold = Math.abs(progression_probability - threshold_used) < 0.05;

  return (
    <ClinicalResultCard
      title="MCI to Alzheimer's Disease Progression Risk Assessment"
      subtitle="24-month progression risk to Alzheimer's Disease"
      pdfUrl={pdf_url}
      reportId={assessment_id}
      primaryBoxes={[
        {
          label: "Risk Category",
          value: titleCase(risk_category),
          color: RISK_COLORS[risk_category] ?? "text-gray-600",
        },
        {
          label: "24-Month Progression Risk",
          value: formatPercent(progression_probability),
        },
      ]}
      note={
        nearThreshold
          ? `This patient's estimated probability (${formatPercent(
              progression_probability
            )}) is close to the model's decision threshold (${formatPercent(
              threshold_used
            )}). Treat the risk category above as the primary read.`
          : undefined
      }
      details={[
        {
          label: "Decision Threshold",
          value: formatPercent(threshold_used),
        },
        {
          label: "Model Confidence",
          value:
            confidence == null ? "Not yet calibrated" : formatPercent(confidence),
          color: confidence == null ? "text-muted-foreground" : undefined,
        },
        ...(top_features.length > 0
          ? [{ label: "Top Features", value: top_features.join(", ") }]
          : []),
      ]}
    >
      <div>
        <p className="text-sm text-muted-foreground mb-1">Recommended Next Step</p>
        <p className="text-base font-semibold">{titleCase(recommended_next_step)}</p>
      </div>
    </ClinicalResultCard>
  );
}