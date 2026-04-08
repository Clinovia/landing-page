// app/protected/alzheimer/prognosis-2yr-basic/page.tsx
"use client";

import { useState } from "react";
import Prog2yrBasicForm from "@/features/alzheimer/components/Prog2yrBasicForm";
import Prog2yrBasicResult from "@/features/alzheimer/components/Prog2yrBasicResult";
import {
  AlzheimerPrognosis2yrBasicInput,
  AlzheimerPrognosis2yrBasicOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";
import { prognosis2YrBasic } from "@/lib/api/alzheimer";

export default function Prog2yrBasicPage() {
  const [input, setInput] =
    useState<AlzheimerPrognosis2yrBasicInput | null>(null);

  const { result, loading, error, runTool } =
    useAlzheimerTool<
      AlzheimerPrognosis2yrBasicInput,
      AlzheimerPrognosis2yrBasicOutput
    >(prognosis2YrBasic);

  const handleSubmit = async (
    data: AlzheimerPrognosis2yrBasicInput
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
        Alzheimer&apos;s 2-Year Prognosis
      </h1>
      <p className="text-gray-700 mb-6">
        Basic model for predicting progression to Alzheimer&apos;s dementia
        within 2 years trained on ADNI data.
      </p>

      <Prog2yrBasicForm onSubmit={handleSubmit} loading={loading} />

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
          <p className="text-gray-600">
            Analyzing patient data and computing prognosis...
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
        <Prog2yrBasicResult
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
