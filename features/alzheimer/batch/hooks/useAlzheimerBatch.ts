"use client";

import { useState } from "react";
import type { BatchJob } from "../types";
import { uploadAdBatch, getAlzheimerBatchStatus } from "@/lib/api/alzheimerBatch";

export function useAlzheimerBatch() {
  const [status, setStatus] = useState<BatchJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadBatch = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      await uploadAdBatch(file);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = async () => {
    try {
      const jobs = await getAlzheimerBatchStatus();
      setStatus(jobs);
    } catch (err: any) {
      setError(err.message || "Failed to fetch status");
    }
  };

  return { status, loading, error, uploadBatch, refreshStatus };
}
