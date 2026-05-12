"use client";
import { useState, useCallback } from "react";
import { apiRequest } from "@/lib/apiClient";
import {
  Stage2aPlasmaModelInput,
  Stage2aPlasmaModelOutput,
} from "../types";

export function useStage2a() {
  const [data, setData] = useState<Stage2aPlasmaModelOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (input: Stage2aPlasmaModelInput) => {
    try {
      setLoading(true);
      setError(null);

      const json = await apiRequest<Stage2aPlasmaModelOutput>({
        path: "/api/v1/assessments/stage2a-plasma",
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