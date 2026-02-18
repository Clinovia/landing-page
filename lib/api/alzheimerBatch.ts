// lib/api/alzheimerBatch.ts
import { apiRequest, apiRequestWithFile } from "../apiClient";
import type { BatchJob } from "@/features/alzheimer/batch/types";

export function uploadAdBatch(file: File): Promise<BatchJob> {
  return apiRequestWithFile<BatchJob>({
    path: "/api/v1/alzheimer/batch/upload",
    fileField: "file",
    file,
  });
}

export function getAlzheimerBatchStatus(): Promise<BatchJob[]> {
  return apiRequest<BatchJob[]>({
    path: "/api/v1/alzheimer/batch/status",
    method: "GET",
  });
}