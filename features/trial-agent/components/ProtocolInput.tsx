"use client";

import { FileText, Upload } from "lucide-react";

interface ProtocolInputProps {
  value: string;
  onChange: (value: string) => void;
  onFileSelect?: (file: File) => void;
}

export default function ProtocolInput({
  value,
  onChange,
  onFileSelect,
}: ProtocolInputProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 text-teal-700">
            <FileText className="h-4 w-4" strokeWidth={1.75} />
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
              Step 01
            </p>
            <h2 className="mt-0.5 text-sm font-medium text-slate-900">
              Trial protocol
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6">
        <label
          htmlFor="protocol"
          className="font-mono text-[11px] uppercase tracking-wide text-slate-500"
        >
          Protocol text
        </label>

        <textarea
          id="protocol"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Paste the trial protocol or relevant eligibility section here..."
          className="mt-3 min-h-40 w-full resize-y rounded-md border border-slate-200 bg-stone-50 px-4 py-3 text-sm leading-relaxed text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            The agent will extract and map eligibility criteria.
          </p>

          <label
            htmlFor="protocol-file"
            className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-teal-700 hover:text-teal-800"
          >
            <Upload className="h-3.5 w-3.5" strokeWidth={1.75} />
            Upload

            <input
              id="protocol-file"
              type="file"
              accept=".txt,.md,.pdf,.doc,.docx"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file && onFileSelect) {
                  onFileSelect(file);
                }
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
