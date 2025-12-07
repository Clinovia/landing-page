// frontend/lib/api/cardiology.ts
/**
 * Cardiology Module API Client
 * Handles all API calls for cardiovascular assessment tools
 */

import { apiClient } from './client';
import { API_ENDPOINTS } from '@/config';
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

// ==================== API Functions ====================

/**
 * ASCVD Risk Calculator - 10-year cardiovascular disease risk
 */
export async function calculateASCVD(data: ASCVDInput): Promise<ASCVDOutput> {
  return apiClient.post<ASCVDOutput>(API_ENDPOINTS.CARDIOLOGY.ASCVD, data);
}

/**
 * Blood Pressure Category - Classify BP readings
 */
export async function categorizeBP(data: BPCategoryInput): Promise<BPCategoryOutput> {
  return apiClient.post<BPCategoryOutput>(API_ENDPOINTS.CARDIOLOGY.BP_CATEGORY, data);
}

/**
 * CHA₂DS₂-VASc Score - Stroke risk in atrial fibrillation
 */
export async function calculateCHA2DS2VASc(
  data: CHA2DS2VAScInput
): Promise<CHA2DS2VAScOutput> {
  return apiClient.post<CHA2DS2VAScOutput>(
    API_ENDPOINTS.CARDIOLOGY.CHA2DS2_VASC,
    data
  );
}

/**
 * ECG Interpreter - AI-powered ECG analysis
 */
export async function interpretECG(
  data: ECGInterpreterInput
): Promise<ECGInterpreterOutput> {
  return apiClient.post<ECGInterpreterOutput>(
    API_ENDPOINTS.CARDIOLOGY.ECG_INTERPRETER,
    data
  );
}

/**
 * Echonet EF Prediction - Predict ejection fraction from echocardiogram video
 * Note: This requires file upload handling
 */
export async function predictEchonetEF(file: File): Promise<EchonetEFOutput> {
  const formData = new FormData();
  formData.append('video_file', file);

  // For file uploads, we need to use fetch directly without JSON content-type
  const response = await fetch(`${API_ENDPOINTS.CARDIOLOGY.EF_PREDICTION}`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${apiClient.getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`EF prediction failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get cardiology assessment history
 */
export async function getCardiologyHistory(userId?: string) {
  const params = userId ? `?userId=${userId}` : '';
  return apiClient.get(`${API_ENDPOINTS.CARDIOLOGY.ASCVD}/history${params}`);
}

/**
 * Get specific assessment result by ID
 */
export async function getCardiologyAssessmentById(assessmentId: string, type: string) {
  return apiClient.get(`/api/v1/cardiology/${type}/results/${assessmentId}`);
}

/**
 * Save assessment for later
 */
export async function saveCardiologyDraft(assessmentType: string, data: any) {
  return apiClient.post(`/api/v1/cardiology/${assessmentType}/draft`, data);
}

/**
 * Export assessment results
 */
export async function exportCardiologyResults(
  assessmentId: string,
  assessmentType: string,
  format: 'pdf' | 'json' | 'csv' = 'pdf'
) {
  return apiClient.get(
    `/api/v1/cardiology/${assessmentType}/export/${assessmentId}?format=${format}`
  );
}

/**
 * Compare multiple assessments
 */
export async function compareAssessments(assessmentIds: string[]) {
  return apiClient.post('/api/v1/cardiology/compare', { assessment_ids: assessmentIds });
}

/**
 * Get treatment guidelines based on results
 */
export async function getTreatmentGuidelines(
  assessmentType: string,
  resultData: any
): Promise<{ guidelines: string[]; references: string[] }> {
  return apiClient.post(`/api/v1/cardiology/${assessmentType}/guidelines`, resultData);
}