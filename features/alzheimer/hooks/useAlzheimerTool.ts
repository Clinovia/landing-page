"use client";

import { useState, useCallback, useRef } from "react";

// ----------------------------------
// Types
// ----------------------------------

type RunFn<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

type UseAlzheimerToolOptions = {
  debug?: boolean;
  timeoutMs?: number;
};

type UseAlzheimerToolReturn<TInput, TOutput> = {
  result: TOutput | null;
  loading: boolean;
  error: string | null;
  runTool: (payload: TInput) => Promise<TOutput | undefined>;
  reset: () => void;
};

// ----------------------------------
// Hook
// ----------------------------------

export function useAlzheimerTool<TInput, TOutput>(
  runApi: RunFn<TInput, TOutput>,
  options?: UseAlzheimerToolOptions
): UseAlzheimerToolReturn<TInput, TOutput> {
  const { debug = false, timeoutMs } = options ?? {};

  const [result, setResult] = useState<TOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use a ref for the in-flight guard so `runTool` never captures a stale
  // `loading` value via its closure. Without this, adding `loading` to the
  // useCallback dep array causes a new function to be created on every state
  // transition, and the component holding the old reference sees
  // `loading === true` forever, silently blocking all subsequent calls.
  const loadingRef = useRef(false);

  // ----------------------------------
  // Timeout wrapper
  // Memoised so it's stable across renders.
  // ----------------------------------
  const withTimeout = useCallback(
    (promise: Promise<TOutput>): Promise<TOutput> => {
      if (!timeoutMs) return promise;

      return Promise.race([
        promise,
        new Promise<TOutput>((_, reject) =>
          setTimeout(
            () => reject(new Error(`Request timed out after ${timeoutMs}ms`)),
            timeoutMs
          )
        ),
      ]);
    },
    [timeoutMs]
  );

  // ----------------------------------
  // Reset
  // ----------------------------------
  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
    loadingRef.current = false;
  }, []);

  // ----------------------------------
  // Main runner
  // ----------------------------------
  const runTool = useCallback(
    async (payload: TInput): Promise<TOutput | undefined> => {
      // Guard via ref — never goes stale between renders.
      if (loadingRef.current) {
        if (debug) console.warn("⚠️ Already loading, skipping...");
        return;
      }

      if (debug) console.log("🚀 RUN TOOL START");

      loadingRef.current = true;
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
          err instanceof Error ? err.message : "An unknown error occurred";

        setError(message);
        throw err;
      } finally {
        if (debug) console.log("🏁 RUN TOOL FINALLY");

        loadingRef.current = false;
        setLoading(false);
      }
    },
    // `loading` intentionally omitted — loadingRef handles the guard.
    [runApi, withTimeout, debug]
  );

  return { result, loading, error, runTool, reset };
}