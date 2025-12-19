"use client";

import DiagBasicForm from "@/features/alzheimer/components/DiagBasicForm";
import DiagBasicResult from "@/features/alzheimer/components/DiagBasicResult";
import {
  AlzheimerDiagnosisBasicInput,
  AlzheimerDiagnosisBasicOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";

export default function BasicDiagnosisPage() {
  const { result, loading, error, runTool } = useAlzheimerTool<
    AlzheimerDiagnosisBasicInput,
    AlzheimerDiagnosisBasicOutput
  >("diagnosisBasic");

  const handleSubmit = async (data: AlzheimerDiagnosisBasicInput) => {
    try {
      await runTool(data);
    } catch (err) {
      console.error("Error submitting basic diagnosis:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">
          Alzheimer Diagnosis with Basic Features
        </h1>
        <p className="text-gray-700 mb-6">
          Trained on ADNI data. Research use only.
        </p>
      </header>

      <DiagBasicForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <DiagBasicResult output={result ?? undefined} />

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}