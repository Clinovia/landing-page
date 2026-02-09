"use client";

import React from "react";
import {
  BatchUploadForm,
  BatchProcessingStatus,
  useCardioBatch,
} from "@/features/cardiology/batch";

const CardioBatchPage = () => {
  const { status, loading, error, uploadBatch, refreshStatus } =
    useCardioBatch();

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Cardiology Batch Processing</h1>

      <BatchUploadForm onUpload={uploadBatch} loading={loading} />

      {error && <p className="text-red-500">{error}</p>}

      <BatchProcessingStatus jobs={status} onRefresh={refreshStatus} />
    </section>
  );
};

export default CardioBatchPage;
