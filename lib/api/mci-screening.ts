/**
 * -------------------------------------------------------
 * Alzheimer API
 * Stage 1 — Clinical Screening
 * Thin client — no transformations
 * -------------------------------------------------------
 */

import { apiClient } from "@/lib/apiClient";

import type {
  MCIScreeningInput,
  MCIScreeningOutput,
} from "@/features/mci-screening/types";

/* -------------------------------------------------------
 * Re-export Types
 * ----------------------------------------------------- */

export type {
  MCIScreeningInput,
  MCIScreeningOutput,
} from "@/features/mci-screening/types";

/* -------------------------------------------------------
 * API Base
 * ----------------------------------------------------- */

const ASSESSMENT_BASE = "/api/v1/assessments";

/* -------------------------------------------------------
 * Stage 1 — Clinical Screening
 * ----------------------------------------------------- */

export async function runMCIScreening(
  input: MCIScreeningInput
): Promise<MCIScreeningOutput> {
  return apiClient.post<MCIScreeningOutput>(
    `${ASSESSMENT_BASE}/mci-screening`,
    input
  );
}