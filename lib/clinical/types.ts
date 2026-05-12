/* ─────────────────────────────────────────────
 * Stage 1 — Clinical
 * ───────────────────────────────────────────── */
export interface Stage1Input {
  patient_id?: string | number;
  age: number;
  education: number;
  gender: "male" | "female" | "other";
  apoe4: 0 | 1;
  mmse: number;
  moca?: number;
  ecog?: number;
}

export interface Stage1Output {
  risk_score: number;
  risk_level: "LOW" | "INTERMEDIATE" | "HIGH";
  probability: number;
}

/* ─────────────────────────────────────────────
 * Stage 2A — Plasma (Amyloid)
 * ───────────────────────────────────────────── */
export interface Stage2aInput {
  patient_id?: string | number;
  plasma_abeta42_40: number;
  ptau181: number;
  nfl?: number;
}

export interface Stage2aOutput {
  amyloid_probability: number;
  positive: boolean;
}

/* ─────────────────────────────────────────────
 * Stage 2B — MRI (Neurodegeneration)
 * ───────────────────────────────────────────── */
export interface Stage2bInput {
  patient_id?: string | number;
  hippocampal_volume: number;
  cortical_thickness: number;
  ventricle_volume: number;
}

export interface Stage2bOutput {
  neurodegeneration_score: number;
  positive: boolean;
}

/* ─────────────────────────────────────────────
 * Unified context input (IMPORTANT)
 * ───────────────────────────────────────────── */
export interface ClinicalContext {
  stage1?: Stage1Output;
  stage2a?: Stage2aOutput;
  stage2b?: Stage2bOutput;
}