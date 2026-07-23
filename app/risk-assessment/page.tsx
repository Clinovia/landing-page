"use client";

import {
  RiskAssessmentForm,
  RiskAssessmentResult,
} from "@/features/risk-assessment";

import { useRiskAssessment } from "@/features/risk-assessment";

import ErrorMessage from "@/components/shared/ErrorMessage";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function RiskAssessmentPage() {
  const {
    run,
    data,
    loading,
    error,
  } = useRiskAssessment();

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Clinical + Cognitive Risk Assessment
        </h1>

        <p className="mt-2 text-gray-600">
          Estimate 24-month progression risk using routine
          clinical and cognitive assessments. MRI features are optional, but can improve accuracy.
        </p>
      </div>

      <div className="grid gap-8">
        <div>
          <RiskAssessmentForm
            onSubmit={run}
            loading={loading}
          />
        </div>

        <div>
          {loading && <LoadingSpinner />}

          {error && (
            <ErrorMessage message={error} />
          )}

          <RiskAssessmentResult
            result={data ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}