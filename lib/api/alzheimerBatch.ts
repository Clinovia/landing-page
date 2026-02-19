// lib/api/alzheimerBatch.ts
import { apiRequest, apiRequestWithFile } from "@/lib/apiClient";
import type { BatchJob } from "@/features/alzheimer/batch/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.clinovia.ai";

/* ------------------------------------------------------------------ */
/* Upload Alzheimer Batch                                              */
/* ------------------------------------------------------------------ */
export function uploadAdBatch(file: File): Promise<BatchJob> {
  return apiRequestWithFile<BatchJob>({
    path: `${BASE_URL}/api/v1/alzheimer/batch/upload`,
    fileField: "file",
    file,
  });
}

/* ------------------------------------------------------------------ */
/* Get Batch Status                                                    */
/* ------------------------------------------------------------------ */
export function getAlzheimerBatchStatus(): Promise<BatchJob[]> {
  return apiRequest<BatchJob[]>({
    path: `${BASE_URL}/api/v1/alzheimer/batch/status`,
    method: "GET",
  });
}
