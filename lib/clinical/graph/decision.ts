 import type { ClinicalGraphState } from "./types";

export type ClinicalAction =
  | "CLINICAL_MONITORING"
  | "ORDER_MRI"
  | "ORDER_PET"
  | "ORDER_BIOMARKERS"
  | "NEUROLOGY_REFERRAL"
  | "URGENT_REFERRAL";

export interface ClinicalDecision {
  action: ClinicalAction;
  rationale: string;
  risk_band: "LOW" | "INTERMEDIATE" | "HIGH";
}

/**
 * Transparent decision policy layer
 * (IMPORTANT: this is auditable logic, NOT ML)
 */
export function computeClinicalDecision(
  state: ClinicalGraphState,
  globalRisk: number
): ClinicalDecision {
  const uncertainty = state.uncertainty ?? 0;

  // high uncertainty escalates evaluation
  if (uncertainty > 0.6) {
    return {
      action: "ORDER_BIOMARKERS",
      risk_band: "INTERMEDIATE",
      rationale: "High cross-modal uncertainty requires additional biomarkers.",
    };
  }

  if (globalRisk > 0.75) {
    return {
      action: "URGENT_REFERRAL",
      risk_band: "HIGH",
      rationale: "Convergent high risk across clinical, plasma, and MRI.",
    };
  }

  if (globalRisk > 0.5) {
    return {
      action: "ORDER_MRI",
      risk_band: "INTERMEDIATE",
      rationale: "Moderate risk detected; neuroimaging recommended.",
    };
  }

  return {
    action: "CLINICAL_MONITORING",
    risk_band: "LOW",
    rationale: "Low risk profile; continue observation.",
  };
}