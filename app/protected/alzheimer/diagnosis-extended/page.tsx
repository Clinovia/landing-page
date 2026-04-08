"use client";

import { useEffect } from "react";
import DiagExtendedForm from "@/features/alzheimer/components/DiagExtendedForm";
import DiagExtendedResult from "@/features/alzheimer/components/DiagExtendedResult";
import {
  AlzheimerDiagnosisExtendedInput,
  AlzheimerDiagnosisExtendedOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";
import { diagnosisExtended } from "@/lib/api/alzheimer";

export default function ExtendedDiagnosisPage() {
  const { result, loading, error, runTool, reset } =
    useAlzheimerTool<
      AlzheimerDiagnosisExtendedInput,
      AlzheimerDiagnosisExtendedOutput
    >(diagnosisExtended, {
      debug: true,
      timeoutMs: 10000,
    });

  useEffect(() => {
    reset(); // ✅ prevents cross-page state leakage
  }, [reset]);

  const handleSubmit = async (
    data: AlzheimerDiagnosisExtendedInput
  ) => {
    await runTool(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">
          Alzheimer Diagnosis with Extended Features
        </h1>
        <p className="text-gray-700 mb-6">
          Trained on ADNI data. Research use only.
        </p>
      </header>

      <DiagExtendedForm onSubmit={handleSubmit} loading={loading} />

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
        <DiagExtendedResult output={result} />
      )}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}