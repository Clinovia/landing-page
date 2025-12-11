// app/protected/cardiology/bp-category/page.tsx
"use client";

import { useState } from "react";
import BPCategoryForm from "@/features/cardiology/components/BPCategoryForm";
import BPCategoryResult from "@/features/cardiology/components/BPCategoryResult";
import { BPCategoryInput, BPCategoryOutput } from "@/features/cardiology/types";
import apiClient from "@/lib/apiClient";
import { supabase } from "@/lib/supabaseClient";

export default function BPCategoryPage() {
  const [result, setResult] = useState<BPCategoryOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BPCategoryInput) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Optional: debug session (you can remove this in production)
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.access_token) {
        console.warn("No Supabase session found – user may not be authenticated.");
      }

      // Use the shared, authenticated API client
      const response = await apiClient.post<BPCategoryOutput>(
        "/api/v1/cardiology/bp-category",
        data
      );
      setResult(response.data); // ✅ Extract .data from Axios response
    } catch (err: any) {
      console.error("BP Category API Error:", err);
      // Handle Axios error structure
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