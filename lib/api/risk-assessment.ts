// frontend/lib/api/risk-assessment.ts

import { apiRequest } from "@/lib/apiClient";

export type ModelType =
  | "clinical_cognitive"
  | "clinical_cognitive_mri";

export interface RiskAssessmentInput {
  patient_id?: string;
  model_type: ModelType;

  AGE: number;
  PTGENDER: 0 | 1;
  MMSE: number;
  RAVLT_immediate: number;

  Hippocampus?: number;
  Entorhinal?: number;
  MidTemp?: number;
  WholeBrain?: number;
  Ventricles?: number;
}

export interface RiskAssessmentOutput {
  assessment_id: string;

  progression_probability: number;
  risk_category: string;

  confidence?: number;
  threshold_used: number;
  recommended_next_step: string;

  top_features: string[];

  pdf_url?: string;
}

export async function runRiskAssessment(
  input: RiskAssessmentInput
): Promise<RiskAssessmentOutput> {
  return apiRequest<RiskAssessmentOutput>({
    path: "/api/v1/risk-assessment",
    method: "POST",
    body: input,
  });
}