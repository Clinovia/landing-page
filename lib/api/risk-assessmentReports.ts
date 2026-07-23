// frontend/lib/api/risk-assessmentReports.ts

import { apiRequest } from "@/lib/apiClient";

export interface RiskAssessmentReport {
  assessment_id: string;
  patient_id?: string;

  created_at: string;

  model_type:
    | "clinical_cognitive"
    | "clinical_cognitive_mri";

  progression_probability: number;
  risk_category: string;

  confidence?: number;

  pdf_url?: string;
}

export interface RiskAssessmentReportList {
  items: RiskAssessmentReport[];
  total: number;
}

export async function getRiskAssessmentReports() {
  return apiRequest<RiskAssessmentReportList>({
    path: "/api/v1/risk-assessment/reports",
    method: "GET",
  });
}

export async function getRiskAssessmentReport(
  assessmentId: string
) {
  return apiRequest<RiskAssessmentReport>({
    path: `/api/v1/risk-assessment/reports/${assessmentId}`,
    method: "GET",
  });
}

export async function deleteRiskAssessmentReport(
  assessmentId: string
) {
  return apiRequest<void>({
    path: `/api/v1/risk-assessment/reports/${assessmentId}`,
    method: "DELETE",
  });
}