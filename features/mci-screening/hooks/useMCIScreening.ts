"use client";
import { useState, useCallback } from "react";
import { apiRequest } from "@/lib/apiClient";
import {
  MCIScreeningInput,
  MCIScreeningOutput,
} from "../types";

export function useMCIScreening() {
  const [data, setData] = useState<MCIScreeningOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (input: MCIScreeningInput) => {
    try {
      setLoading(true);
      setError(null);

      const json = await apiRequest<MCIScreeningOutput>({
        path: "/api/v1/mci-screening",
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