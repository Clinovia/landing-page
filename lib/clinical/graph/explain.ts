import type { ClinicalGraphState } from "./types";

export function explainDecision(state: ClinicalGraphState) {
  return {
    stage1_contribution: state.stage1?.progression_probability ?? 0,
    stage2a_contribution: state.stage2a?.amyloid_positive_probability ?? 0,
    stage2b_contribution: state.stage2b?.mri_risk_probability ?? 0,

    uncertainty_reason:
      state.uncertainty > 0.5
        ? "Cross-modality disagreement detected"
        : "Stable multimodal agreement",
  };
}