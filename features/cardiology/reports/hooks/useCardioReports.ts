"use client";

import { useState, useEffect } from "react";
import type { CardioReport } from "../types";

type CardioReportFilters = {
  patientId?: string;
};

export function useCardioReports() {
  const [reports, setReports] = useState<CardioReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CardioReportFilters>({});

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    // Mock data fetch (replace with real API later)
    const timeout = setTimeout(() => {
      if (cancelled) return;

      const mockReports: CardioReport[] = [
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
