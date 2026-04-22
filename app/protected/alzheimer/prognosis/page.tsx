"use client";
import { useEffect } from "react";
import PrognosisForm from "@/features/alzheimer/components/PrognosisForm";
import PrognosisResult from "@/features/alzheimer/components/PrognosisResult";
import {
  AlzheimerUnifiedPrognosisInput,
  AlzheimerUnifiedPrognosisOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";
import { prognosisUnified } from "@/lib/api/alzheimer";

export default function AlzheimerPrognosisPage() {
  const { result, loading, error, runTool, reset } =
    useAlzheimerTool<
      AlzheimerUnifiedPrognosisInput,
      AlzheimerUnifiedPrognosisOutput
    >(prognosisUnified, {
      debug: true,
      timeoutMs: 10000,
    });

  useEffect(() => {
    reset(); // ✅ prevents stale state when navigating
  }, [reset]);

  const handleSubmit = async (data: AlzheimerUnifiedPrognosisInput) => {
    await runTool(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">
          🧠 Alzheimer's Prognosis Tool
        </h1>
        <p className="text-gray-700 mb-6">
          Unified 1-year, 3-year, and 5-year progression prediction. Trained on
          ADNI data. Research use only.
        </p>
      </header>

      <PrognosisForm onSubmit={handleSubmit} loading={loading} />

      {error && !loading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error}</p>
          <button
            onClick={handleReset}
            className="mt-2 text-sm text-blue-600 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {result && !loading && (
        <PrognosisResult output={result} onReset={handleReset} />
      )}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}