// app/protected/cardiology/ascvd/page.tsx
"use client";

import ASCVDForm from "@/features/cardiology/components/ASCVDForm";
import ASCVDResult from "@/features/cardiology/components/ASCVDResult";
import { useCardiologyTool } from "@/features/cardiology/hooks/useCardiologyTool";
import { calculateASCVD } from "@/lib/api/cardiology";
import type { ASCVDInput, ASCVDOutput } from "@/features/cardiology/types";

export default function ASCVDPage() {
  const {
    runTool,
    result,
    loading,
    error,
  } = useCardiologyTool<ASCVDInput, ASCVDOutput>(calculateASCVD);

  const handleSubmit = async (data: ASCVDInput) => {
    await runTool(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">🫀 ASCVD Risk Calculator</h1>
      <p className="text-gray-700 mb-6">
        Enter patient data below to calculate the 10-year ASCVD risk percentage and category.
      </p>

      <ASCVDForm onSubmit={handleSubmit} loading={loading} />

      {loading && <p className="text-blue-600 mt-4">Calculating risk...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {result && <ASCVDResult output={result} />}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}
