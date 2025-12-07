// lib/api/alzheimer.ts
/**
 * Alzheimer's Module API Client
 * Handles all API calls for Alzheimer's diagnosis and prognosis tools
 */

import { apiClient } from './client';
import { API_ENDPOINTS } from '@/config';
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
} from '@/features/alzheimer/types';

// ==================== API Functions ====================

/**
 * Diagnosis Screening - Quick initial assessment
 */
export async function diagnosisScreening(
  data: AlzheimerDiagnosisScreeningInput
): Promise<AlzheimerDiagnosisScreeningOutput> {
  return apiClient.post<AlzheimerDiagnosisScreeningOutput>(
    API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_SCREENING,
    data
  );
}

/**
 * Risk Screener - Lifetime risk assessment
 */
export async function riskScreener(
  data: AlzheimerRiskScreenerInput
): Promise<AlzheimerRiskScreenerOutput> {
  return apiClient.post<AlzheimerRiskScreenerOutput>(
    API_ENDPOINTS.ALZHEIMER.RISK_SCREENER,
    data
  );
}

/**
 * Basic Diagnosis - Standard diagnostic assessment
 */
export async function diagnosisBasic(
  data: AlzheimerDiagnosisBasicInput
): Promise<AlzheimerDiagnosisBasicOutput> {
  return apiClient.post<AlzheimerDiagnosisBasicOutput>(
    API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_BASIC,
    data
  );
}

/**
 * Extended Diagnosis - Comprehensive diagnostic evaluation
 */
export async function diagnosisExtended(
  data: AlzheimerDiagnosisExtendedInput
): Promise<AlzheimerDiagnosisExtendedOutput> {
  return apiClient.post<AlzheimerDiagnosisExtendedOutput>(
    API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_EXTENDED,
    data
  );
}

/**
 * 2-Year Prognosis (Basic) - Predict disease progression
 */
export async function prognosis2YrBasic(
  data: AlzheimerPrognosis2yrBasicInput
): Promise<AlzheimerPrognosis2yrBasicOutput> {
  return apiClient.post<AlzheimerPrognosis2yrBasicOutput>(
    API_ENDPOINTS.ALZHEIMER.PROGNOSIS_2YR_BASIC,
    data
  );
}

/**
 * 2-Year Prognosis (Extended) - Detailed progression analysis
 */
export async function prognosis2YrExtended(
  data: AlzheimerPrognosis2yrExtendedInput
): Promise<AlzheimerPrognosis2yrExtendedOutput> {
  return apiClient.post<AlzheimerPrognosis2yrExtendedOutput>(
    API_ENDPOINTS.ALZHEIMER.PROGNOSIS_2YR_EXTENDED,
    data
  );
}

/**
 * Get assessment history
 */
export async function getAssessmentHistory(userId?: string) {
  const params = userId ? `?userId=${userId}` : '';
  return apiClient.get(
    `${API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_SCREENING}/history${params}`
  );
}

/**
 * Get specific assessment result by ID
 */
export async function getAssessmentById(assessmentId: string) {
  return apiClient.get(
    `${API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_SCREENING}/results/${assessmentId}`
  );
}