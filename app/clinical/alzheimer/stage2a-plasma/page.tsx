"use client";

import { useEffect } from "react";

import { useStage2a } from "@/features/alzheimer/stage2a/hooks/useStage2a";

import PlasmaForm from "@/features/alzheimer/stage2a/components/PlasmaForm";
import PlasmaResult from "@/features/alzheimer/stage2a/components/PlasmaResult";

import type { Stage2aPlasmaModelInput } from "@/features/alzheimer/stage2a/types";

export default function Stage2aPlasmaPage() {
  const {
    data,
    loading,
    error,
    run,
    reset,
  } = useStage2a();

  /**
   * Prevent stale results when navigating
   * between routes/pages.
   */
  useEffect(() => {
    reset();
  }, [reset]);

  const handleSubmit = async (
    values: Stage2aPlasmaModelInput
  ) => {
    await run(values);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-[#1B4D3E] mb-2">
          Stage 2A — Plasma Biomarker Screening
        </h1>

        <p className="text-muted-foreground">
          Blood-based amyloid risk estimation using plasma biomarkers
          and clinical covariates.
        </p>
      </header>

      {/* Form stays visible */}
      <PlasmaForm
        onSubmit={handleSubmit}
        loading={loading}
      />

      {/* Error */}
      {error && !loading && (
        <div className="p-4 rounded border border-red-200 bg-red-50">
          <p className="text-red-600 text-sm">
            {error}
          </p>

          <button
            onClick={handleReset}
            className="mt-2 text-sm text-blue-600 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Result */}
      {data && !loading && (
        <PlasmaResult
          result={data}
        />
      )}

      {/* Footer */}
      <p className="text-sm text-muted-foreground">
        ⚠️ Research-use clinical decision support prototype.
        Not a medical device.
      </p>
    </div>
  );
}