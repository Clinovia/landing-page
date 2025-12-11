"use client";

import { useState } from "react";
import EFForm from "@/features/cardiology/components/EFForm";
import EFResult from "@/features/cardiology/components/EFResult";
import {
  EchonetEFInput,
  EchonetEFOutput,
} from "@/features/cardiology/types";
import apiClient from "@/lib/apiClient";
import { supabase } from "@/lib/supabaseClient";

export default function EjectionFractionPage() {
  const [input, setInput] = useState<EchonetEFInput | null>(null);
  const [result, setResult] = useState<EchonetEFOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submit handler
   */
  const handleSubmit = async (inputData: EchonetEFInput) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setInput(inputData);

    try {
      // Get Supabase session (optional)
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.warn("Supabase session error:", sessionError.message);
      }

      if (!sessionData.session?.access_token) {
        console.warn("No Supabase session found. User may be logged out.");
      }

      // Call backend
      const response = await apiClient.post<EchonetEFOutput>(
        "/api/v1/cardiology/ejection-fraction",
        inputData
      );

      setResult(response.data);
    } catch (err: any) {
      console.error("Ejection Fraction API Error:", err);

      const message =
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Unknown error occurred";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset form + result
   */
  const handleReset = () => {
    setInput(null);
    setResult(null);
    setError(null);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">⚡ Ejection Fraction Predictor</h1>
        <p className="text-gray-700 mb-6">
          Predict the Echonet Ejection Fraction percentage using our ML model.
        </p>
      </header>

      <section>
        <EFForm onSubmit={handleSubmit} loading={loading} />
      </section>

      {loading && (
        <p className="text-blue-600 mt-4">Analyzing Ejection Fraction...</p>
      )}

      {error && (
        <p className="text-red-600 mt-4">
          {error}
        </p>
      )}

      {result && input && (
        <section>
          <EFResult
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
