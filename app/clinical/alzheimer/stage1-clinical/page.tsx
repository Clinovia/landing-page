"use client";
import { useEffect } from "react";
import { useStage1 } from "@/features/alzheimer/stage1/hooks/useStage1";
import { useStageResults } from "@/context/StageResultsContext";
import ClinicalScreeningForm from "@/features/alzheimer/stage1/components/ClinicalScreeningForm";
import { ClinicalScreeningResult } from "@/features/alzheimer/stage1/components/ClinicalScreeningResult";
import type { Stage1ClinicalScreeningInput } from "@/features/alzheimer/stage1/types";

export default function Stage1ClinicalScreeningPage() {
  const { data, loading, error, run, reset } = useStage1();
  const { setStage1 } = useStageResults();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleSubmit = async (values: Stage1ClinicalScreeningInput) => {
    const result = await run(values);
    if (result) setStage1(result);
  };

  const handleReset = () => reset();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-[#1B4D3E] mb-2">
          Stage 1 — Clinical Screening
        </h1>
        <p className="text-muted-foreground">
          Risk stratification using clinical and cognitive variables.
        </p>
      </header>

      <ClinicalScreeningForm onSubmit={handleSubmit} loading={loading} />

      {error && !loading && (
        <div className="p-4 rounded border border-red-200 bg-red-50">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={handleReset} className="mt-2 text-sm text-blue-600 underline">
            Try Again
          </button>
        </div>
      )}

      {data && !loading && <ClinicalScreeningResult result={data} />}

      <p className="text-sm text-muted-foreground">
        ⚠️ Research-use clinical decision support prototype. Not a medical device.
      </p>
    </div>
  );
}