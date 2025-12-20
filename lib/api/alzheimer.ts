// lib/api/alzheimer.ts
/**
 * Alzheimer's Module API Client (Next.js API Routes)
 * Calls /api/v1/alzheimer/* (App Router)
 *
 * URL convention: kebab-case
 * Function convention: camelCase
 */

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
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

async function authedFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }

  return res.json();
}

/* ------------------------------------------------------------------ */
/* API Functions                                                      */
/* ------------------------------------------------------------------ */

export function diagnosisScreening(
  data: AlzheimerDiagnosisScreeningInput
): Promise<AlzheimerDiagnosisScreeningOutput> {
  return authedFetch("/api/v1/alzheimer/diagnosis-screening", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function riskScreener(
  data: AlzheimerRiskScreenerInput
): Promise<AlzheimerRiskScreenerOutput> {
  return authedFetch("/api/v1/alzheimer/risk-screener", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function diagnosisBasic(
  data: AlzheimerDiagnosisBasicInput
): Promise<AlzheimerDiagnosisBasicOutput> {
  return authedFetch("/api/v1/alzheimer/diagnosis-basic", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function diagnosisExtended(
  data: AlzheimerDiagnosisExtendedInput
): Promise<AlzheimerDiagnosisExtendedOutput> {
  return authedFetch("/api/v1/alzheimer/diagnosis-extended", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function prognosis2YrBasic(
  data: AlzheimerPrognosis2yrBasicInput
): Promise<AlzheimerPrognosis2yrBasicOutput> {
  return authedFetch("/api/v1/alzheimer/prognosis-2yr-basic", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function prognosis2YrExtended(
  data: AlzheimerPrognosis2yrExtendedInput
): Promise<AlzheimerPrognosis2yrExtendedOutput> {
  return authedFetch("/api/v1/alzheimer/prognosis-2yr-extended", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------------------------------ */
/* History / Results                                                  */
/* ------------------------------------------------------------------ */

export function getAssessmentHistory() {
  return authedFetch(
    "/api/v1/alzheimer/diagnosis-screening/history"
  );
}

export function getAssessmentById(assessmentId: string) {
  return authedFetch(
    `/api/v1/alzheimer/diagnosis-screening/results/${assessmentId}`
  );
}
