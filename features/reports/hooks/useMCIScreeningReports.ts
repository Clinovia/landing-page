"use client";

import { useState, useEffect } from "react";
import type { MCIScreeningReport } from "../types";

type MCIScreeningReportFilters = {
  patientId?: string;
};

export function useMCIScreeningReports() {
  const [reports, setReports] = useState<MCIScreeningReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MCIScreeningReportFilters>({});

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    // Mock data fetch (replace with real API later)
    const timeout = setTimeout(() => {
      if (cancelled) return;

      const mockReports: MCIScreeningReport[] = [
        {
          id: "1",
          patientId: "A123",
          testDate: "2026-02-02",
          riskScore: 78,
          diagnosis: "Mild",
        },
        {
          id: "2",
          patientId: "A124",
          testDate: "2026-02-01",
          riskScore: 45,
          diagnosis: "Normal",
        },
      ];

      setReports(mockReports);
      setLoading(false);
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [filters]);

  return {
    reports,
    loading,
    error,
    filters,
    setFilters,
  };
}
