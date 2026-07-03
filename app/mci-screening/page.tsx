"use client";

import { useEffect } from "react";
import { useMCIScreening } from "@/features/mci-screening/hooks/useMCIScreening";
import { useMCIScreeningResults } from "@/context/MCIScreeningContext";
import MCIScreeningForm from "@/features/mci-screening/components/MCIScreeningForm";
import { MCIScreeningResult } from "@/features/mci-screening/components/MCIScreeningResult";
import type { MCIScreeningInput } from "@/features/mci-screening/types";

export default function MCIScreeningPage() {
  const { data, loading, error, run, reset } = useMCIScreening();
  const { setMCIScreening } = useMCIScreeningResults();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleSubmit = async (values: MCIScreeningInput) => {
    const result = await run(values);
    if (result) setMCIScreening(result);
  };

  const handleReset = () => reset();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-[#1B4D3E] mb-2">
          MCI -&gt; AD Conversion Risk Stratification
        </h1>
        <p className="text-muted-foreground">
          Risk stratification using clinical and cognitive variables.
        </p>
      </header>

      <MCIScreeningForm onSubmit={handleSubmit} loading={loading} />

      {error && !loading && (
        <div className="p-4 rounded border border-red-200 bg-red-50">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={handleReset} className="mt-2 text-sm text-blue-600 underline">
            Try Again
          </button>
        </div>
      )}

      {data && !loading && <MCIScreeningResult result={data} />}

      <p className="text-sm text-muted-foreground">
        ⚠️ Research-use clinical decision support prototype. Not a medical device.
      </p>
    </div>
  );
}