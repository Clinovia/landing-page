// app/protected/cardiology/cha2ds2vasc/page.tsx
"use client";

import CHA2DS2VAScForm from "@/features/cardiology/components/CHA2DS2VAScForm";
import CHA2DS2VAScResult from "@/features/cardiology/components/CHA2DS2VAScResult";
import { useCardiologyTool } from "@/features/cardiology/hooks/useCardiologyTool";
import { calculateCHA2DS2VASc } from "@/lib/api/cardiology";
import type {
  CHA2DS2VAScInput,
  CHA2DS2VAScOutput,
} from "@/features/cardiology/types";

export default function CHA2DS2VAScPage() {
  const {
    runTool,
    result,
    loading,
    error,
  } = useCardiologyTool<CHA2DS2VAScInput, CHA2DS2VAScOutput>(
    calculateCHA2DS2VASc
  );

  const handleSubmit = async (data: CHA2DS2VAScInput) => {
    await runTool(data);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">💓 CHA₂DS₂-VASc Score</h1>
        <p className="text-gray-700 mb-6">
          Assess stroke risk for atrial fibrillation using the CHA₂DS₂-VASc
          scoring system.
        </p>
      </header>

      <CHA2DS2VAScForm onSubmit={handleSubmit} loading={loading} />

      {loading && <p className="text-blue-600 mt-4">Calculating...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {result && <CHA2DS2VAScResult output={result} />}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </main>
  );
}
