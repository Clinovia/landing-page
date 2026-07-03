export interface MCIScreeningReport {
  id: string;
  patientId: string;
  testDate: string;
  riskScore: number;
  diagnosis: string;
}

export interface MCIScreeningReportsResponse {
  reports: MCIScreeningReport[];
}
