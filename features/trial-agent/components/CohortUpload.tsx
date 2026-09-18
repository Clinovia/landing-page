"use client";

import { FlaskConical, Upload } from "lucide-react";

interface CohortUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const REQUIRED_FEATURES = [
  "MMSE",
  "RAVLT_immediate",
  "LDELTOTAL",
];

export default function CohortUpload({
  file,
  onChange,
}: CohortUploadProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 text-teal-700">
            <FlaskConical className="h-4 w-4" strokeWidth={1.75} />
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
              Step 03
            </p>
            <h2 className="mt-0.5 text-sm font-medium text-slate-900">
              Candidate cohort
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6">
        <label
          htmlFor="cohort"
          className="font-mono text-[11px] uppercase tracking-wide text-slate-500"
        >
          Cohort CSV
        </label>

        <label
          htmlFor="cohort"
          className="mt-3 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-stone-50 px-6 text-center transition hover:border-teal-400 hover:bg-white"
        >
          <Upload
            className="h-5 w-5 text-slate-400"
            strokeWidth={1.5}
          />

          <span className="mt-3 text-sm text-slate-600">
            {file?.name || "Drop a CSV here or choose a file"}
          </span>

          <span className="mt-1 text-xs text-slate-400">
            Participant-level cohort data
          </span>

          <input
            id="cohort"
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0] ?? null;
              onChange(selectedFile);
            }}
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
          <span>Clinovia features:</span>

          {REQUIRED_FEATURES.map((feature) => (
            <span key={feature} className="font-mono">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
