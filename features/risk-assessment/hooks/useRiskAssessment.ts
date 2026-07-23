"use client";

import { useCallback, useState } from "react";

import { apiRequest } from "@/lib/apiClient";

import type {
  RiskAssessmentInput,
  RiskAssessmentOutput,
} from "../types";

/**
 * Risk Assessment Hook
 *
 * Handles submission of a single unified assessment form.
 *
 * The backend automatically selects the most appropriate model
 * based on the available inputs:
 *
 * - MMSE
 * - RAVLT
 * - LIMM
 * - MRI features (optional)
 *
 * No model selection is required on the frontend.
 */
export function useRiskAssessment() {
  const [data, setData] =
    useState<RiskAssessmentOutput | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const run = useCallback(
    async (
      input: RiskAssessmentInput
    ): Promise<RiskAssessmentOutput> => {
      try {
        setLoading(true);
        setError(null);

        const result =
          await apiRequest<RiskAssessmentOutput>({
            path: "/api/v1/risk-assessment",
            method: "POST",
            body: input,
          });

        setData(result);

        return result;
      } catch (err: any) {
        const message =
          err?.message ??
          "Unable to complete risk assessment.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    run,
    data,
    loading,
    error,
    reset,
  };
}