"use client";

interface Candidate {
  [key: string]: unknown;
}

interface CandidateTableProps {
  candidates: Candidate[];
  participantIdField?: string;
  limit?: number;
}

const SCORE_FIELD = "clinovia_a_t_positive_probability";

export default function CandidateTable({
  candidates,
  participantIdField = "participant_id",
  limit = 20,
}: CandidateTableProps) {
  const displayedCandidates = [...candidates]
    .sort((a, b) => {
      const scoreA = toNumber(a[SCORE_FIELD]);
      const scoreB = toNumber(b[SCORE_FIELD]);

      return scoreB - scoreA;
    })
    .slice(0, limit);

  if (displayedCandidates.length === 0) {
    return (
      <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
            Candidate ranking
          </p>

          <h2 className="mt-1 font-serif text-2xl text-slate-900">
            No candidates to display
          </h2>
        </div>

        <div className="px-6 py-8">
          <p className="text-sm leading-relaxed text-slate-500">
            No eligible candidates were returned for this run.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-teal-700">
              Candidate ranking
            </p>

            <h2 className="mt-1 font-serif text-2xl text-slate-900">
              Clinovia A+T+ prioritization
            </h2>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
            Showing {displayedCandidates.length} of {candidates.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-stone-50">
              <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                Rank
              </th>

              <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                Participant
              </th>

              <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                A+T+ probability
              </th>

              <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                MMSE
              </th>

              <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                RAVLT
              </th>

              <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                LIMM
              </th>
            </tr>
          </thead>

          <tbody>
            {displayedCandidates.map((candidate, index) => (
              <tr
                key={`${String(candidate[participantIdField] ?? index)}-${index}`}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-6 py-4 font-mono text-xs text-slate-400">
                  {index + 1}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  {formatValue(candidate[participantIdField])}
                </td>

                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-teal-700">
                    {formatProbability(candidate[SCORE_FIELD])}
                  </span>
                </td>

                <td className="px-6 py-4 font-mono text-xs text-slate-600">
                  {formatValue(candidate.MMSE)}
                </td>

                <td className="px-6 py-4 font-mono text-xs text-slate-600">
                  {formatValue(candidate.RAVLT_immediate)}
                </td>

                <td className="px-6 py-4 font-mono text-xs text-slate-600">
                  {formatValue(candidate.LDELTOTAL)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {candidates.length > limit && (
        <div className="border-t border-slate-200 px-6 py-4">
          <p className="text-xs text-slate-400">
            Showing the top {limit} candidates by Clinovia A+T+ probability.
          </p>
        </div>
      )}
    </section>
  );
}

function toNumber(value: unknown): number {
  const number = Number(value);
  return Number.isFinite(number) ? number : Number.NEGATIVE_INFINITY;
}

function formatProbability(value: unknown): string {
  const number = toNumber(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return `${(number * 100).toFixed(1)}%`;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "number") {
    return Number.isInteger(value)
      ? String(value)
      : value.toFixed(2);
  }

  return String(value);
}
