"use client";

import { useState, useCallback } from "react";

type RunFn<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

type UseAlzheimerToolOptions = {
  debug?: boolean;
  timeoutMs?: number;
};

export function useAlzheimerTool<TInput, TOutput>(
  runApi: RunFn<TInput, TOutput>,
  options?: UseAlzheimerToolOptions
) {
  const { debug = false, timeoutMs } = options || {};

  const [result, setResult] = useState<TOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -----------------------------
  // Helpers
  // -----------------------------

  const withTimeout = (promise: Promise<TOutput>) => {
    if (!timeoutMs) return promise;

    return Promise.race([
      promise,
      new Promise<TOutput>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timeout")),
          timeoutMs
        )
      ),
    ]);
  };

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  // -----------------------------
  // Main Runner
  // -----------------------------

  const runTool = useCallback(
    async (payload: TInput) => {
      if (loading) {
        if (debug) console.warn("⚠️ Already loading, skipping...");
        return;
      }

      if (debug) console.log("🚀 RUN TOOL START");

      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const data = await withTimeout(runApi(payload));

        if (debug) console.log("✅ RUN TOOL SUCCESS", data);

        setResult(data);
        return data;
      } catch (err) {
        if (debug) console.error("❌ RUN TOOL ERROR", err);

        const message =
          err instanceof Error
            ? err.message
            : "An unknown error occurred";

        setError(message);
        throw err;
      } finally {
        if (debug) console.log("🏁 RUN TOOL FINALLY");
        setLoading(false);
      }
    },
    [runApi, loading, debug, timeoutMs]
  );

  return {
    result,
    loading,
    error,
    runTool,
    reset, // ✅ important for page transitions
  };
}