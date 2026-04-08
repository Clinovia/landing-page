// app/protected/alzheimer/prognosis-2yr-extended/page.tsx
"use client";

import { useState } from "react";
import Prog2yrExtendedForm from "@/features/alzheimer/components/Prog2yrExtendedForm";
import Prog2yrExtendedResult from "@/features/alzheimer/components/Prog2yrExtendedResult";
import {
  AlzheimerPrognosis2yrExtendedInput,
  AlzheimerPrognosis2yrExtendedOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";
import { prognosis2YrExtended } from "@/lib/api/alzheimer";

export default function Prog2yrExtendedPage() {
  const [input, setInput] =
    useState<AlzheimerPrognosis2yrExtendedInput | null>(null);

  const { result, loading, error, runTool } =
    useAlzheimerTool<
      AlzheimerPrognosis2yrExtendedInput,
      AlzheimerPrognosis2yrExtendedOutput
    >(prognosis2YrExtended);

  const handleSubmit = async (
    data: AlzheimerPrognosis2yrExtendedInput
  ) => {
    setInput(data);
    await runTool(data);
  };

  const handleReset = () => {
    setInput(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">
        Alzheimer&apos;s 2-Year Prognosis (Extended)
      </h1>
      <p className="text-gray-700 mb-6">
        Machine learning model for predicting progression to Alzheimer&apos;s
        dementia within 2 years using extended biomarker features.
      </p>

      <Prog2yrExtendedForm onSubmit={handleSubmit} loading={loading} />

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
          <p className="text-gray-600 font-medium">
            Analyzing patient data with biomarkers...
          </p>
          <p className="text-gray-500 text-sm">
            Computing SHAP values and feature importance
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-900 mb-2">❌ Error</h3>
          <p className="text-red-800">{error}</p>
          <button
            onClick={handleReset}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {result && input && !loading && (
        <Prog2yrExtendedResult
          prognosis={result}
          onReset={handleReset}
        />
      )}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}
