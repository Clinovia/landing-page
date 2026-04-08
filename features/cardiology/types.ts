// frontend/features/cardiology/types.ts

export type CardioRace = "white" | "black" | "hispanic" | "asian" | "other";

// ======================
// Shared Base Output
// ======================
export interface AssessmentBaseOutput {
  assessment_id?: string; // UUID from backend
  patient_id?: string | number | null;
  model_name: string;
}

// ======================
// 1. ASCVD Risk
// ======================
export interface ASCVDInput {
patient_id?: string | number | null;
age: number; // 40-79
gender: "male" | "female";
race: "white" | "black" | "hispanic" | "asian" | "other";
total_cholesterol: number; // 130-320
hdl_cholesterol: number; // 20-100
systolic_bp: number; // 90-200
on_hypertension_treatment: boolean;
smoker: boolean;
diabetes: boolean;
}

export interface ASCVDOutput extends AssessmentBaseOutput {
risk_percentage: number; // 0-100
risk_category: "low" | "borderline" | "intermediate" | "high";
}

// ======================
// 2. Blood Pressure Category
// ======================
export interface BPCategoryInput {
patient_id?: string | number | null;
systolic_bp: number; // 70-250
diastolic_bp: number; // 40-150
}

export interface BPCategoryOutput extends AssessmentBaseOutput {
category:
| "normal"
| "elevated"
| "hypertension_stage_1"
| "hypertension_stage_2"
| "hypertensive_crisis";
}

// ======================
// 3. CHA₂DS₂-VASc Score
// ======================
export interface CHA2DS2VAScInput {
patient_id?: string | number | null;
age: number; // 18-120
gender: "male" | "female";
congestive_heart_failure: boolean;
hypertension: boolean;
diabetes: boolean;
stroke_tia_thromboembolism: boolean;
vascular_disease: boolean;
}

export interface CHA2DS2VAScOutput extends AssessmentBaseOutput {
score: number; // 0-9
risk_category: "low" | "moderate" | "high";
}

// ======================
// 4. ECG Interpretation
// ======================
export interface ECGInterpretationInput {
patient_id?: string | number | null;
heart_rate: number; // 20-300
qrs_duration: number; // 50-200
qt_interval?: number; // 300-600
pr_interval?: number; // 80-400
rhythm: "sinus" | "afib" | "flutter" | "other";
st_elevation?: boolean; // default false
t_wave_inversion?: boolean; // default false
}

export interface ECGInterpretationOutput extends AssessmentBaseOutput {
findings: (
| "normal"
| "sinus_tachycardia"
| "sinus_bradycardia"
| "afib"
| "lvh"
| "st_elevation"
| "t_wave_abnormality"
| "prolonged_qt"
)[];

rhythm: string;
overall_risk: "routine" | "urgent" | "emergent";
model_version: string;
}
