// features/cardiology/hooks/useCardiologyTool.ts
import { useState, useCallback } from "react";

type RunFn<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

export function useCardiologyTool<TInput, TOutput>(
  runApi: RunFn<TInput, TOutput>
) {
  const [result, setResult] = useState<TOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTool = useCallback(
    async (payload: TInput) => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const data = await runApi(payload);
        setResult(data);
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [runApi]
  );

  return {
    result,
    loading,
    error,
    runTool,
  };
}
