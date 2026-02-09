export interface AlzheimerReport {
  id: string;
  patientId: string;
  testDate: string;
  riskScore: number;
  diagnosis: string;
}

export interface AlzheimerReportsResponse {
  reports: AlzheimerReport[];
}
