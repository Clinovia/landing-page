import { apiClient } from "../apiClient";
import type { BatchJob } from "@/features/alzheimer/batch/types";

/* ------------------------------------------------------------------ */
/* Upload Batch File                                                   */
/* ------------------------------------------------------------------ */

export async function uploadAdBatch(
  file: File
): Promise<BatchJob> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<BatchJob>(
    "/api/v1/alzheimer/batch/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

/* ------------------------------------------------------------------ */
/* Fetch Batch Status                                                  */
/* ------------------------------------------------------------------ */

export async function getAlzheimerBatchStatus(): Promise<BatchJob[]> {
  const { data } = await apiClient.get<BatchJob[]>(
    "/api/v1/alzheimer/batch/status"
  );

  return data;
}
