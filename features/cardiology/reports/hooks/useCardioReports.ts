"use client";

import { useState, useEffect } from "react";
import { fetchCardioReports } from "@/lib/api/cardiologyReports";
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

    async function loadReports() {
      try {

        setLoading(true);
        setError(null);

        const data = await fetchCardioReports(filters);
        setReports(data);

      } catch (err: any) {

        console.error(err);
        setError("Failed to load reports");

      } finally {

        setLoading(false);

      }
    }

    loadReports();

  }, [filters]);

  return {
    reports,
    loading,
    error,
    filters,
    setFilters,
  };
}