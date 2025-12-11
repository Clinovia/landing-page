"use client";

import { useState } from "react";
import ECGInterpreterForm from "@/features/cardiology/components/ECGInterpreterForm";
import ECGInterpreterResult from "@/features/cardiology/components/ECGInterpreterResult";
import {
  ECGInterpreterInput,
  ECGInterpreterOutput,
} from "@/features/cardiology/types";
import apiClient from "@/lib/apiClient";
import { supabase } from "@/lib/supabaseClient";

export default function ECGInterpreterPage() {
  const [input, setInput] = useState<ECGInterpreterInput | null>(null);
  const [result, setResult] = useState<ECGInterpreterOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (inputData: ECGInterpreterInput) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setInput(inputData);

    try {
      // Get Supabase session correctly
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.warn("Supabase session error:", sessionError.message);
      }

      if (!sessionData.session?.access_token) {
        console.warn("No Supabase session found – user may not be authenticated.");
      }

      // Post ECG input to backend
      const response = await apiClient.post<ECGInterpreterOutput>(
        "/api/v1/cardiology/ecg-interpreter",
        inputData
      );

      setResult(response.data);
    } catch (err: any) {
      console.error("ECG Interpreter API Error:", err);
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput(null);
    setResult(null);
    setError(null);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">⚡ ECG Interpreter</h1>
        <p className="text-gray-700 mb-6">
          Analyze ECG parameters for AI-assisted rhythm and abnormality detection.
        </p>
      </header>

      <section>
        <ECGInterpreterForm onSubmit={handleSubmit} loading={loading} />
      </section>

      {loading && (
        <p className="text-blue-600 mt-4" data-testid="loading-message">
          Analyzing ECG...
        </p>
      )}

      {error && (
        <p className="text-red-600 mt-4" data-testid="error-message">
          {error}
        </p>
      )}

      {result && input && (
        <section>
          <ECGInterpreterResult
            input={input}
            interpretation={result}
            onReset={handleReset}
          />
        </section>
      )}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </main>
  );
}
