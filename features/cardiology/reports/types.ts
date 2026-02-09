export interface CardioReport {
  id: string;
  patientId: string;
  testDate: string;
  ascvdRisk?: number;
  bpCategory?: string;
  ef?: number;
}

export interface CardioReportsResponse {
  reports: CardioReport[];
}
