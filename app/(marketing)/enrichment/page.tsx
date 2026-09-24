import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";

const OPERATING_POINTS = [
  {
    target: "90%",
    threshold: "0.322",
    sensitivity: "90.3%",
    specificity: "32.5%",
    ppv: "51.0%",
    npv: "81.1%",
  },
  {
    target: "95%",
    threshold: "0.268",
    sensitivity: "95.4%",
    specificity: "24.3%",
    ppv: "49.5%",
    npv: "87.1%",
  },
  {
    target: "98%",
    threshold: "0.145",
    sensitivity: "98.3%",
    specificity: "10.2%",
    ppv: "46.0%",
    npv: "88.6%",
  },
];

const WORKFLOW = [
  {
    number: "01",
    title: "Candidate pool",
    description:
      "Start with the population available for screening rather than requiring every candidate to undergo confirmatory testing.",
  },
  {
    number: "02",
    title: "Risk stratification",
    description:
      "Apply a frozen model to available clinical and cognitive data and estimate the probability of the target endpoint.",
  },
  {
    number: "03",
    title: "Prioritization",
    description:
      "Use the trial's chosen operating point to identify candidates for the next stage of screening.",
  },
  {
    number: "04",
    title: "Confirmatory testing",
    description:
      "Reserve PET, CSF, or other protocol-defined confirmation for the candidates selected by the enrichment strategy.",
  },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-700">
      {children}
    </p>
  );
}

function DataTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200">
            {[
              "Target sensitivity",
              "Threshold",
              "Sensitivity",
              "Specificity",
              "PPV",
              "NPV",
            ].map((label, index) => (
              <th
                key={label}
                className={`px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-slate-400 ${
                  index === 0 ? "text-left" : "text-right"
                }`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {OPERATING_POINTS.map((row, index) => (
            <tr
              key={row.target}
              className={
                index !== OPERATING_POINTS.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }
            >
              <td className="px-4 py-4 font-mono text-sm font-medium text-slate-900">
                {row.target}
              </td>
              <td className="px-4 py-4 text-right font-mono text-sm tabular-nums text-slate-700">
                {row.threshold}
              </td>
              <td className="px-4 py-4 text-right font-mono text-sm tabular-nums text-slate-700">
                {row.sensitivity}
              </td>
              <td className="px-4 py-4 text-right font-mono text-sm tabular-nums text-slate-700">
                {row.specificity}
              </td>
              <td className="px-4 py-4 text-right font-mono text-sm tabular-nums text-slate-700">
                {row.ppv}
              </td>
              <td className="px-4 py-4 text-right font-mono text-sm tabular-nums text-slate-700">
                {row.npv}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EnrichmentPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>From Prediction to Enrichment</SectionEyebrow>

          <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            Prediction is useful when it changes what happens next.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            A predictive model does not have to make the final clinical
            decision. In a trial setting, it can help determine who should
            move to the next, more expensive stage of screening.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Workflow                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-stone-100 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>The enrichment workflow</SectionEyebrow>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Move expensive confirmation downstream
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              The model sits upstream of protocol-defined confirmatory
              testing. Its role is to help trial teams decide how aggressively
              to narrow the candidate pool.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map(({ number, title, description }) => (
              <div
                key={number}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <p className="font-mono text-xs tracking-wide text-teal-700">
                  {number}
                </p>

                <h3 className="mt-4 font-serif text-xl">{title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* AD case                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <SectionEyebrow>Alzheimer&apos;s disease case</SectionEyebrow>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              A+T+ biomarker status as an enrichment example
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              In one current research case, Clinovia uses age, sex, MMSE,
              RAVLT immediate recall, and LDELTOTAL to estimate the likelihood
              of A+T+ CSF biomarker status.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-slate-200 bg-stone-50 p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700">
                <FlaskConical
                  className="h-5 w-5"
                  strokeWidth={1.75}
                />
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-teal-700">
                  Current model
                </p>

                <h3 className="mt-2 font-serif text-2xl">
                  Clinical + cognitive A+T+ classifier
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Five inputs, one predicted probability, and a set of frozen
                  operating points chosen around the trial team&apos;s
                  tolerance for missed candidates.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-5">
              {[
                "Age",
                "Sex",
                "MMSE",
                "RAVLT",
                "LDELTOTAL",
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded border border-slate-200 bg-white px-3 py-3 text-center font-mono text-xs text-slate-600"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Operating points                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-stone-100 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <SectionEyebrow>Choosing an operating point</SectionEyebrow>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              Different trials can tolerate different tradeoffs
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-600">
              Instead of treating one threshold as universally correct, the
              model can be operated at different sensitivity targets. Higher
              sensitivity captures more potential A+T+ candidates while
              increasing the number sent forward for confirmation.
            </p>
          </div>

          <div className="mt-10">
            <DataTable />
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-slate-400">
            ADNI development cohort, N=542. Thresholds were selected from
            out-of-fold predictions at each target sensitivity, maximizing
            specificity subject to the target.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Interpretation                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <SectionEyebrow>What this demonstrates</SectionEyebrow>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              The model becomes part of a decision system
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              "The model does not replace protocol-defined biomarker confirmation.",
              "The threshold can be selected according to the trial's tolerance for missed candidates.",
              "The output can be used to prioritize candidates rather than make a diagnostic determination.",
              "The same framework can be evaluated for other endpoints and trial populations.",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-lg border border-slate-200 bg-stone-50 p-5"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal-700"
                  strokeWidth={1.75}
                />

                <p className="text-sm leading-relaxed text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-l-2 border-slate-300 pl-5">
            <p className="text-sm leading-relaxed text-slate-500">
              <strong className="text-slate-700">
                Validation status:
              </strong>{" "}
              this A+T+ classifier has been evaluated internally in ADNI but
              has not yet undergone external validation. The operating points
              shown above are therefore research results, not validated
              clinical screening thresholds.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Broader platform                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-stone-100 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Beyond the AD case</SectionEyebrow>

          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
            One application of a broader approach
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Alzheimer&apos;s disease is the current research case. The
            underlying approach is broader: use available data to identify
            predictive signal, validate it in the target population, and
            determine whether that signal can improve how candidates move
            through a clinical trial.
          </p>

          <Link
            href="/collaborate"
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-teal-700 hover:text-teal-800"
          >
            Discuss a trial application
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Disclaimer                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-16 pt-4">
        <p className="mx-auto max-w-xl text-center text-xs leading-relaxed text-slate-400">
          For Research Use Only. The models and examples described on this
          page are not diagnostic devices and do not replace protocol-defined
          clinical or biomarker assessment.
        </p>
      </section>
    </main>
  );
}