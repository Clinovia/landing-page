"use client";

import {
  User,
  ListChecks,
  ScanLine,
  Circle,
} from "lucide-react";

const CATEGORIES = [
  {
    icon: User,
    title: "Patient",
    fields: ["Age", "Sex"],
  },
  {
    icon: ListChecks,
    title: "Cognitive",
    fields: [
      "MMSE",
      "RAVLT Immediate Recall",
      "LIMM Total",
    ],
  },
  {
    icon: ScanLine,
    title: "MRI",
    optional: true,
    fields: [
      "Hippocampus",
      "Entorhinal",
      "Mid Temporal",
      "Whole Brain",
      "Ventricles",
    ],
  },
];

export default function Inputs() {
  return (
    <section
      id="inputs"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Inputs
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Everything Clinovia needs, and nothing more
          </h2>
        </div>

        {/* Category columns */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {CATEGORIES.map(
            ({
              icon: Icon,
              title,
              fields,
              optional,
            }) => (
              <div
                key={title}
                className="rounded-lg border border-slate-200 bg-stone-50 p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700">
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {title}
                    </h3>

                    {optional && (
                      <span className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
                        Optional
                      </span>
                    )}
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {fields.map((field) => (
                    <li
                      key={field}
                      className="flex items-center gap-2.5 text-sm text-slate-600"
                    >
                      <Circle
                        className="h-1.5 w-1.5 flex-shrink-0 fill-current text-teal-600"
                        strokeWidth={0}
                      />

                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}