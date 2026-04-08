export interface CardioReport {
  id: string;
  assessment_type: string;
  patient_id: string;
  specialty: string;
  model_version: string;
  created_at: string;
  pdf_url: string | null;
  summary: Record<string, any>;
}

export interface CardioReportsResponse {
  reports: CardioReport[];
}