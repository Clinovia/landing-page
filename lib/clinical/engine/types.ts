// lib/clinical/engine/types.ts

import type { Stage1Output, Stage2aOutput, Stage2bOutput } from "../types";

export interface ClinicalEngineInput {
  stage1?: Stage1Output;
  stage2a?: Stage2aOutput;
  stage2b?: Stage2bOutput;
}

export interface ClinicalEngineOutput {
  riskLevel: "LOW" | "INTERMEDIATE" | "HIGH";

  pathway: {
    nextStep: string;
    rationale: string;
  };

  summary: {
    text: string;
  };

  uncertainty: {
    score: number;
    label: "LOW" | "MEDIUM" | "HIGH";
  };
}