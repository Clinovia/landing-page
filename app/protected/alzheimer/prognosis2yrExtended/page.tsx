"use client";

import { useState } from "react";
import Prog2yrExtendedForm from "@/features/alzheimer/components/Prog2yrExtendedForm";
import Prog2yrExtendedResult from "@/features/alzheimer/components/Prog2yrExtendedResult";
import {
  AlzheimerPrognosis2yrExtendedInput,
  AlzheimerPrognosis2yrExtendedOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";

export default function Prog2yrExtendedPage() {
  const [input, setInput] = useState<AlzheimerPrognosis2yrExtendedInput | null>(null);
  const { result, loading, error, runTool } = useAlzheimerTool<
    AlzheimerPrognosis2yrExtendedInput,
    AlzheimerPrognosis2yrExtendedOutput
  >("prognosis2yrExtended");

  const handleSubmit = async (data: AlzheimerPrognosis2yrExtendedInput) => {
    setInput(data);
    try {
      await runTool(data);
    } catch (err) {
      console.error("Error predicting 2-year progression (extended):", err);
    }
  };

  const handleReset = () => {
    setInput(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">
        Alzheimer's 2-Year Prognosis (Extended)
      </h1>
      <p className="text-gray-700 mb-6">
        Machine Learning model for predicting progression to Alzheimer's
        dementia within 2 years trained on ADNI data with extended features.
      </p>

      {/* Form: always visible */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <Prog2yrExtendedForm onSubmit={handleSubmit} loading={loading} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-gray-600 font-medium">
            Analyzing patient data with biomarkers...
          </p>
          <p className="text-gray-500 text-sm">
            Computing SHAP values and feature importance
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

      {/* Result: appended below form when ready */}
      {result && input && !loading && (
        <Prog2yrExtendedResult
          input={input}
          prognosis={result}
          onReset={handleReset}
        />
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          ℹ️ About This Tool
        </h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            This extended prognostic model incorporates advanced biomarker data
            including CSF markers (Aβ42, tau, p-tau), neuroimaging (hippocampal
            volume, FDG-PET, amyloid PET), alongside demographic and cognitive
            measures.
          </p>
          <p className="font-medium">
            <strong>Key Features:</strong>
          </p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>SHAP (SHapley Additive exPlanations) values for interpretable AI</li>
            <li>Confidence intervals for probability estimates</li>
            <li>Feature importance ranking</li>
            <li>Biomarker-enhanced predictions</li>
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}