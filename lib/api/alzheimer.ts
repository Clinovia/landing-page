/**
 * Alzheimer's Module API Client
 * Handles all API calls for Alzheimer's diagnosis and prognosis tools
 */

import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/config";

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

// ==================== API Functions ====================

export async function diagnosisScreening(
  data: AlzheimerDiagnosisScreeningInput
): Promise<AlzheimerDiagnosisScreeningOutput> {
  const response = await apiClient.post<AlzheimerDiagnosisScreeningOutput>(
    API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_SCREENING,
    data
  );
  return response.data;
}

export async function riskScreener(
  data: AlzheimerRiskScreenerInput
): Promise<AlzheimerRiskScreenerOutput> {
  const response = await apiClient.post<AlzheimerRiskScreenerOutput>(
    API_ENDPOINTS.ALZHEIMER.RISK_SCREENER,
    data
  );
  return response.data;
}

export async function diagnosisBasic(
  data: AlzheimerDiagnosisBasicInput
): Promise<AlzheimerDiagnosisBasicOutput> {
  const response = await apiClient.post<AlzheimerDiagnosisBasicOutput>(
    API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_BASIC,
    data
  );
  return response.data;
}

export async function diagnosisExtended(
  data: AlzheimerDiagnosisExtendedInput
): Promise<AlzheimerDiagnosisExtendedOutput> {
  const response = await apiClient.post<AlzheimerDiagnosisExtendedOutput>(
    API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_EXTENDED,
    data
  );
  return response.data;
}

export async function prognosis2YrBasic(
  data: AlzheimerPrognosis2yrBasicInput
): Promise<AlzheimerPrognosis2yrBasicOutput> {
  const response = await apiClient.post<AlzheimerPrognosis2yrBasicOutput>(
    API_ENDPOINTS.ALZHEIMER.PROGNOSIS_2YR_BASIC,
    data
  );
  return response.data;
}

export async function prognosis2YrExtended(
  data: AlzheimerPrognosis2yrExtendedInput
): Promise<AlzheimerPrognosis2yrExtendedOutput> {
  const response = await apiClient.post<AlzheimerPrognosis2yrExtendedOutput>(
    API_ENDPOINTS.ALZHEIMER.PROGNOSIS_2YR_EXTENDED,
    data
  );
  return response.data;
}

export async function getAssessmentHistory(userId?: string) {
  const params = userId ? `?userId=${userId}` : "";
  const response = await apiClient.get(
    `${API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_SCREENING}/history${params}`
  );
  return response.data;
}

export async function getAssessmentById(assessmentId: string) {
  const response = await apiClient.get(
    `${API_ENDPOINTS.ALZHEIMER.DIAGNOSIS_SCREENING}/results/${assessmentId}`
  );
  return response.data;
}
