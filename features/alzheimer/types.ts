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
  AGE: number;
  PTEDUCAT: number;
  MOCA: number;
  ADAS13: number;
  CDRSB: number;
  FAQ: number;
  PTGENDER: Gender;
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
    AGE: form.age,
    PTEDUCAT: form.educationYears,
    MOCA: form.mocaScore,
    ADAS13: form.adas13Score,
    CDRSB: form.cdrSum,
    FAQ: form.faqTotal,
    PTGENDER: form.gender,
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
// Alzheimer Risk Screener
// ==========================================================
export interface AlzheimerRiskScreenerInput {
  patient_id?: string | number | null;
  age: number;              // 40–90
  gender: Gender;           // "male" | "female"
  education_years: number;  // match backend
  apoe4_status: boolean;
  memory_score: number;     // MoCA-like
  hippocampal_volume?: number | null;
}

export interface AlzheimerRiskScreenerOutput {
  patient_id?: string | number | null;
  model_name: string;       // e.g., "alz-risk-screener-heuristic-v1"
  model_version: string;
  risk_score: number;       // e.g., 0–1
  risk_category: "low" | "moderate" | "high" | "error";
  recommendation: string;
}
