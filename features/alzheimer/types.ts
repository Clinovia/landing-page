// frontend/features/alzheimer/types.ts

// ==========================================================
// Shared Types
// ==========================================================
export type Gender = "male" | "female";
export type Race = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type AlzheimerClass = "CN" | "MCI" | "AD";
export type RiskCategory = "low" | "moderate" | "high";

// ==========================================================
// Backend-facing Alzheimer Diagnosis Input (matches Pydantic schema)
// ==========================================================
export interface AlzheimerDiagnosisInput {
  patient_id?: string | number | null;
  age: number;
  education_years: number;
  moca_score: number;
  adas13_score: number;
  cdr_sum: number;
  faq_total: number;
  gender: Gender;
  race: Race;
}

// Backend-facing output
export interface AlzheimerDiagnosisOutput {
  patient_id?: string | number | null;
  model_name: string;
  model_version: string;
  predicted_class: AlzheimerClass;
  confidence: number; // 0–1
  probabilities: Record<string, number>;
  top_features?: string[] | null;
}

// ==========================================================
// Frontend-friendly form type
// ==========================================================
export interface AlzheimerDiagnosisFormData {
  patient_id?: string | number | null;
  age: number;
  educationYears: number;
  mocaScore: number;
  adas13Score: number;
  cdrSum: number;
  faqTotal: number;
  gender: Gender;
  race: Race;
}

// Mapping function: form → backend
export function mapFormToBackend(
  form: AlzheimerDiagnosisFormData
): AlzheimerDiagnosisInput {
  return {
    age: form.age,
    education_years: form.educationYears,
    moca_score: form.mocaScore,
    adas13_score: form.adas13Score,
    cdr_sum: form.cdrSum,
    faq_total: form.faqTotal,
    gender: form.gender,
    race: form.race,
  };
}

// Alias for backward compatibility
export type AlzheimerDiagnosisScreeningInput = AlzheimerDiagnosisInput;
export type AlzheimerDiagnosisScreeningOutput = AlzheimerDiagnosisOutput;

// ==========================================================
// Alzheimer Diagnosis - Basic
// ==========================================================
export interface AlzheimerDiagnosisBasicInput {
  patient_id?: string | number | null;
  AGE: number;
  MMSE: number;
  FAQ: number;
  PTEDUCAT: number;
  PTGENDER: Gender;
  APOE4: number; // -1, 0, 1, 2
  RAVLT_immediate: number;
  MOCA: number;
  ADAS13: number;
}

export interface AlzheimerDiagnosisBasicOutput {
  patient_id?: string | number | null;
  model_name: string;
  model_version: string;
  predicted_class: AlzheimerClass;
  confidence: number;
  probabilities: Record<AlzheimerClass, number>;
  top_features?: string[] | null;
}

// ==========================================================
// Alzheimer Diagnosis - Extended
// ==========================================================
export interface AlzheimerDiagnosisExtendedInput
  extends AlzheimerDiagnosisBasicInput {
  Hippocampus?: number | null;
  Ventricles?: number | null;
  WholeBrain?: number | null;
  Entorhinal?: number | null;
  FDG?: number | null;
  AV45?: number | null;
  PIB?: number | null;
  FBB?: number | null;
  ABETA?: number | null;
  TAU?: number | null;
  PTAU?: number | null;
  mPACCdigit?: number | null;
  mPACCtrailsB?: number | null;
}

export interface AlzheimerDiagnosisExtendedOutput
  extends AlzheimerDiagnosisBasicOutput {}

// ==========================================================
// Alzheimer Prognosis 2-Year Models - Common
// ==========================================================
interface AlzheimerPrognosis2yrCommonFeatures {
  patient_id?: string | number | null;
  AGE: number;
  PTGENDER: Gender;
  PTEDUCAT: number;

  ADAS13: number;
  CDRSB: number;
  FAQ: number;

  APOE4_count: 0 | 1 | 2;
  GDTOTAL: number;
}

// ==========================================================
// 2-Year Prognosis - Basic (includes MOCA)
// ==========================================================
export interface AlzheimerPrognosis2yrBasicInput
  extends AlzheimerPrognosis2yrCommonFeatures {
  MOCA: number;
}

export interface AlzheimerPrognosis2yrBasicOutput {
  patient_id?: string | number | null;
  model_name?: string;
  model_version?: string;

  probability_progression_to_AD_within_2yrs: number;
  probability_stable_within_2yrs: number;

  risk_level: RiskCategory;

  summary_text: string;
  top_features?: string[] | null;
  error?: string | null;
}

// ==========================================================
// 2-Year Prognosis - Extended (biomarkers, no MOCA)
// ==========================================================
export interface AlzheimerPrognosis2yrExtendedInput
  extends AlzheimerPrognosis2yrCommonFeatures {
  ABETA: number | null;
  TAU: number | null;
  PTAU: number | null;
}

export interface AlzheimerPrognosis2yrExtendedOutput
  extends AlzheimerPrognosis2yrBasicOutput {}

// ==========================================================
// Alzheimer Cognitive Impairment Screening (Refactored)
// ==========================================================

export type CognitiveTest = "moca" | "mmse" | "bach";

export interface AlzheimerRiskScreenerInput {
  patient_id?: string | number | null;

  // Demographics
  age: number;              // 40–90
  gender: Gender;
  education_years: number;

  // Cognitive assessment (explicit, not vague)
  cognitive_test: CognitiveTest;
  cognitive_score: number;

  // Optional structural imaging
  hippocampal_volume?: number | null;
}

export interface AlzheimerRiskScreenerOutput {
  patient_id?: string | number | null;

  model_name: string;
  model_version: string;

  risk_score: number; // 0–1

  // More clinically appropriate language
  risk_level: "low" | "intermediate" | "elevated";

  // Action-oriented output (this is key for clinicians)
  next_step: string;
}

// ==========================================================
// Alzheimer Treatment Considerations (NEW)
// ==========================================================

export interface AlzheimerTreatmentInput {
  patient_id?: string | number | null;

  // Must already be clinically evaluated
  diagnosis_stage: "MCI" | "AD";

  // Required for therapy decisions
  amyloid_biomarker_positive: boolean;

  // APOE only meaningful here
  apoe4_status?: boolean;

  // Optional context
  age?: number;
}

export interface AlzheimerTreatmentOutput {
  patient_id?: string | number | null;

  model_name: string;
  model_version: string;

  eligible_for_anti_amyloid: boolean;

  aria_risk_level?: "low" | "moderate" | "high";

  recommendation: string;
}