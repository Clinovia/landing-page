// features/cardiology/hooks/useCardiologyTool.ts
import { useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/supabase-js";

// Use environment variable for backend base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

/**
 * Hook to interact with Cardiology assessment endpoints.
 *
 * @param endpoint - The specific cardiology tool endpoint (e.g., "ascvd", "bp-category")
 * @returns Object containing result, loading state, error, and runTool function
 */
export function useCardiologyTool(endpoint: string) {
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClientComponentClient();

  const runTool = useCallback(
    async (payload: Record<string, unknown>) => {
      console.log("❤️ [CardiologyTool] Starting runTool with endpoint:", endpoint);
      console.log("❤️ [CardiologyTool] Payload:", payload);

      setLoading(true);
      setError(null);
      setResult(null);

      try {
        console.log("❤️ [CardiologyTool] Fetching Supabase session...");
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        console.log("❤️ [CardiologyTool] Session ", session);
        console.log("❤️ [CardiologyTool] Session error:", sessionError);

        if (sessionError || !session?.access_token) {
          console.error("🔴 [CardiologyTool] Authentication failed: no valid session");
          throw new Error("Not authenticated");
        }

        console.log("✅ [CardiologyTool] Token obtained. Sending request to:", `${API_BASE_URL}/api/v1/cardiology/${endpoint}`);

        const response = await fetch(`${API_BASE_URL}/api/v1/cardiology/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(payload),
        });

        console.log("❤️ [CardiologyTool] Response status:", response.status);
        console.log("❤️ [CardiologyTool] Response headers:", Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorMessage = await response.text().catch(() => "API request failed");
          console.error("🔴 [CardiologyTool] API error response body:", errorMessage);
          throw new Error(errorMessage || "API request failed");
        }

        const data = await response.json();
        console.log("✅ [CardiologyTool] Success! Result:", data);
        setResult(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An unknown error occurred";
        console.error("💥 [CardiologyTool] Caught error:", message);
        setError(message);
      } finally {
        setLoading(false);
        console.log("❤️ [CardiologyTool] RunTool finished.");
      }
    },
    [endpoint]
  );

  return {
    result,
    loading,
    error,
    runTool,
  };
}