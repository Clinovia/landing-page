// app/protected/cardiology/ascvd/page.tsx
"use client";

import { useState } from "react";
import ASCVDForm from "@/features/cardiology/components/ASCVDForm";
import ASCVDResult from "@/features/cardiology/components/ASCVDResult";
import { ASCVDInput, ASCVDOutput } from "@/features/cardiology/types";
import apiClient from "@/lib/apiClient";
import { supabase } from "@/lib/supabaseClient";

export default function ASCVDPage() {
  const [result, setResult] = useState<ASCVDOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ASCVDInput) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // DEBUG: Check what token we're getting
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('=== SUPABASE SESSION DEBUG ===');
      console.log('Session exists:', !!sessionData.session);
      console.log('User:', sessionData.session?.user?.email);
      console.log('Token exists:', !!sessionData.session?.access_token);
      
      if (sessionData.session?.access_token) {
        const token = sessionData.session.access_token;
        console.log('Token length:', token.length);
        console.log('Token (first 50 chars):', token.substring(0, 50));
        
        try {
          const parts = token.split('.');
          const header = JSON.parse(atob(parts[0]));
          console.log('Token header:', header);
          console.log('Token algorithm:', header.alg);
          console.log('Token kid:', header.kid);
        } catch (e) {
          console.error('Failed to decode token:', e);
        }
      } else {
        console.error('NO TOKEN FOUND! User may not be logged in.');
      }
      console.log('==============================');

      // Use apiClient which automatically gets Supabase token
      const response = await apiClient.post<ASCVDOutput>(
        "/api/v1/cardiology/ascvd",
        data
      );
      setResult(response.data); // ✅ Extract .data from Axios response
    } catch (err: any) {
      console.error('API Error:', err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
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