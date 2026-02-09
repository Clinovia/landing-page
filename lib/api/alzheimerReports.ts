// frontend/lib/api/alzheimerReports.ts
import { AlzheimerReport } from "@/features/alzheimer/reports/types";

export const fetchAlzheimerReports = async (): Promise<AlzheimerReport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockReports: AlzheimerReport[] = [
        {
          id: "1",           // ✅ string instead of number
          patientId: "A123",
          testDate: "2026-02-02",
          riskScore: 78,
          diagnosis: "Mild",
        },
        {
          id: "2",           // ✅ string instead of number
          patientId: "A124",
          testDate: "2026-02-01",
          riskScore: 45,
          diagnosis: "Normal",
        },
      ];
      resolve(mockReports);
    }, 1000);
  });
};
