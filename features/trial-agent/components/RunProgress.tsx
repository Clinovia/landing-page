"use client";

import { Check } from "lucide-react";

interface RunProgressProps {
  stages: readonly string[];
  activeStage: number;
  isRunning: boolean;
}

export default function RunProgress({
  stages,
  activeStage,
  isRunning,
}: RunProgressProps) {
  const workflowComplete = activeStage >= stages.length;

  return (
    <aside className="h-fit rounded-lg border border-slate-200 bg-white shadow-sm lg:sticky lg:top-8">
      <div className="border-b border-slate-200 px-5 py-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
          Agent workflow
        </p>

        <h2 className="mt-1 font-serif text-xl text-slate-900">
          Enrichment
        </h2>
      </div>

      <div className="p-5">
        <div className="space-y-0">
          {stages.map((stage, index) => {
            const completed =
              workflowComplete || activeStage > index;

            const current =
              isRunning &&
              !workflowComplete &&
              activeStage === index;

            return (
              <div key={stage} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      completed
                        ? "border-teal-600 bg-teal-600 text-white"
                        : current
                          ? "border-teal-600 bg-white text-teal-700"
                          : "border-slate-200 bg-white text-slate-300"
                    }`}
                  >
                    {completed ? (
                      <Check
                        className="h-3 w-3"
                        strokeWidth={2}
                      />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </div>

                  {index < stages.length - 1 && (
                    <div
                      className={`my-1 h-7 w-px ${
                        workflowComplete || activeStage > index
                          ? "bg-teal-600"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>

                <div className="pt-0.5">
                  <p
                    className={`text-xs leading-5 ${
                      completed || current
                        ? "text-slate-700"
                        : "text-slate-400"
                    }`}
                  >
                    {stage}
                  </p>

                  {current && (
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-teal-700">
                      Running
                    </p>
                  )}

                  {completed && (
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                      Complete
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

