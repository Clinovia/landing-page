/* -------------------------------------
 * Stage 1 — Clinical Screening
 * Model: stage1_clinical_screening
 * Purpose: 24-month MCI-to-AD progression risk
 * ----------------------------------- */

/* =========
 * Enums
 * ========= */
export type Stage1PredictedClass =
  | "HIGH_RISK_PROGRESSOR"
  | "LOW_RISK_MONITOR";

export type Stage1NextStep =
  | "PROCEED_TO_STAGE_2_MRI_GATE"
  | "CLINICAL_MONITORING";

/* =========
 * Input
 * Mirrors: Stage1ClinicalScreeningInput (Pydantic)
 * ========= */
export interface Stage1ClinicalScreeningInput {
  /** Patient identifier (optional) */
  patient_id?: string | number;

  /** Age in years (gt=0) */
  AGE: number;

  /** Biological sex: 0 = female, 1 = male */
  PTGENDER: 0 | 1;

  /** Years of education (ge=0) */
  PTEDUCAT: number;

  /** Number of APOE ε4 alleles: 0, 1, or 2 */
  APOE4: 0 | 1 | 2;

  /** Mini-Mental State Examination score (0–30) */
  MMSE: number;

  /** Study partner total Everyday Cognition score (ge=0) */
  EcogSPTotal: number;

  /** Patient minus study partner memory ECog score (unbounded) */
  EcogMem_discrepancy: number;

  /** RAVLT forgetting score (ge=0) */
  RAVLT_forgetting: number;

  /** RAVLT immediate recall score (ge=0) */
  RAVLT_immediate: number;
}

/* =========
 * Output
 * Mirrors: Stage1ClinicalScreeningOutput (Pydantic)
 * ========= */
export interface Stage1ClinicalScreeningOutput {
  /** Patient identifier (optional) */
  patient_id?: string | number;

  /** 24-month progression risk classification */
  predicted_class: Stage1PredictedClass;

  /** Confidence score (0–1) */
  confidence: number;

  /** Class probabilities */
  probabilities: Record<Stage1PredictedClass, number>;

  /** Predicted probability of progression (Target_24m = 1) */
  progression_probability: number;

  /** Decision threshold used for classification */
  threshold_used: number;

  /** Top contributing features */
  top_features?: string[];

  /** Recommended next step */
  next_step: Stage1NextStep;

  /* ---- from PredictionResponseBase ---- */
  model_name?: string;
  model_version?: string;
  timestamp?: string;
  assessment_id?: string;
  id?: string;
  notes?: string;
}