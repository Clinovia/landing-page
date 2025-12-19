"use client";

import DiagExtendedForm from "@/features/alzheimer/components/DiagExtendedForm";
import DiagExtendedResult from "@/features/alzheimer/components/DiagExtendedResult";
import {
  AlzheimerDiagnosisExtendedInput,
  AlzheimerDiagnosisExtendedOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";

export default function ExtendedDiagnosisPage() {
  const { result, loading, error, runTool } = useAlzheimerTool<
    AlzheimerDiagnosisExtendedInput,
    AlzheimerDiagnosisExtendedOutput
  >("diagnosisExtended");

  const handleSubmit = async (data: AlzheimerDiagnosisExtendedInput) => {
    try {
      await runTool(data);
    } catch (err) {
      console.error("Error submitting extended diagnosis:", err);
    }
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

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <DiagExtendedResult output={result ?? undefined} />

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}