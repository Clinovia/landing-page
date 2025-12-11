/**
 * Cardiology Module API Client
 * Handles all API calls for cardiovascular assessment tools
 */

import { apiRequest, apiRequestWithFile } from '../supabaseClient';
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
  return apiRequest<ASCVDOutput>({
    url: API_ENDPOINTS.CARDIOLOGY.ASCVD,
    method: 'POST',
    data,
  });
}

/**
 * Blood Pressure Category - Classify BP readings
 */
export async function categorizeBP(
  data: BPCategoryInput
): Promise<BPCategoryOutput> {
  return apiRequest<BPCategoryOutput>({
    url: API_ENDPOINTS.CARDIOLOGY.BP_CATEGORY,
    method: 'POST',
    data,
  });
}

/**
 * CHA₂DS₂-VASc Score - Stroke risk in atrial fibrillation
 */
export async function calculateCHA2DS2VASc(
  data: CHA2DS2VAScInput
): Promise<CHA2DS2VAScOutput> {
  return apiRequest<CHA2DS2VAScOutput>({
    url: API_ENDPOINTS.CARDIOLOGY.CHA2DS2_VASC,
    method: 'POST',
    data,
  });
}

/**
 * ECG Interpreter - AI-powered ECG analysis
 */
export async function interpretECG(
  data: ECGInterpreterInput
): Promise<ECGInterpreterOutput> {
  return apiRequest<ECGInterpreterOutput>({
    url: API_ENDPOINTS.CARDIOLOGY.ECG_INTERPRETER,
    method: 'POST',
    data,
  });
}

/**
 * Echonet EF Prediction - Requires file upload
 */
export async function predictEchonetEF(
  file: File
): Promise<EchonetEFOutput> {
  return apiRequestWithFile<EchonetEFOutput>({
    url: API_ENDPOINTS.CARDIOLOGY.EF_PREDICTION,
    fileField: 'video_file',
    file,
  });
}

/**
 * Get cardiology assessment history
 */
export async function getCardiologyHistory(userId?: string) {
  const params = userId ? `?userId=${userId}` : '';

  return apiRequest({
    url: `${API_ENDPOINTS.CARDIOLOGY.ASCVD}/history${params}`,
    method: 'GET',
  });
}

/**
 * Get specific assessment result by ID
 */
export async function getCardiologyAssessmentById(
  assessmentId: string,
  type: string
) {
  return apiRequest({
    url: `/api/v1/cardiology/${type}/results/${assessmentId}`,
    method: 'GET',
  });
}

/**
 * Save assessment for later
 */
export async function saveCardiologyDraft(
  assessmentType: string,
  data: any
) {
  return apiRequest({
    url: `/api/v1/cardiology/${assessmentType}/draft`,
    method: 'POST',
    data,
  });
}

/**
 * Export assessment results
 */
export async function exportCardiologyResults(
  assessmentId: string,
  assessmentType: string,
  format: 'pdf' | 'json' | 'csv' = 'pdf'
) {
  return apiRequest({
    url: `/api/v1/cardiology/${assessmentType}/export/${assessmentId}?format=${format}`,
    method: 'GET',
  });
}

/**
 * Compare multiple assessments
 */
export async function compareAssessments(assessmentIds: string[]) {
  return apiRequest({
    url: `/api/v1/cardiology/compare`,
    method: 'POST',
    data: { assessment_ids: assessmentIds },
  });
}

/**
 * Get treatment guidelines based on results
 */
export async function getTreatmentGuidelines(
  assessmentType: string,
  resultData: any
): Promise<{ guidelines: string[]; references: string[] }> {
  return apiRequest({
    url: `/api/v1/cardiology/${assessmentType}/guidelines`,
    method: 'POST',
    data: resultData,
  });
}
