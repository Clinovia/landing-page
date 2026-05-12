import type {
  Stage1Output,
  Stage2aOutput,
  Stage2bOutput,
} from "@/lib/api/alzheimer";

export interface ClinicalGraphState {
  stage1?: Stage1Output;
  stage2a?: Stage2aOutput;
  stage2b?: Stage2bOutput;

  /**
   * Unified latent clinical risk score (0–1)
   */
  global_risk_score: number;

  /**
   * Uncertainty propagation across modalities
   */
  uncertainty: number;
}