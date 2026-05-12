import type {
  Stage1Output,
  Stage2aOutput,
  Stage2bOutput,
} from "@/lib/api/alzheimer";

export interface PathwayDecisionDerived {
  next_step: string;
  rationale: string;
  urgency: "LOW" | "MODERATE" | "HIGH";
}

export function derivePathwayDecision(
  s1?: Stage1Output,
  s2a?: Stage2aOutput,
  s2b?: Stage2bOutput
): PathwayDecisionDerived {
  if (!s1) {
    return {
      next_step: "RUN_STAGE_1",
      rationale: "No clinical screening available.",
      urgency: "LOW",
    };
  }

  const p1 = s1.progression_probability ?? 0;
  const p2 = s2b?.mri_risk_probability ?? 0;
  const p3 = s2a?.amyloid_positive_probability ?? 0;

  const score = 0.4 * p1 + 0.3 * p2 + 0.3 * p3;

  if (score > 0.7) {
    return {
      next_step: "URGENT_NEUROLOGY_REFERRAL",
      rationale: "High multimodal risk across clinical + MRI + plasma biomarkers.",
      urgency: "HIGH",
    };
  }

  if (score > 0.4) {
    return {
      next_step: "ORDER_ADDITIONAL_BIOMARKERS",
      rationale: "Intermediate risk requiring further confirmation.",
      urgency: "MODERATE",
    };
  }

  return {
    next_step: "CLINICAL_MONITORING",
    rationale: "Low current risk profile.",
    urgency: "LOW",
  };
}