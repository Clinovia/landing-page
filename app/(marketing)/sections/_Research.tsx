"use client";

import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";

// =============================================================================
// Data-Driven ML Research · Alzheimer's Disease Case
//
// The research section is structured as an evidence story rather than a
// bibliography:
//
//   1. What information matters?      → modality comparison figure
//   2. Does it transport?             → external validation table + calibration
//   3. Can it become an operating rule? → A+T+ operating-point table
//   4. Underlying research            → preprints
//
// Alzheimer's disease is presented as Clinovia's current research case for
// a broader data-driven clinical-trial enrichment framework.
//
// Figures are static exports from the underlying analyses.
// Tables are native HTML for accessibility and selectable text.
// =============================================================================

const PAPERS = [
  {
    id: "medRxiv 2026.360561",
    title:
      "Comparative Value of Cognitive and Functional Assessments for Predicting 24-Month Progression from Mild Cognitive Impairment to Alzheimer's Disease: An ADNI Cohort Study",
    href: "https://submit.medrxiv.org/submission/pdf?msid=MEDRXIV/2026/360561&roleName=author",
  },
  {
    id: "medRxiv 2026.360413",
    title:
      "Systematic Modality Ablation of Multimodal Machine Learning for Predicting 24-Month Progression from Mild Cognitive Impairment to Alzheimer's Disease",
    href: "https://submit.medrxiv.org/submission/pdf?msid=MEDRXIV/2026/360413&roleName=author",
  },
  {
    id: "medRxiv 2026.359630",
    title:
      "Standardized Comparison of Clinical, Cognitive, Genetic, Neuroimaging, and Fluid Biomarkers for Predicting 24-Month Progression from Mild Cognitive Impairment to Alzheimer's Disease",
    href: "https://submit.medrxiv.org/submission/pdf?msid=MEDRXIV/2026/359630&roleName=author",
  },
  {
    id: "medRxiv 2026.356189",
    title:
      "Predicting 24-Month MCI-to-Alzheimer's Conversion Using Routine Clinical Assessments Without Neuroimaging or Genetic Testing",
    href: "https://submit.medrxiv.org/submission/pdf?msid=MEDRXIV/2026/356189&roleName=author",
  },
];

const EXTERNAL_VALIDATION = [
  {
    metric: "N",
    adni: "2,430",
    nacc: "5,246",
    oasis3: "130",
  },
  {
    metric: "ROC AUC",
    adni: "0.875",
    nacc: "0.689",
    oasis3: "0.725",
  },
  {
    metric: "Sensitivity",
    adni: "83.0%",
    nacc: "56.5%",
    oasis3: "39.5%",
  },
  {
    metric: "Specificity",
    adni: "81.1%",
    nacc: "71.5%",
    oasis3: "83.7%",
  },
];

const AT_OPERATING_POINTS = [
  {
    target: "90%",
    threshold: "0.322",
    sensitivity: "90.3%",
    specificity: "32.5%",
  },
  {
    target: "95%",
    threshold: "0.268",
    sensitivity: "95.4%",
    specificity: "24.3%",
  },
  {
    target: "98%",
    threshold: "0.145",
    sensitivity: "98.3%",
    specificity: "10.2%",
  },
];

// =============================================================================
// Small reusable pieces
// =============================================================================

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-700">
      {children}
    </p>
  );
}

function EvidenceLink({
  href = "#",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-teal-700 hover:text-teal-800"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
    </a>
  );
}

function ResearchCard({
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-stone-100 p-6 sm:p-8">
      {/* Card header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>

          <h3 className="mt-3 font-serif text-2xl leading-tight text-slate-900">
            {title}
          </h3>
        </div>

        <span className="hidden font-mono text-[11px] tracking-widest text-slate-400 sm:block">
          {number}
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      {/* Evidence */}
      <div className="mt-8">{children}</div>
    </article>
  );
}

