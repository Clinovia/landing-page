// frontend/lib/api/mci-screeningReports.ts
import { MCIScreeningReport } from "@/features/reports/types";

export const fetchMCIScreeningReports = async (): Promise<MCIScreeningReport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockReports: MCIScreeningReport[] = [
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
