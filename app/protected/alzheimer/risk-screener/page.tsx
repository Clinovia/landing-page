// app/protected/alzheimer/risk-screener/page.tsx
"use client";

import AlzheimerRiskForm from "@/features/alzheimer/components/RiskScreenerForm";
import AlzheimerRiskResult from "@/features/alzheimer/components/RiskScreenerResult";
import {
  AlzheimerRiskScreenerInput,
  AlzheimerRiskScreenerOutput,
} from "@/features/alzheimer/types";
import { useAlzheimerTool } from "@/features/alzheimer/hooks/useAlzheimerTool";
import { riskScreener } from "@/lib/api/alzheimer";

export default function RiskScreenerPage() {
  const { result, loading, error, runTool } =
    useAlzheimerTool<
      AlzheimerRiskScreenerInput,
      AlzheimerRiskScreenerOutput
    >(riskScreener);

  const handleSubmit = async (
    data: AlzheimerRiskScreenerInput
  ) => {
    await runTool(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">
        Alzheimer Risk Screener
      </h1>

      <p className="text-gray-700 mb-6">
        Assess the risk of Alzheimer&apos;s disease based on clinical,
        cognitive, and genetic factors.
      </p>

      <AlzheimerRiskForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && <AlzheimerRiskResult output={result} />}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}
