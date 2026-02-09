// app/protected/cardiology/ecg-interpreter/page.tsx
"use client";

import { useState } from "react";
import ECGInterpreterForm from "@/features/cardiology/components/ECGInterpreterForm";
import ECGInterpreterResult from "@/features/cardiology/components/ECGInterpreterResult";
import { useCardiologyTool } from "@/features/cardiology/hooks/useCardiologyTool";
import { interpretECG } from "@/lib/api/cardiology";
import type {
  ECGInterpreterInput,
  ECGInterpreterOutput,
} from "@/features/cardiology/types";

export default function ECGInterpreterPage() {
  const [input, setInput] = useState<ECGInterpreterInput | null>(null);

  const {
    runTool,
    result,
    loading,
    error,
  } = useCardiologyTool<ECGInterpreterInput, ECGInterpreterOutput>(
    interpretECG
  );

  const handleSubmit = async (data: ECGInterpreterInput) => {
    setInput(data);
    await runTool(data);
  };

  const handleReset = () => {
    setInput(null);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">⚡ ECG Interpreter</h1>
        <p className="text-gray-700 mb-6">
          Analyze ECG parameters for AI-assisted rhythm and abnormality detection.
        </p>
      </header>

      <ECGInterpreterForm onSubmit={handleSubmit} loading={loading} />

      {loading && <p className="text-blue-600 mt-4">Analyzing ECG...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && input && (
        <ECGInterpreterResult
          input={input}
          interpretation={result}
          onReset={handleReset}
        />
      )}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </main>
  );
}
