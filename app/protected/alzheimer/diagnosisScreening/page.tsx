// app/protected/alzheimer/diagnosisScreening/page.tsx
"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import DiagScreeningForm from "@/features/alzheimer/components/DiagScreeningForm";
import DiagScreeningResult from "@/features/alzheimer/components/DiagScreeningResult";

import {
  AlzheimerDiagnosisScreeningInput,
  AlzheimerDiagnosisScreeningOutput,
} from "@/features/alzheimer/types";

export default function DiagnosisScreeningPage() {
  const supabase = createClientComponentClient();
  const [output, setOutput] = useState<AlzheimerDiagnosisScreeningOutput | null>(null); // 👈 changed to `null`
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: AlzheimerDiagnosisScreeningInput) => {
    setLoading(true);
    setOutput(null); // 👈 reset to null
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch("/api/v1/alzheimer/diagnosisScreening", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `API Error: ${response.statusText}`);
      }

      const result: AlzheimerDiagnosisScreeningOutput = await response.json();
      setOutput(result);
    } catch (err: any) {
      console.error("Error submitting diagnosis screening:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-4">Alzheimer Diagnosis for Screening</h1>
        <p className="text-gray-700 mb-6">Trained on ADNI data. Research use only.</p>
      </header>

      <DiagScreeningForm onSubmit={handleSubmit} loading={loading} />

      {error && <p className="text-red-600">{error}</p>}

      {/* ✅ Only render when output exists, and pass as `result` */}
      {output && <DiagScreeningResult result={output} />}

      <p className="text-sm text-gray-500 mt-6">
        ⚠️ For research and planning use only. Not a medical device.
      </p>
    </div>
  );
}