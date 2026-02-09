export interface BatchJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  submittedAt: string;
  completedAt?: string;
  resultFileUrl?: string;
}

export interface BatchUploadResponse {
  success: boolean;
  job: BatchJob;
}
