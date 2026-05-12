/* -------------------------------------
 * Stage 2A — Plasma (Amyloid Triage)
 * ----------------------------------- */

/* =========
 * Enums
 * ========= */

export type Stage2aPredictedClass =
  | "AMYLOID_POSITIVE"
  | "AMYLOID_NEGATIVE";

export type Stage2aRecommendation =
  | "ORDER_AMYLOID_PET"
  | "CONSIDER_PET"
  | "DEFER_PET";

export type Stage2aRiskBand =
  | "LOW"
  | "INTERMEDIATE"
  | "HIGH";

/* =========
 * Input
 * ========= */

export interface Stage2aPlasmaModelInput {
  patient_id?: string | number;

  /* Plasma biomarkers */
  PLASMA_ABETA_RATIO: number;
  PLASMA_PTAU217: number;
  PLASMA_GFAP: number;
  PLASMA_NfL: number;

  /* Covariates */
  AGE: number;
  APOE4: 0 | 1 | 2;
  EDUCATION: number;
  MMSE: number;
}

/* =========
 * Output
 * ========= */

export interface Stage2aPlasmaModelOutput {
  patient_id?: string | number;

  predicted_class: Stage2aPredictedClass;

  amyloid_positive_probability: number;

  confidence: number;

  threshold_used: number;

  sensitivity_target: number;

  probabilities: Record<Stage2aPredictedClass, number>;

  /* Clinical decision layer */
  recommendation: Stage2aRecommendation;

  risk_band: Stage2aRiskBand;

  top_features?: string[];

  /* ---- from PredictionResponseBase ---- */

  model_name?: string;
  model_version?: string;
  timestamp?: string;
  assessment_id?: string;
  id?: string;
  notes?: string;
}