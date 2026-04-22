// ==========================================================
// Shared Types
// ==========================================================
export type Gender = "male" | "female";
export type Race = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type AlzheimerClass = "CN" | "MCI" | "AD";
export type PrognosisHorizon = "1yr" | "3yr" | "5yr";

// ✅ Explicit risk vocabularies (avoid ambiguity)
export type BinaryRiskLevel = "low" | "high";
export type ThreeLevelRisk = "low" | "moderate" | "high";
export type ScreeningRiskLevel = "low" | "intermediate" | "elevated";

// ==========================================================
// Alzheimer Diagnosis (General / Screening)
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

export interface AlzheimerDiagnosisOutput {
  patient_id?: string | number | null;
  model_name: string;
  model_version: string;
  predicted_class: AlzheimerClass;
  confidence: number;
  probabilities: Record<string, number>;
  top_features?: string[] | null;
}

// Frontend-friendly form
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

// Mapper
export function mapFormToBackend(
  form: AlzheimerDiagnosisFormData
): AlzheimerDiagnosisInput {
  return {
    patient_id: form.patient_id,
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

// Backward compatibility
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
  APOE4: number;
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
// ⚠️ Legacy / Research Models (kept for clinician validation)
// Alzheimer Prognosis 2-Year Models
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

  risk_level: ThreeLevelRisk;

  summary_text: string;
  top_features?: string[] | null;
  error?: string | null;
}

export interface AlzheimerPrognosis2yrExtendedInput
  extends AlzheimerPrognosis2yrCommonFeatures {
  ABETA: number | null;
  TAU: number | null;
  PTAU: number | null;
}

export interface AlzheimerPrognosis2yrExtendedOutput
  extends AlzheimerPrognosis2yrBasicOutput {}

// ==========================================================
// Alzheimer Cognitive Risk Screener
// ==========================================================
export type CognitiveTest = "moca" | "mmse" | "bach";

export interface AlzheimerRiskScreenerInput {
  patient_id?: string | number | null;

  age: number;
  gender: Gender;
  education_years: number;

  cognitive_test: CognitiveTest;
  cognitive_score: number;

  hippocampal_volume?: number | null;
}

export interface AlzheimerRiskScreenerOutput {
  patient_id?: string | number | null;

  model_name: string;
  model_version: string;

  risk_score: number;

  risk_level: ScreeningRiskLevel;

  next_step: string;
}

// ==========================================================
// Alzheimer Treatment Considerations
// ==========================================================
export interface AlzheimerTreatmentInput {
  patient_id?: string | number | null;

  diagnosis_stage: "MCI" | "AD";
  amyloid_biomarker_positive: boolean;
  apoe4_status?: boolean;
  age?: number;
}

export interface AlzheimerTreatmentOutput {
  patient_id?: string | number | null;

  model_name: string;
  model_version: string;

  eligible_for_anti_amyloid: boolean;

  aria_risk_level?: ThreeLevelRisk;

  recommendation: string;
}

// ==========================================================
// Alzheimer Prognosis (Unified ⭐ MAIN PRODUCT)
// ==========================================================

export interface AlzheimerUnifiedPrognosisInput {
  patient_id?: string | number | null;

  horizon: PrognosisHorizon;

  AGE: number;
  PTGENDER: Gender;
  PTEDUCAT: number;

  ADAS13: number;
  MOCA: number;

  APOE4_count: 0 | 1 | 2;
  GDTOTAL: number;
}

export interface DiagnosticPerformance {
  mode: "youden" | "high_sensitivity" | "high_specificity";
  threshold: number;
  sensitivity: number;
  specificity: number;
}

export interface AlzheimerUnifiedPrognosisOutput {
  patient_id?: string | number | null;

  model_name?: string;
  model_version?: string;

  horizon: PrognosisHorizon;

  probability_progression: number;
  probability_no_progression: number;

  risk_level: BinaryRiskLevel;

  threshold_used: number;
  mode: "youden" | "high_sensitivity" | "high_specificity";

  diagnostic_performance: DiagnosticPerformance;

  summary_text?: string | null;
}

// ==========================================================
// Frontend Form for Unified Prognosis
// ==========================================================

export interface AlzheimerPrognosisFormData {
  patient_id?: string | number | null;

  horizon: PrognosisHorizon;

  age: number;
  gender: Gender;
  educationYears: number;

  adas13: number;
  moca: number;

  apoe4Count: 0 | 1 | 2;
  gdTotal: number;
}

// Mapper
export function mapPrognosisFormToBackend(
  form: AlzheimerPrognosisFormData
): AlzheimerUnifiedPrognosisInput {
  return {
    patient_id: form.patient_id,
    horizon: form.horizon,

    AGE: form.age,
    PTGENDER: form.gender,
    PTEDUCAT: form.educationYears,

    ADAS13: form.adas13,
    MOCA: form.moca,

    APOE4_count: form.apoe4Count,
    GDTOTAL: form.gdTotal,
  };
}

