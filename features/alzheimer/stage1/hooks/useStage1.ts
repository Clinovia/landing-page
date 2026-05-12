"use client";
import { useState, useCallback } from "react";
import { apiRequest } from "@/lib/apiClient";
import {
  Stage1ClinicalScreeningInput,
  Stage1ClinicalScreeningOutput,
} from "../types";

export function useStage1() {
  const [data, setData] = useState<Stage1ClinicalScreeningOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (input: Stage1ClinicalScreeningInput) => {
    try {
      setLoading(true);
      setError(null);

      const json = await apiRequest<Stage1ClinicalScreeningOutput>({
        path: "/api/v1/assessments/stage1-clinical",
        method: "POST",
        body: input,
      });

      setData(json);
      return json;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { run, data, loading, error, reset };
}