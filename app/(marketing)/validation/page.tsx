"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";

const VALIDATION = [
  {
    metric: "N",
    adni: "2,430",
    nacc: "5,246",
    oasis3: "130",
  },
  {
    metric: "ROC AUC (95% CI)",
    adni: "0.875 (0.858–0.891)",
    nacc: "0.689 (0.671–0.706)",
    oasis3: "0.725 (0.629–0.811)",
  },
  {
    metric: "Sensitivity (95% CI)",
    adni: "0.830 (0.799–0.861)",
    nacc: "0.565 (0.533–0.596)",
    oasis3: "0.395 (0.243–0.553)",
  },
  {
    metric: "Specificity (95% CI)",
    adni: "0.811 (0.793–0.828)",
    nacc: "0.715 (0.702–0.729)",
    oasis3: "0.837 (0.758–0.907)",
  },
  {
    metric: "PPV (95% CI)",
    adni: "0.561 (0.525–0.596)",
    nacc: "0.303 (0.282–0.324)",
    oasis3: "0.500 (0.323–0.692)",
  },
  {
    metric: "NPV (95% CI)",
    adni: "0.943 (0.931–0.954)",
    nacc: "0.883 (0.872–0.893)",
    oasis3: "0.770 (0.682–0.845)",
  },
  {
    metric: "Brier score (95% CI)",
    adni: "0.138 (0.130–0.146)",
    nacc: "0.213 (0.207–0.221)",
    oasis3: "0.188 (0.150–0.233)",
  },
];

const COLUMNS = [
  { key: "metric", label: "Metric" },
  { key: "adni", label: "ADNI" },
  { key: "nacc", label: "NACC" },
  { key: "oasis3", label: "OASIS-3" },
];

function DataTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200">
            {COLUMNS.map((column, index) => (
              <th
                key={column.key}
                className={`px-4 py-3 font-mono text-[11px] uppercase tracking-wide text-slate-400 ${
                  index === 0 ? "text-left" : "text-right"
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {VALIDATION.map((row, index) => (
            <tr
              key={row.metric}
              className={
                index !== VALIDATION.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }
            >
              {COLUMNS.map((column, columnIndex) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 font-mono text-sm tabular-nums ${
                    columnIndex === 0
                      ? "text-left text-slate-900"
                      : "text-right text-slate-700"
                  }`}
                >
                  {row[column.key as keyof typeof row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-700">
      {children}
    </p>
  );
}

export default function ValidationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="px-6 pb-16 pt-20 sm:pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#research"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate-400 hover:text-teal-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            Back to research
          </Link>

          <div className="mt-16 max-w-3xl">
            <Eyebrow>External Validation</Eyebrow>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-slate-900 sm:text-5xl">
              Does the signal survive outside ADNI?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              A progression model developed in ADNI was frozen before being
              applied unchanged to independent NACC and OASIS-3 cohorts.
              No refitting, recalibration, or threshold optimization was
              performed on the external data.
            </p>
          </div>
        </div>
      </section>

      {/* Model specification */}
      <section className="bg-stone-100 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <Eyebrow>Model</Eyebrow>
              <p className="mt-2 font-serif text-xl text-slate-900">
                Clinical + Cognition
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Age, sex, MMSE, and memory assessment.
              </p>
            </div>

            <div>
              <Eyebrow>Development</Eyebrow>
              <p className="mt-2 font-serif text-xl text-slate-900">
                ADNI
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Threshold frozen in the development cohort before external
                validation.
              </p>
            </div>

            <div>
              <Eyebrow>External cohorts</Eyebrow>
              <p className="mt-2 font-serif text-xl text-slate-900">
                NACC + OASIS-3
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Independent cohorts evaluated using the frozen model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-2xl">
            <Eyebrow>Performance</Eyebrow>

            <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
              Discrimination transfers; calibration is harder
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-600">
              The model continues to distinguish higher- from lower-risk
              participants in both external cohorts, although discrimination
              is lower than in the development cohort.
            </p>
          </div>

          <div className="mt-10">
            <DataTable />
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Sensitivity, specificity, PPV, and NPV are reported at the single
            operating threshold frozen in ADNI. Confidence intervals are
            participant-level nonparametric bootstrap percentile intervals
            using 2,000 replicates.
          </p>
        </div>
      </section>

      {/* Calibration */}
      <section className="bg-stone-50 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-2xl">
            <Eyebrow>Calibration</Eyebrow>

            <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
              Ranking transports better than raw probability
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-600">
              External validation reveals an important distinction:
              discrimination and calibration are not the same thing. The
              model can retain useful ranking information while its predicted
              probabilities become less reliable in a new population.
            </p>
          </div>

          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-4">
            <Image
              src="/images/external_validation_calibration.png"
              alt="Calibration plots comparing predicted and observed 24-month progression risk in ADNI, NACC, and OASIS-3."
              width={2400}
              height={780}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
          </div>

          <div className="mt-6 border-l-2 border-slate-300 pl-4">
            <p className="text-sm leading-relaxed text-slate-500">
              Calibration slope was 0.92 in ADNI, 0.35 in NACC, and 0.62 in
              OASIS-3. These results support using the model as a relative
              risk-stratification signal rather than assuming that an
              externally generated probability is automatically calibrated.
            </p>
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>What this demonstrates</Eyebrow>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Validation is part of the product
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
            A model that performs well in its development cohort is only the
            beginning. Clinovia treats frozen external validation as a
            separate step: define the model, lock the operating specification,
            transport it unchanged, and measure what survives.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/collaborate"
              className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-5 py-3 font-mono text-xs uppercase tracking-wide text-white hover:bg-teal-800"
            >
              Discuss Validation
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate-500 hover:text-teal-700"
            >
              Back to Research
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="border-t border-slate-200 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Eyebrow>Methodology</Eyebrow>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                Full cohort definitions, preprocessing, model specification,
                threshold selection, bootstrap procedures, and validation
                results are available in the research record.
              </p>
            </div>

            <Link
              href="/papers"
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-teal-700 hover:text-teal-800"
            >
              View Research
              <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </section>

      {/* Regulatory note */}
      <footer className="px-6 pb-12">
        <p className="mx-auto max-w-4xl text-xs leading-relaxed text-slate-400">
          Research use only. External validation results describe model
          performance in the specified cohorts and should not be interpreted
          as clinical validation or diagnostic performance.
        </p>
      </footer>
    </main>
  );
}