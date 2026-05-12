import type { ClinicalGraphState } from "./types";

export interface GraphUpdate {
  global_risk_score: number;
  uncertainty: number;
}

/**
 * Core clinical fusion engine
 * Deterministic + interpretable (NOT black box ML)
 */
export function computeGraphState(state: ClinicalGraphState): GraphUpdate {
  const p1 = state.stage1?.progression_probability ?? 0;
  const p2 = state.stage2a?.amyloid_positive_probability ?? 0;
  const p3 = state.stage2b?.mri_risk_probability ?? 0;

  // Weighted multimodal fusion
  const global_risk_score =
    0.35 * p1 +
    0.25 * p2 +
    0.40 * p3;

  // uncertainty increases when modalities disagree
  const values = [p1, p2, p3].filter(v => v !== undefined);
  const mean = values.reduce((a, b) => a + b, 0) / (values.length || 1);

  const variance =
    values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) /
    (values.length || 1);

  const uncertainty = Math.min(1, Math.sqrt(variance));

  return {
    global_risk_score,
    uncertainty,
  };
}