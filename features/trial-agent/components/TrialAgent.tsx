"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

import ProtocolInput from "./ProtocolInput";
import CriteriaInput from "./CriteriaInput";
import CohortUpload from "./CohortUpload";
import RunProgress from "./RunProgress";
import EnrichmentSummary from "./EnrichmentSummary";
import CandidateTable from "./CandidateTable";

import { useTrialEnrichment } from "../hooks/useTrialEnrichment";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CLINOVIA_API_URL ?? "http://localhost:8000";

export default function TrialAgent() {
  const [protocol, setProtocol] = useState("");
  const [criteria, setCriteria] = useState("");
  const [cohortFile, setCohortFile] = useState<File | null>(null);

  const {
    isRunning,
    activeStage,
    result,
    error,
    stages,
    run,
    reset,
  } = useTrialEnrichment();

  const canRun =
    protocol.trim().length > 0 &&
    cohortFile !== null &&
    !isRunning;

  const workflowComplete =
    result !== null && !isRunning && activeStage >= stages.length;

  const handleRun = async () => {
    if (!canRun || !cohortFile) {
      return;
    }

    try {
      await run({
        protocol,
        criteria,
        cohortFile,
      });
    } catch {
      // The hook stores the user-facing error.
      // No additional handling is needed here.
    }
  };

  const handleReset = () => {
    reset();
    setProtocol("");
    setCriteria("");
    setCohortFile(null);
  };

  const handleDownloadReport = () => {
    if (!result?.run_id) return;
    window.open(`${API_BASE_URL}/reports/${result.run_id}`, "_blank");
  };

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Clinovia Trial Enrichment
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-tight text-slate-900 sm:text-5xl">
            Find the candidates worth screening first.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Give Clinovia a trial protocol and a candidate cohort. The agent
            maps eligibility criteria, identifies candidates, applies Clinovia
            risk stratification, and produces an enrichment report.
          </p>
        </div>

        {/* Workflow */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            {/* Protocol */}
            <ProtocolInput value={protocol} onChange={setProtocol} />

            {/* Criteria */}
            <CriteriaInput value={criteria} onChange={setCriteria} />

            {/* Cohort */}
            <CohortUpload file={cohortFile} onChange={setCohortFile} />

            {/* Run */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {error ? (
                <p className="max-w-xl text-sm leading-relaxed text-red-600">
                  {error}
                </p>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleRun}
                disabled={!canRun}
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-teal-700 px-5 py-3 font-mono text-xs uppercase tracking-wide text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isRunning ? "Running..." : "Run Clinovia Enrichment"}

                {!isRunning && (
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                )}
              </button>
            </div>

            {/* Error recovery */}
            {error && (
              <div className="flex items-center justify-between rounded-md border border-red-200 bg-white px-4 py-3">
                <p className="text-xs text-slate-500">
                  The enrichment run did not complete.
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className="font-mono text-[11px] uppercase tracking-wide text-teal-700 hover:text-teal-800"
                >
                  Try again
                </button>
              </div>
            )}
          </div>

          {/* Agent workflow */}
          <RunProgress
            stages={stages}
            activeStage={activeStage}
            isRunning={isRunning}
          />
        </div>

        {/* Results */}
        {workflowComplete && result && (
          <div className="mt-12 space-y-8">
            {result.status === "awaiting_human_review" ? (
              <div className="rounded-lg border border-amber-200 bg-white px-6 py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber-700">
                  Human review required
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  The run paused before scoring candidates because one or
                  more eligibility criteria could not be safely mapped to
                  the cohort.
                </p>

                <div className="mt-3 space-y-1">
                  {result.review_reasons.map((reason) => (
                    <p
                      key={reason}
                      className="text-sm leading-relaxed text-slate-600"
                    >
                      {reason}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <EnrichmentSummary
                  initialCohort={result.summary.initial_cohort_n ?? 0}
                  eligible={result.summary.candidate_n ?? 0}
                  scored={result.summary.scored_n ?? 0}
                  reportPath={result.summary.report_path ?? null}
                  onDownloadReport={handleDownloadReport}
                  noEligibleCandidates={
                    result.status === "completed_no_candidates"
                  }
                />

                {result.candidates && result.candidates.length > 0 && (
                  <CandidateTable
                    candidates={result.candidates}
                    limit={20}
                  />
                )}

                {result.requires_human_review && (
                  <div className="rounded-lg border border-amber-200 bg-white px-6 py-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber-700">
                      Human review required
                    </p>

                    <div className="mt-3 space-y-1">
                      {result.review_reasons.map((reason) => (
                        <p
                          key={reason}
                          className="text-sm leading-relaxed text-slate-600"
                        >
                          {reason}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {result.errors.length > 0 && (
              <div className="rounded-lg border border-red-200 bg-white px-6 py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-red-700">
                  Run messages
                </p>

                <div className="mt-3 space-y-1">
                  {result.errors.map((message) => (
                    <p
                      key={message}
                      className="text-sm leading-relaxed text-slate-600"
                    >
                      {message}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="font-mono text-[11px] uppercase tracking-wide text-slate-500 hover:text-teal-700"
              >
                Start another run
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}