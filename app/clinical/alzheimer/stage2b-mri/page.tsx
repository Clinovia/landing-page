"use client";
import { useEffect } from "react";
import { useStage2b } from "@/features/alzheimer/stage2b/hooks/useStage2b";
import { useStageResults } from "@/context/StageResultsContext";
import MriForm from "@/features/alzheimer/stage2b/components/MriForm";
import MriResult from "@/features/alzheimer/stage2b/components/MriResult";
import type { Stage2bMRIGateInput } from "@/features/alzheimer/stage2b/types";

export default function Stage2bMRIPage() {
  const { data, loading, error, run, reset } = useStage2b();
  const { setStage2b } = useStageResults();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleSubmit = async (values: Stage2bMRIGateInput) => {
    const result = await run(values);
    if (result) setStage2b(result);
  };

  const handleReset = () => reset();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-[#1B4D3E] mb-2">
          Stage 2B — MRI Neurodegeneration Gate
        </h1>
        <p className="text-muted-foreground">
          MRI-based neurodegeneration confirmation using volumetric biomarkers.
        </p>
      </header>

      <MriForm onSubmit={handleSubmit} loading={loading} />

      {error && !loading && (
        <div className="p-4 rounded border border-red-200 bg-red-50">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={handleReset} className="mt-2 text-sm text-blue-600 underline">
            Try Again
          </button>
        </div>
      )}

      {data && !loading && <MriResult result={data} />}

      <p className="text-sm text-muted-foreground">
        ⚠️ Research-use clinical decision support prototype. Not a medical device.
      </p>
    </div>
  );
}