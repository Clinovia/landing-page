"use client";

import { ArrowDownToLine, FileText } from "lucide-react";

interface EnrichmentSummaryProps {
  initialCohort: number;
  eligible: number;
  scored: number;
  reportPath?: string | null;
  onDownloadReport?: () => void;
  noEligibleCandidates?: boolean;
}

export default function EnrichmentSummary({
  initialCohort,
  eligible,
  scored,
  reportPath,
  onDownloadReport,
  noEligibleCandidates = false,
}: EnrichmentSummaryProps) {
  return (
    <section className="mt-12 rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-teal-700">
          Enrichment result
        </p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-slate-900">
              {noEligibleCandidates
                ? "No eligible candidates found"
                : "Clinovia prioritization complete"}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {noEligibleCandidates
                ? "Every candidate in the cohort was excluded by the eligibility criteria."
                : "Candidates have been evaluated using the Clinovia A+T+ model."}
            </p>
          </div>

          {reportPath && onDownloadReport && (
            <button
              type="button"
              onClick={onDownloadReport}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide text-slate-700 transition hover:border-teal-400 hover:text-teal-700"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" strokeWidth={1.75} />
              Download report
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
        <SummaryMetric label="Initial cohort" value={initialCohort} />
        <SummaryMetric label="Eligible" value={eligible} />
        <SummaryMetric label="Clinovia scored" value={scored} />
      </div>

      {reportPath ? (
        <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-5">
          <FileText className="h-4 w-4 shrink-0 text-teal-700" strokeWidth={1.75} />
          <p className="text-sm text-slate-500">
            Enrichment report generated successfully.
          </p>
        </div>
      ) : (
        <div className="border-t border-slate-200 px-6 py-5">
          <p className="text-sm leading-relaxed text-slate-500">
            The enrichment analysis is complete. A report will be available
            when report generation is enabled for this run.
          </p>
        </div>
      )}
    </section>
  );
}

interface SummaryMetricProps {
  label: string;
  value: number | string;
}

function SummaryMetric({ label, value }: SummaryMetricProps) {
  return (
    <div className="bg-white p-6">
      <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl text-slate-900">{value}</p>
    </div>
  );
}