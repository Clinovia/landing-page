// frontend/features/risk-assessment/types.ts

export type ModelType =
  | "clinical_mmse"
  | "clinical_ravlt"
  | "clinical_limm"
  | "clinical_ravlt_limm"
  | "mri_mmse"
  | "mri_mmse_ravlt"
  | "mri_mmse_limm"
  | "mri_mmse_ravlt_limm";

export interface RiskAssessmentInput {
  patient_id?: string;

  // Demographics
  AGE: number;
  PTGENDER: 0 | 1;

  // Cognitive
  MMSE: number;
  RAVLT_immediate?: number;
  LIMM_Total?: number;

  // MRI
  Hippocampus?: number;
  Entorhinal?: number;
  MidTemp?: number;
  WholeBrain?: number;
  Ventricles?: number;
}

export interface RiskAssessmentOutput {
  assessment_id: string;

  model_type: ModelType;
  model_version: string;

  progression_probability: number;
  risk_category: string;

  confidence: number | null;
  threshold_used: number;
  recommended_next_step: string;

  top_features: string[];

  pdf_url?: string;
}