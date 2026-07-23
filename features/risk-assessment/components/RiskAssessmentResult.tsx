// frontend/features/risk-assessment/components/RiskAssessmentResult.tsx
"use client";

import RiskAssessmentResultCard from "@/components/shared/RiskAssessmentResultCard";
import type { RiskAssessmentOutput } from "../types";

type Props = {
  result?: RiskAssessmentOutput;
};

const RISK_COLORS: Record<string, string> = {
  HIGH: "text-red-600",
  INTERMEDIATE: "text-amber-600",
  LOW: "text-green-600",
};

const formatPercent = (
  value: number
): string => `${(value * 100).toFixed(1)}%`;

const formatLabel = (
  value?: string
): string =>
  value?.replaceAll("_", " ") ?? "-";

const titleCase = (
  value?: string
): string => {
  const label = formatLabel(value);

  return label === "-"
    ? label
    : label.charAt(0) +
        label.slice(1).toLowerCase();
};

const getModelLabel = (
  modelType?: string
): string => {
  switch (modelType) {
    case "clinical_cognitive_mri":
      return "Clinical + Cognitive + MRI";

    case "clinical_cognitive":
    default:
      return "Clinical + Cognitive";
  }
};

export function RiskAssessmentResult({
  result,
}: Props) {
  if (!result) {
    return (
      <RiskAssessmentResultCard
        title="24-Month Progression Risk Assessment"
        subtitle="Run a risk assessment to view results."
      />
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
    model_type,
  } = result;

  const nearThreshold =
    Math.abs(
      progression_probability -
        threshold_used
    ) < 0.05;

  return (
    <RiskAssessmentResultCard
      title="24-Month MCI Progression Risk Assessment"
      subtitle={getModelLabel(model_type)}
      pdfUrl={pdf_url}
      reportId={assessment_id}
      primaryBoxes={[
        {
          label: "Risk Category",
          value: titleCase(
            risk_category
          ),
          color:
            RISK_COLORS[
              risk_category
            ] ?? "text-gray-600",
        },
        {
          label:
            "24-Month Progression Risk",
          value: formatPercent(
            progression_probability
          ),
        },
      ]}
      note={
        nearThreshold
          ? `This patient's estimated probability (${formatPercent(
              progression_probability
            )}) is close to the model's decision threshold (${formatPercent(
              threshold_used
            )}). Small changes in inputs may alter the classification.`
          : undefined
      }
      details={[
        {
          label:
            "Assessment Model",
          value: getModelLabel(
            model_type
          ),
        },
        {
          label:
            "Decision Threshold",
          value: formatPercent(
            threshold_used
          ),
        },
        {
          label:
            "Model Confidence",
          value:
            confidence == null
              ? "Not yet calibrated"
              : formatPercent(
                  confidence
                ),
          color:
            confidence == null
              ? "text-muted-foreground"
              : undefined,
        },
        ...(top_features?.length
          ? [
              {
                label:
                  "Top Features",
                value:
                  top_features.join(
                    ", "
                  ),
              },
            ]
          : []),
      ]}
    >
      <div className="space-y-2">
        <h4 className="font-semibold">
          Recommended Next Step
        </h4>

        <p className="text-sm text-muted-foreground">
          {titleCase(
            recommended_next_step
          )}
        </p>
      </div>
    </RiskAssessmentResultCard>
  );
}