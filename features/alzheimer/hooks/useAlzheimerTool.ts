// features/alzheimer/hooks/useAlzheimerTool.ts
import { useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Hook to interact with Alzheimer assessment endpoints.
 *
 * @param endpoint - The specific Alzheimer tool endpoint (e.g., "riskScreener", "diagnosisBasic")
 * @returns Object containing result, loading state, error, and runTool function
 */
export function useAlzheimerTool<TInput = Record<string, unknown>, TOutput = unknown>(endpoint: string) {
  const [result, setResult] = useState<TOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const runTool = useCallback(
    async (payload: TInput) => {
      console.log("🧠 [AlzheimerTool] Starting:", endpoint);
      
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        // Get authentication session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log("🧠 [AlzheimerTool] Session retrieved:", !!session);
        console.log("🧠 [AlzheimerTool] Token exists:", !!session?.access_token);

        if (sessionError || !session?.access_token) {
          console.error("🔴 [AlzheimerTool] No valid session");
          throw new Error("Not authenticated");
        }

        // Construct request URL - use Next.js API route, not backend directly
        const url = `/api/v1/alzheimer/${endpoint}`;
        
        // Prepare headers with authentication
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        };

        console.log("🧠 [AlzheimerTool] Fetching:", url);
        console.log("🧠 [AlzheimerTool] Auth header present:", !!headers.Authorization);

        // Make API request
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        });

        console.log("🧠 [AlzheimerTool] Response status:", response.status);

        // Handle error responses
        if (!response.ok) {
          const errorText = await response.text().catch(() => "API request failed");
          console.error("🔴 [AlzheimerTool] Error:", errorText);
          throw new Error(errorText || "API request failed");
        }

        // Parse and set successful response
        const data = await response.json();
        console.log("✅ [AlzheimerTool] Success!");
        setResult(data);

        return data;

      } catch (err) {
        const message = err instanceof Error ? err.message : "An unknown error occurred";
        console.error("💥 [AlzheimerTool] Error:", message);
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, supabase]
  );

  return {
    result,
    loading,
    error,
    runTool,
  };
}