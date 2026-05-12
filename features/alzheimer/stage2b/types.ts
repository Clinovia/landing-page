/* -------------------------------------
 * Stage 2B — MRI Neurodegeneration Gate
 * ----------------------------------- */

/* =========
 * Enums
 * ========= */

export type Stage2bPredictedClass =
  | "N_POSITIVE"
  | "N_NEGATIVE";

export type Stage2bRiskBand =
  | "LOW"
  | "INTERMEDIATE"
  | "HIGH";

export type Stage2bClinicalInterpretation =
  | "LOW N+ (monitor)"
  | "INTERMEDIATE (consider plasma/fusion)"
  | "HIGH N+ (strong neurodegeneration)";

export type Stage2bNextStep =
  | "PROCEED_TO_STAGE_3_PLASMA"
  | "CONSIDER_MULTIMODAL_ASSESSMENT"
  | "CLINICAL_MONITORING";

/* =========
 * Input
 * ========= */

export interface Stage2bMRIGateInput {
  patient_id?: string | number;

  /* Baseline MRI volumes */
  Hippocampus?: number;
  Entorhinal?: number;
  Ventricles?: number;
  WholeBrain?: number;
  ICV?: number;

  /* Longitudinal features */
  Hippocampus_slope?: number;
  Ventricles_slope?: number;
  WholeBrain_slope?: number;

  /* Covariates */
  AGE?: number;
  APOE4?: 0 | 1 | 2;
}

/* =========
 * Output
 * ========= */

export interface Stage2bMRIGateOutput {
  patient_id?: string | number;

  predicted_class: Stage2bPredictedClass;

  mri_risk_probability: number;

  confidence: number;

  threshold_used: number;

  probabilities: Record<Stage2bPredictedClass, number>;

  /* Clinical interpretation layer */
  risk_band: Stage2bRiskBand;

  clinical_interpretation: Stage2bClinicalInterpretation;

  next_step: Stage2bNextStep;

  top_features?: string[];

  /* ---- from PredictionResponseBase ---- */

  model_name?: string;
  model_version?: string;
  timestamp?: string;
  assessment_id?: string;
  id?: string;
  notes?: string;
}