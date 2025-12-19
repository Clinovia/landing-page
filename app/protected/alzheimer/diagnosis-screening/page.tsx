"use client";

import DiagScreeningForm from "@/features/alzheimer/components/DiagScreeningForm";
import DiagScreeningResult from "@/features/alzheimer/components/DiagScreeningResult";
import {
  AlzheimerDiagnosisScreeningInput,
  AlzheimerDiagnosisScreeningOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";

export default function DiagnosisScreeningPage() {
  const { result, loading, error, runTool } = useAlzheimerTool<
    AlzheimerDiagnosisScreeningInput,
    AlzheimerDiagnosisScreeningOutput
  >("diagnosisScreening");

  const handleSubmit = async (data: AlzheimerDiagnosisScreeningInput) => {
    try {
      await runTool(data);
    } catch (err) {
      console.error("Error submitting diagnosis screening:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">
          Alzheimer Diagnosis for Screening
        </h1>
        <p className="text-gray-700 mb-6">
          Trained on ADNI data. Research use only.
        </p>
      </header>

      <DiagScreeningForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && <DiagScreeningResult result={result} />}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}