"use client";

import React from "react";
import { BatchUploadForm, BatchProcessingStatus, useAlzheimerBatch } from "@/features/alzheimer/batch";

const AlzheimerBatchPage = () => {
  const { status, loading, error, uploadBatch, refreshStatus } = useAlzheimerBatch();

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Alzheimer Batch Processing</h1>

      <BatchUploadForm onUpload={uploadBatch} loading={loading} />

      {error && <p className="text-red-500">{error}</p>}

      <BatchProcessingStatus jobs={status} onRefresh={refreshStatus} />
    </section>
  );
};

export default AlzheimerBatchPage;
