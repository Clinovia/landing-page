"use client";

import { useState } from "react";
import type { BatchJob } from "../types";
import { uploadCardioBatch, getCardioBatchStatus } from "@/lib/api/cardiologyBatch";

export function useCardioBatch() {
  const [status, setStatus] = useState<BatchJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadBatch = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      await uploadCardioBatch(file);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = async () => {
    try {
      const jobs = await getCardioBatchStatus();
      setStatus(jobs);
    } catch (err: any) {
      setError(err.message || "Failed to fetch status");
    }
  };

  return { status, loading, error, uploadBatch, refreshStatus };
}
