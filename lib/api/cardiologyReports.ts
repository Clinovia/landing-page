import { CardioReport } from "@/features/cardiology/reports/types";

export const fetchCardioReports = async (filters?: Record<string, any>): Promise<CardioReport[]> => {
  // Simulate backend API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          patientId: "C123",
          testDate: "2026-02-02",
          ascvdRisk: 12,
          bpCategory: "Stage 1",
        },
        {
          id: "2",
          patientId: "C124",
          testDate: "2026-02-01",
          ascvdRisk: 8,
          bpCategory: "Elevated",
        },
      ]);
    }, 500);
  });
};
