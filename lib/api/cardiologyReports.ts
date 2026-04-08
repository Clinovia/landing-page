import { apiRequest } from "@/lib/apiClient";
import { CardioReport } from "@/features/cardiology/reports/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.clinovia.ai";

export const fetchCardioReports = async (
  filters?: Record<string, any>
): Promise<CardioReport[]> => {
  const query = filters
    ? `?${new URLSearchParams(filters as Record<string, string>).toString()}`
    : "";
  return apiRequest<CardioReport[]>({
    path: `${BASE_URL}/api/v1/reports${query}`,
    method: "GET",
  });
};
