"use client";

import Image from "next/image";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";

// =============================================================================
// Research Papers
// =============================================================================
// This page expands the landing-page Card 1:
//
//   "How much information is actually needed?"
//
// The landing page shows the research finding.
// This page provides the underlying papers and methodology.
//
// Alzheimer's disease is presented as the current research case for
// Clinovia's broader data-driven trial-enrichment approach.

const PAPERS = [
  {
    id: "medRxiv 2026.360561",
    title:
      "Comparative Value of Cognitive and Functional Assessments for Predicting 24-Month Progression from Mild Cognitive Impairment to Alzheimer's Disease: An ADNI Cohort Study",
    summary:
      "Which cognitive and functional assessments contribute the most predictive information for 24-month progression?",
    href: "https://submit.medrxiv.org/submission/pdf?msid=MEDRXIV/2026/360561&roleName=author",
  },
  {
    id: "medRxiv 2026.360413",
    title:
      "Systematic Modality Ablation of Multimodal Machine Learning for Predicting 24-Month Progression from Mild Cognitive Impairment to Alzheimer's Disease",
    summary:
      "How much does each additional modality contribute when clinical, cognitive, imaging, genetic, and fluid biomarkers are evaluated systematically?",
    href: "https://submit.medrxiv.org/submission/pdf?msid=MEDRXIV/2026/360413&roleName=author",
  },
  {
    id: "medRxiv 2026.359630",
    title:
      "Standardized Comparison of Clinical, Cognitive, Genetic, Neuroimaging, and Fluid Biomarkers for Predicting 24-Month Progression from Mild Cognitive Impairment to Alzheimer's Disease",
    summary:
      "A standardized comparison of major biomarker modalities under a common modeling framework.",
    href: "https://submit.medrxiv.org/submission/pdf?msid=MEDRXIV/2026/359630&roleName=author",
  },
  {
    id: "medRxiv 2026.356189",
    title:
      "Predicting 24-Month MCI-to-Alzheimer's Conversion Using Routine Clinical Assessments Without Neuroimaging or Genetic Testing",
    summary:
      "Can routine clinical and cognitive assessments provide useful progression-risk stratification without requiring imaging or genetic testing?",
    href: "https://submit.medrxiv.org/submission/pdf?msid=MEDRXIV/2026/356189&roleName=author",
  },
];

const FINDINGS = [
  {
    label: "Clinical variables",
    value: "Baseline",
    description:
      "Age and sex provide a starting point for progression-risk prediction.",
  },
  {
    label: "Cognitive assessment",
    value: "Major signal",
    description:
      "Adding cognitive measures substantially increases predictive information.",
  },
  {
    label: "Additional modalities",
    value: "Incremental",
    description:
      "Imaging, genetics, and fluid biomarkers add information, but with substantially greater acquisition burden.",
  },
];

export default function Papers() {
  return (
    <main className="bg-white">
      {/* =================================================================
          Header
      ================================================================= */}
      <section className="px-6 pb-16 pt-12 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#research"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-slate-400 hover:text-teal-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            Back to research
          </Link>

          <div className="mx-auto mt-14 max-w-3xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-700">
              Data-Driven ML Research · Alzheimer&apos;s Disease Case
            </p>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-slate-900 sm:text-5xl">
              How much information does trial enrichment actually need?
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              We investigated how much predictive information can be obtained
              from routine clinical and cognitive assessment, and what is
              gained by adding increasingly expensive or invasive modalities.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================================
          Research figure
      ================================================================= */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-stone-50 p-4 sm:p-6">
            <Image
              src="/images/comparison_forest_plot_auc.png"
              alt="Forest plot comparing out-of-fold AUC across clinical, genetic, fluid biomarker, imaging, cognitive, and multimodal models."
              width={2073}
              height={1673}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            Out-of-fold AUC comparison across progressively richer input
            modalities. Cognitive assessment provides a substantial increase
            in predictive performance, while the full multimodal model adds
            comparatively less incremental discrimination.
          </p>
        </div>
      </section>

      {/* =================================================================
          Findings
      ================================================================= */}
      <section className="bg-stone-100 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-700">
              What we learned
            </p>

            <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
              More data is not automatically more useful
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              The research asks a practical question for clinical trial
              enrichment: which information is worth collecting before
              confirmatory testing?
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FINDINGS.map(({ label, value, description }) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
                  {label}
                </p>

                <p className="mt-3 font-serif text-2xl text-slate-900">
                  {value}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          Papers
      ================================================================= */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-700">
              Underlying research
            </p>

            <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
              Preprints and methodology
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Four studies examine the question from complementary
              perspectives, from individual cognitive assessments to
              systematic multimodal comparison.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PAPERS.map(({ id, title, summary, href }) => (
              <article
                key={id}
                className="flex flex-col rounded-lg border border-slate-200 bg-stone-100 p-7"
              >
                <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
                  {id}
                </p>

                <h3 className="mt-3 font-serif text-lg leading-snug text-slate-900">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {summary}
                </p>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-teal-700 hover:text-teal-800"
                >
                  <FileText
                    className="h-3.5 w-3.5"
                    strokeWidth={1.75}
                  />
                  View Preprint
                  <ArrowUpRight
                    className="h-3 w-3"
                    strokeWidth={1.75}
                  />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          Broader context
      ================================================================= */}
      <section className="border-t border-slate-200 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-slate-500">
            Alzheimer&apos;s disease is Clinovia&apos;s current application
            case. The underlying research program asks a broader question:
            how can data-driven models identify useful enrichment signals
            before costly confirmatory testing?
          </p>

          <Link
            href="/#research"
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-teal-700 hover:text-teal-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            Back to research
          </Link>
        </div>
      </section>
    </main>
  );
}

