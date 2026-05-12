/* -------------------------------------
 * Alzheimer API (Stage 1, 2A, 2B)
 * Thin client — NO transformations
 * ----------------------------------- */

import { apiClient } from "@/lib/apiClient";

/* -------------------------------------
 * API BASE
 * ----------------------------------- */

const ASSESSMENT_BASE =
  "/api/v1/assessments";


/* -------------------------------------
 * Stage 1 — Clinical Screening
 * ----------------------------------- */

import type {
  Stage1ClinicalScreeningInput,
  Stage1ClinicalScreeningOutput,
} from "@/features/alzheimer/stage1/types";

export type Stage1Output =
  Stage1ClinicalScreeningOutput;

export type Stage1Input =
  Stage1ClinicalScreeningInput;

export async function runStage1(
  input: Stage1Input
): Promise<Stage1Output> {

  return apiClient.post<Stage1Output>(
    `${ASSESSMENT_BASE}/stage1-clinical`,
    input
  );
}


/* -------------------------------------
 * Stage 2A — Plasma (Amyloid)
 * ----------------------------------- */

import type {
  Stage2aPlasmaModelInput,
  Stage2aPlasmaModelOutput,
} from "@/features/alzheimer/stage2a/types";

export type Stage2aOutput =
  Stage2aPlasmaModelOutput;

export type Stage2aInput =
  Stage2aPlasmaModelInput;

export async function runStage2a(
  input: Stage2aInput
): Promise<Stage2aOutput> {

  return apiClient.post<Stage2aOutput>(
    `${ASSESSMENT_BASE}/stage2a-plasma`,
    input
  );
}


/* -------------------------------------
 * Stage 2B — MRI (Neurodegeneration)
 * ----------------------------------- */

import type {
  Stage2bMRIGateInput,
  Stage2bMRIGateOutput,
} from "@/features/alzheimer/stage2b/types";

export type Stage2bOutput =
  Stage2bMRIGateOutput;

export type Stage2bInput =
  Stage2bMRIGateInput;

export async function runStage2b(
  input: Stage2bInput
): Promise<Stage2bOutput> {

  return apiClient.post<Stage2bOutput>(
    `${ASSESSMENT_BASE}/stage2b-mri`,
    input
  );
}


/* -------------------------------------
 * Decision Support (optional future)
 * ----------------------------------- */

export type ClinicalSummary = {
  summary: string;
};

export type RiskStratification = {
  risk_level:
    | "LOW"
    | "INTERMEDIATE"
    | "HIGH";
};

export type PathwayDecision = {
  next_step: string;
  rationale: string;
};

export type PetSimulation = {
  expected_positivity: number;

  // Clinical utility metrics
  nnt?: number;
  ppv?: number;
  npv?: number;

  // Optional interpretation layer
  risk_band?:
    | "LOW"
    | "INTERMEDIATE"
    | "HIGH";

  recommendation?: string;

  // Model metadata
  confidence?: number;
};

export type PatientCommunication = {
  message: string;
};

export type UncertaintyResult = {
  uncertainty_score: number;
};

export type DecisionSupportInput = {
  patient_id?: string | number;
};