function DataTable({
  columns,
  rows,
}: {
  columns: { key: string; label: string }[];
  rows: Record<string, string>[];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={`whitespace-nowrap px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-slate-400 ${
                  index === 0 ? "text-left" : "text-right"
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex < rows.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }
            >
              {columns.map((column, columnIndex) => (
                <td
                  key={column.key}
                  className={`whitespace-nowrap px-4 py-3 font-mono text-sm tabular-nums ${
                    columnIndex === 0
                      ? "text-left text-slate-700"
                      : "text-right text-slate-600"
                  }`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Caveat({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 border-l-2 border-slate-300 pl-4">
      <p className="text-xs leading-relaxed text-slate-500">{children}</p>
    </div>
  );
}

// =============================================================================
// Main section
// =============================================================================

export default function Research() {
  return (
    <section id="research" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* ================================================================
            INTRO
        ================================================================= */}

        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>
            Data-Driven ML Research · Alzheimer's Disease Case
          </SectionEyebrow>

          <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
            How much information does trial enrichment actually need?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Alzheimer's disease is the current research case for Clinovia's
            data-driven trial-enrichment approach. We systematically tested
            how predictive performance changes as clinical, cognitive,
            imaging, genetic, and fluid information is added.
          </p>
        </div>

        {/* ================================================================
            EVIDENCE 01
        ================================================================= */}

        <div className="mt-16">
          <ResearchCard
            number="01"
            eyebrow="Modality comparison"
            title="Where does the predictive signal live?"
            description="The central research question was not whether more biomarkers can improve a model, but how much additional information each modality contributes."
          >
            <div className="rounded-md border border-slate-200 bg-white p-3 sm:p-5">
              <Image
                src="/images/comparison_forest_plot_auc.png"
                alt="Forest plot comparing out-of-fold AUC across clinical, genetic, fluid biomarker, PET, MRI, cognitive, and multimodal models for 24-month progression."
                width={2073}
                height={1673}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 850px, 100vw"
              />
            </div>

            <div className="mt-5 max-w-2xl">
              <p className="text-sm leading-relaxed text-slate-600">
                Cognitive assessment raises AUC from approximately 0.55 with
                clinical variables alone to approximately 0.92. The full
                multimodal model reaches approximately 0.93, indicating that
                most of the predictive signal in this experiment was already
                captured by cognition.
              </p>

              <EvidenceLink href="#research-papers">
                View methodology
              </EvidenceLink>
            </div>
          </ResearchCard>
        </div>

        {/* ================================================================
            EVIDENCE 02
        ================================================================= */}

        <div className="mt-8">
          <ResearchCard
            number="02"
            eyebrow="External validation"
            title="Does the signal transport?"
            description="A frozen progression model was developed in ADNI and then applied without refitting, recalibration, or threshold optimization to independent NACC and OASIS-3 cohorts."
          >
            <DataTable
              columns={[
                { key: "metric", label: "Metric" },
                { key: "adni", label: "ADNI" },
                { key: "nacc", label: "NACC" },
                { key: "oasis3", label: "OASIS-3" },
              ]}
              rows={EXTERNAL_VALIDATION}
            />

            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              ADNI is the development cohort. NACC and OASIS-3 are independent
              external cohorts. Operating characteristics use the threshold
              frozen in ADNI.
            </p>

            <div className="mt-8 rounded-md border border-slate-200 bg-white p-3 sm:p-5">
              <Image
                src="/images/external_validation_calibration.png"
                alt="Calibration plots comparing predicted and observed 24-month progression risk in ADNI, NACC, and OASIS-3."
                width={2400}
                height={780}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 900px, 100vw"
              />
            </div>

            <Caveat>
              Discrimination transports better than calibration. External
              cohorts preserve useful ranking information, while the raw
              predicted probabilities become less well calibrated across
              populations.
            </Caveat>

            <EvidenceLink href="#research-papers">
              View full validation analysis
            </EvidenceLink>
          </ResearchCard>
        </div>

        {/* ================================================================
            EVIDENCE 03
        ================================================================= */}

        <div className="mt-8">
          <ResearchCard
            number="03"
            eyebrow="Alzheimer's disease case"
            title="From prediction to an operating rule"
            description="A second experiment asks a different question: can clinical and cognitive information be used to prescreen for A+T+ biomarker status before confirmatory testing?"
          >
            <div className="rounded-md border border-slate-200 bg-white p-1">
              <DataTable
                columns={[
                  { key: "target", label: "Target sensitivity" },
                  { key: "threshold", label: "Threshold" },
                  { key: "sensitivity", label: "Observed sensitivity" },
                  { key: "specificity", label: "Specificity" },
                ]}
                rows={AT_OPERATING_POINTS}
              />
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
              Instead of choosing one universal cutoff, the model can be
              evaluated at sensitivity targets that reflect the screening
              priorities of a particular study.
            </p>

            <Caveat>
              Internal ADNI validation only. N=542 with 43.7% A+T+
              prevalence. These operating characteristics have not yet been
              externally validated, and PPV would change with prevalence in a
              different population.
            </Caveat>

            <EvidenceLink href="#research-papers">
              View biomarker methodology
            </EvidenceLink>
          </ResearchCard>
        </div>

        {/* ================================================================
            RESEARCH INTERPRETATION
        ================================================================= */}

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <SectionEyebrow>What this demonstrates</SectionEyebrow>

          <p className="mt-5 font-serif text-2xl leading-relaxed text-slate-800">
            Start with the information already available.
            <br />
            Add complexity only when it adds useful signal.
          </p>

          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            Alzheimer's disease is one application of this methodology. The
            underlying framework is designed to support data-driven candidate
            enrichment across clinical trial programs.
          </p>
        </div>

        {/* ================================================================
            PAPERS
        ================================================================= */}

        <div id="research-papers" className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>The underlying research</SectionEyebrow>

            <h3 className="mt-3 font-serif text-2xl text-slate-900">
              Full methodology and statistical detail
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              The figures and tables above summarize analyses reported in the
              preprints below, with complete methods, cohort definitions, and
              additional analyses.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PAPERS.map(({ id, title, href }) => (
              <article
                key={id}
                className="flex flex-col rounded-lg border border-slate-200 bg-stone-100 p-7"
              >
                <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
                  {id}
                </p>

                <h4 className="mt-3 font-serif text-lg leading-snug text-slate-900">
                  {title}
                </h4>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-teal-700 hover:text-teal-800"
                >
                  <FileText
                    className="h-3.5 w-3.5"
                    strokeWidth={1.75}
                  />
                  View Preprint
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* ================================================================
            FOOTNOTE
        ================================================================= */}

        <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-slate-400">
          Research results are presented for scientific and research purposes.
          Clinovia is not a diagnostic device.
        </p>
      </div>
    </section>
  );
}