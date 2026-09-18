"use client";

import { Check } from "lucide-react";

interface CriteriaInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CriteriaInput({
  value,
  onChange,
}: CriteriaInputProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 text-teal-700">
            <Check className="h-4 w-4" strokeWidth={1.75} />
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
              Step 02
            </p>
            <h2 className="mt-0.5 text-sm font-medium text-slate-900">
              Eligibility criteria
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6">
        <label
          htmlFor="criteria"
          className="font-mono text-[11px] uppercase tracking-wide text-slate-500"
        >
          Structured criteria (JSON)
        </label>

        <textarea
          id="criteria"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder='[{ "criterion_id": "I1", "variable": "AGE", "operator": "between", "value": [60, 85] }]'
          className="mt-3 min-h-28 w-full resize-y rounded-md border border-slate-200 bg-stone-50 px-4 py-3 font-mono text-sm leading-relaxed text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />

        <p className="mt-3 text-xs text-slate-400">
          Required. Provide criteria as a JSON array with variable, operator,
          and value for each criterion. Free text is not yet supported.
        </p>
      </div>
    </div>
  );
}