/**
 * Alzheimer's Module API Client (Next.js API Routes)
 * Calls /api/v1/alzheimer/* (App Router)
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
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
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
  return authedFetch("/api/v1/alzheimer/diagnosisScreening", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function riskScreener(
  data: AlzheimerRiskScreenerInput
): Promise<AlzheimerRiskScreenerOutput> {
  return authedFetch("/api/v1/alzheimer/riskScreener", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function diagnosisBasic(
  data: AlzheimerDiagnosisBasicInput
): Promise<AlzheimerDiagnosisBasicOutput> {
  return authedFetch("/api/v1/alzheimer/diagnosisBasic", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function diagnosisExtended(
  data: AlzheimerDiagnosisExtendedInput
): Promise<AlzheimerDiagnosisExtendedOutput> {
  return authedFetch("/api/v1/alzheimer/diagnosisExtended", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function prognosis2YrBasic(
  data: AlzheimerPrognosis2yrBasicInput
): Promise<AlzheimerPrognosis2yrBasicOutput> {
  return authedFetch("/api/v1/alzheimer/prognosis2yrBasic", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function prognosis2YrExtended(
  data: AlzheimerPrognosis2yrExtendedInput
): Promise<AlzheimerPrognosis2yrExtendedOutput> {
  return authedFetch("/api/v1/alzheimer/prognosis2yrExtended", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------------------------------ */
/* History / Results                                                  */
/* ------------------------------------------------------------------ */

export function getAssessmentHistory(userId?: string) {
  const query = userId ? `?userId=${userId}` : "";
  return authedFetch(`/api/v1/alzheimer/diagnosisScreening/history${query}`);
}

export function getAssessmentById(assessmentId: string) {
  return authedFetch(`/api/v1/alzheimer/diagnosisScreening/results/${assessmentId}`);
}
