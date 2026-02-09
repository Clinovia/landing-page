import { apiClient } from "../apiClient";
import type {
  AlzheimerDiagnosisScreeningInput,
  AlzheimerDiagnosisScreeningOutput,
  AlzheimerRiskScreenerInput,
  AlzheimerRiskScreenerOutput,
  AlzheimerDiagnosisBasicInput,
  AlzheimerDiagnosisBasicOutput,
  AlzheimerDiagnosisExtendedInput,
  AlzheimerDiagnosisExtendedOutput,
  AlzheimerPrognosis2yrBasicInput,
  AlzheimerPrognosis2yrBasicOutput,
  AlzheimerPrognosis2yrExtendedInput,
  AlzheimerPrognosis2yrExtendedOutput,
} from "@/features/alzheimer/types";

/* ------------------------------------------------------------------ */
/* Diagnosis                                                          */
/* ------------------------------------------------------------------ */

export async function diagnosisScreening(
  data: AlzheimerDiagnosisScreeningInput
): Promise<AlzheimerDiagnosisScreeningOutput> {
  const res = await apiClient.post(
    "/api/v1/alzheimer/diagnosis-screening",
    data
  );
  return res.data;
}

export async function diagnosisBasic(
  data: AlzheimerDiagnosisBasicInput
): Promise<AlzheimerDiagnosisBasicOutput> {
  const res = await apiClient.post(
    "/api/v1/alzheimer/diagnosis-basic",
    data
  );
  return res.data;
}

export async function diagnosisExtended(
  data: AlzheimerDiagnosisExtendedInput
): Promise<AlzheimerDiagnosisExtendedOutput> {
  const res = await apiClient.post(
    "/api/v1/alzheimer/diagnosis-extended",
    data
  );
  return res.data;
}

/* ------------------------------------------------------------------ */
/* Risk Screener (Rule-based)                                          */
/* ------------------------------------------------------------------ */

export async function riskScreener(
  data: AlzheimerRiskScreenerInput
): Promise<AlzheimerRiskScreenerOutput> {
  const res = await apiClient.post(
    "/api/v1/alzheimer/risk-screener",
    data
  );
  return res.data;
}

/* ------------------------------------------------------------------ */
/* Prognosis (2-Year)                                                  */
/* ------------------------------------------------------------------ */

export async function prognosis2YrBasic(
  data: AlzheimerPrognosis2yrBasicInput
): Promise<AlzheimerPrognosis2yrBasicOutput> {
  const res = await apiClient.post(
    "/api/v1/alzheimer/prognosis-2yr-basic",
    data
  );
  return res.data;
}

export async function prognosis2YrExtended(
  data: AlzheimerPrognosis2yrExtendedInput
): Promise<AlzheimerPrognosis2yrExtendedOutput> {
  const res = await apiClient.post(
    "/api/v1/alzheimer/prognosis-2yr-extended",
    data
  );
  return res.data;
}
