"use client";

import { useState } from "react";
import CHA2DS2VAScForm from "@/features/cardiology/components/CHA2DS2VAScForm";
import CHA2DS2VAScResult from "@/features/cardiology/components/CHA2DS2VAScResult";
import {
  CHA2DS2VAScInput,
  CHA2DS2VAScOutput,
} from "@/features/cardiology/types";
import apiClient from "@/lib/apiClient";
import { supabase } from "@/lib/supabaseClient";

export default function CHA2DS2VAScPage() {
  const [result, setResult] = useState<CHA2DS2VAScOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (inputData: CHA2DS2VAScInput) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Get Supabase auth session
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.warn("Supabase session error:", sessionError.message);
      }

      if (!sessionData.session?.access_token) {
        console.warn(
          "No Supabase session found – user may not be authenticated."
        );
      }

      // Authenticated API call
      const response = await apiClient.post<CHA2DS2VAScOutput>(
        "/api/v1/cardiology/cha2ds2vasc",
        inputData
      );

      setResult(response.data);
    } catch (err: any) {
      console.error("CHA₂DS₂-VASc API Error:", err);

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

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">💓 CHA₂DS₂-VASc Score</h1>
        <p className="text-gray-700 mb-6">
          Assess stroke risk for atrial fibrillation using the
          CHA₂DS₂-VASc scoring system.
        </p>
      </header>

      <section>
        <CHA2DS2VAScForm onSubmit={handleSubmit} loading={loading} />
      </section>

      {loading && (
        <p className="text-blue-600 mt-4" data-testid="loading-message">
          Calculating...
        </p>
      )}

      {error && (
        <p className="text-red-600 mt-4" data-testid="error-message">
          {error}
        </p>
      )}

      {result && (
        <section>
          <CHA2DS2VAScResult output={result} />
        </section>
      )}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </main>
  );
}
