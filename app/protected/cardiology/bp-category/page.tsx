// app/protected/cardiology/bp-category/page.tsx
"use client";

import BPCategoryForm from "@/features/cardiology/components/BPCategoryForm";
import BPCategoryResult from "@/features/cardiology/components/BPCategoryResult";
import { useCardiologyTool } from "@/features/cardiology/hooks/useCardiologyTool";
import { categorizeBP } from "@/lib/api/cardiology";
import type {
  BPCategoryInput,
  BPCategoryOutput,
} from "@/features/cardiology/types";

export default function BPCategoryPage() {
  const {
    runTool,
    result,
    loading,
    error,
  } = useCardiologyTool<BPCategoryInput, BPCategoryOutput>(categorizeBP);

  const handleSubmit = async (data: BPCategoryInput) => {
    await runTool(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">🩺 Blood Pressure Category</h1>
      <p className="text-gray-700 mb-6">
        Enter blood pressure readings to classify the patient’s BP category.
      </p>

      <BPCategoryForm onSubmit={handleSubmit} loading={loading} />

      {loading && <p className="text-blue-600 mt-4">Classifying...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {result && <BPCategoryResult output={result} />}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}
