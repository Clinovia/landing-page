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
/* Shared Helper                                                       */
/* ------------------------------------------------------------------ */

async function post<TInput, TOutput>(
  url: string,
  data: TInput
): Promise<TOutput> {
  const { data: response } = await apiClient.post<TOutput>(url, data);
  return response;
}

/* ------------------------------------------------------------------ */
/* Diagnosis                                                           */
/* ------------------------------------------------------------------ */

export const diagnosisScreening = (
  data: AlzheimerDiagnosisScreeningInput
) =>
  post<AlzheimerDiagnosisScreeningInput, AlzheimerDiagnosisScreeningOutput>(
    "/api/v1/alzheimer/diagnosis-screening",
    data
  );

export const diagnosisBasic = (
  data: AlzheimerDiagnosisBasicInput
) =>
  post<AlzheimerDiagnosisBasicInput, AlzheimerDiagnosisBasicOutput>(
    "/api/v1/alzheimer/diagnosis-basic",
    data
  );

export const diagnosisExtended = (
  data: AlzheimerDiagnosisExtendedInput
) =>
  post<AlzheimerDiagnosisExtendedInput, AlzheimerDiagnosisExtendedOutput>(
    "/api/v1/alzheimer/diagnosis-extended",
    data
  );

/* ------------------------------------------------------------------ */
/* Risk Screener (Rule-based)                                          */
/* ------------------------------------------------------------------ */

export const riskScreener = (
  data: AlzheimerRiskScreenerInput
) =>
  post<AlzheimerRiskScreenerInput, AlzheimerRiskScreenerOutput>(
    "/api/v1/alzheimer/risk-screener",
    data
  );

/* ------------------------------------------------------------------ */
/* Prognosis (2-Year)                                                  */
/* ------------------------------------------------------------------ */

export const prognosis2YrBasic = (
  data: AlzheimerPrognosis2yrBasicInput
) =>
  post<AlzheimerPrognosis2yrBasicInput, AlzheimerPrognosis2yrBasicOutput>(
    "/api/v1/alzheimer/prognosis-2yr-basic",
    data
  );

export const prognosis2YrExtended = (
  data: AlzheimerPrognosis2yrExtendedInput
) =>
  post<
    AlzheimerPrognosis2yrExtendedInput,
    AlzheimerPrognosis2yrExtendedOutput
  >(
    "/api/v1/alzheimer/prognosis-2yr-extended",
    data
  );
