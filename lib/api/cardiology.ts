/**
 * Cardiology Module API Client (Next.js API Routes)
 * Calls /api/v1/cardiology/* (App Router)
 */

import type {
  ASCVDInput,
  ASCVDOutput,
  BPCategoryInput,
  BPCategoryOutput,
  CHA2DS2VAScInput,
  CHA2DS2VAScOutput,
  ECGInterpreterInput,
  ECGInterpreterOutput,
  EchonetEFInput,
  EchonetEFOutput,
} from '@/features/cardiology/types';

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
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
        : { 'Content-Type': 'application/json' }),
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

/**
 * ASCVD Risk Calculator
 */
export function calculateASCVD(
  data: ASCVDInput
): Promise<ASCVDOutput> {
  return authedFetch('/api/v1/cardiology/ascvd', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Blood Pressure Category
 */
export function categorizeBP(
  data: BPCategoryInput
): Promise<BPCategoryOutput> {
  return authedFetch('/api/v1/cardiology/bp-category', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * CHA₂DS₂-VASc Score
 */
export function calculateCHA2DS2VASc(
  data: CHA2DS2VAScInput
): Promise<CHA2DS2VAScOutput> {
  return authedFetch('/api/v1/cardiology/cha2ds2vasc', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * ECG Interpreter
 */
export function interpretECG(
  data: ECGInterpreterInput
): Promise<ECGInterpreterOutput> {
  return authedFetch('/api/v1/cardiology/ecg-interpreter', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Echonet EF Prediction (file upload)
 */
export async function predictEchonetEF(
  file: File
): Promise<EchonetEFOutput> {
  const token = getAccessToken();

  const formData = new FormData();
  formData.append('video_file', file);

  const res = await fetch('/api/v1/cardiology/ejection-fraction', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Upload failed (${res.status})`);
  }

  return res.json();
}

/* ------------------------------------------------------------------ */
/* History / Results                                                  */
/* ------------------------------------------------------------------ */

export function getCardiologyHistory(userId?: string) {
  const query = userId ? `?userId=${userId}` : '';
  return authedFetch(
    `/api/v1/cardiology/ascvd/history${query}`
  );
}

export function getCardiologyAssessmentById(
  assessmentId: string,
  type: string
) {
  return authedFetch(
    `/api/v1/cardiology/${type}/results/${assessmentId}`
  );
}

/* ------------------------------------------------------------------ */
/* Extras                                                             */
/* ------------------------------------------------------------------ */

export function saveCardiologyDraft(
  assessmentType: string,
  data: any
) {
  return authedFetch(
    `/api/v1/cardiology/${assessmentType}/draft`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

export function exportCardiologyResults(
  assessmentId: string,
  assessmentType: string,
  format: 'pdf' | 'json' | 'csv' = 'pdf'
) {
  return authedFetch(
    `/api/v1/cardiology/${assessmentType}/export/${assessmentId}?format=${format}`
  );
}

export function compareAssessments(assessmentIds: string[]) {
  return authedFetch('/api/v1/cardiology/compare', {
    method: 'POST',
    body: JSON.stringify({ assessment_ids: assessmentIds }),
  });
}

export function getTreatmentGuidelines(
  assessmentType: string,
  resultData: any
): Promise<{ guidelines: string[]; references: string[] }> {
  return authedFetch(
    `/api/v1/cardiology/${assessmentType}/guidelines`,
    {
      method: 'POST',
      body: JSON.stringify(resultData),
    }
  );
}
