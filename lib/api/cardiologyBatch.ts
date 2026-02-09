import type { BatchJob } from "@/features/cardiology/batch/types";

export const uploadCardioBatch = async (file: File): Promise<BatchJob> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000).toString(),
        status: "processing",
        submittedAt: new Date().toISOString(),
        // optional completedAt, resultFileUrl
      });
    }, 1000);
  });
};

export const getCardioBatchStatus = async (): Promise<BatchJob[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          status: "completed",
          submittedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        },
      ]);
    }, 500);
  });
};
