"use client";

import { useState } from "react";
import Prog2yrBasicForm from "@/features/alzheimer/components/Prog2yrBasicForm";
import Prog2yrBasicResult from "@/features/alzheimer/components/Prog2yrBasicResult";
import {
  AlzheimerPrognosis2yrBasicInput,
  AlzheimerPrognosis2yrBasicOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";

export default function Prog2yrBasicPage() {
  const [input, setInput] = useState<AlzheimerPrognosis2yrBasicInput | null>(null);
  const { result, loading, error, runTool } = useAlzheimerTool<
    AlzheimerPrognosis2yrBasicInput,
    AlzheimerPrognosis2yrBasicOutput
  >("prognosis2yrBasic");

  const handleSubmit = async (data: AlzheimerPrognosis2yrBasicInput) => {
    setInput(data);
    try {
      await runTool(data);
    } catch (err) {
      console.error("Error predicting 2-year progression:", err);
    }
  };

  const handleReset = () => {
    setInput(null);
    // Optionally, you can clear the result by adding a reset in your hook
    // or force reload of the page
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Alzheimer's 2-Year Prognosis</h1>
      <p className="text-gray-700 mb-6">
        Basic model for predicting progression to Alzheimer's dementia within 2
        years trained on ADNI data.
      </p>

      {/* Form always visible */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <Prog2yrBasicForm onSubmit={handleSubmit} loading={loading} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-gray-600">
            Analyzing patient data and computing prognosis...
          </p>
        </div>
      )}

      {/* Error Message */}
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

      {/* Result */}
      {result && input && !loading && (
        <div className="mt-6">
          <Prog2yrBasicResult input={input} prognosis={result} onReset={handleReset} />
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          ℹ️ About This Tool
        </h3>
        <p className="text-sm text-blue-800">
          This basic prognostic model uses demographic data, cognitive scores,
          and genetic markers to estimate the probability of progression to
          Alzheimer's dementia within 2 years. For enhanced predictions with
          biomarker analysis and SHAP explanations, use the Extended model.
        </p>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}
