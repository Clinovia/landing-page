"use client";

import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

// =============================================================================
// Research — Alzheimer's Disease Case
// =============================================================================
// Landing-page version.
//
// The section is intentionally compact:
//   1. How much information is actually needed?
//   2. Does the signal survive outside ADNI?
//   3. From prediction to enrichment
//
// Detailed methodology, tables, papers, and validation results live on
// dedicated pages. The landing page shows the research arc, not the archive.
//
// Card 1: ADNI modality comparison / forest plot
// Card 2: External validation / calibration figure
// Card 3: A+T+ classifier / operating points
//
// Alzheimer's disease is presented as the current application case for
// Clinovia's broader data-driven trial-enrichment approach.

const CARDS = [
  {
    number: "01",
    eyebrow: "Research question",
    title: "How much information is actually needed?",
    description:
      "We compared clinical, cognitive, imaging, genetic, and fluid biomarkers to identify where the predictive signal actually comes from.",
    image: {
      src: "/images/comparison_forest_plot_auc.png",
      alt:
        "Forest plot comparing out-of-fold AUC across clinical, genetic, fluid biomarker, imaging, cognitive, and multimodal models.",
      width: 2073,
      height: 1673,
    },
    link: {
      label: "Explore the research",
      href: "/papers",
    },
    icon: FileText,
  },
  {
    number: "02",
    eyebrow: "External validation",
    title: "Does the signal survive outside ADNI?",
    description:
      "The progression model was frozen in ADNI and applied unchanged to independent NACC and OASIS-3 cohorts.",
    image: {
      src: "/images/external_validation_calibration.png",
      alt:
        "Calibration plots comparing predicted and observed 24-month progression risk across ADNI, NACC, and OASIS-3.",
      width: 2400,
      height: 780,
    },
    link: {
      label: "View external validation",
      href: "/validation",
    },
    icon: ArrowRight,
  },
  {
    number: "03",
    eyebrow: "From prediction to enrichment",
    title: "An Alzheimer's disease example",
    description:
      "The A+T+ classifier shows how a predictive model can become an explicit screening operating point for trial enrichment.",
    table: [
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
    ],
    link: {
      label: "See the enrichment approach",
      href: "/enrichment",
    },
    icon: ArrowRight,
  },
];

export default function Research() {
  return (
    <section id="research" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* ----------------------------------------------------------------
            Heading
        ---------------------------------------------------------------- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-700">
            Data-Driven ML Research · Alzheimer&apos;s Disease Case
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            How much information does trial enrichment actually need?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            We use Alzheimer&apos;s disease as a research case for a broader
            question: how can data-driven models improve trial enrichment
            without adding unnecessary screening burden?
          </p>
        </div>

        {/* ----------------------------------------------------------------
            Three-card research arc
        ---------------------------------------------------------------- */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.number}
                className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-stone-100"
              >
                {/* Card header */}
                <div className="p-6 pb-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.15em] text-slate-400">
                      {card.number}
                    </span>

                    <span className="font-mono text-[10px] uppercase tracking-wide text-teal-700">
                      {card.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-xl leading-snug text-slate-900">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                </div>

                {/* --------------------------------------------------------
                    Visual
                -------------------------------------------------------- */}
                {card.image && (
                  <div className="mx-5 overflow-hidden rounded-md border border-slate-200 bg-white">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      width={card.image.width}
                      height={card.image.height}
                      className="h-auto w-full"
                      sizes="(min-width: 1024px) 30vw, 100vw"
                    />
                  </div>
                )}

                {/* --------------------------------------------------------
                    A+T+ operating-point table
                -------------------------------------------------------- */}
                {card.table && (
                  <div className="mx-5 overflow-hidden rounded-md border border-slate-200 bg-white">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="px-3 py-2.5 font-mono text-[9px] uppercase tracking-wide text-slate-400">
                            Target
                          </th>
                          <th className="px-3 py-2.5 text-right font-mono text-[9px] uppercase tracking-wide text-slate-400">
                            Sens.
                          </th>
                          <th className="px-3 py-2.5 text-right font-mono text-[9px] uppercase tracking-wide text-slate-400">
                            Spec.
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {card.table.map((row, index) => (
                          <tr
                            key={row.target}
                            className={
                              index !== card.table!.length - 1
                                ? "border-b border-slate-100"
                                : ""
                            }
                          >
                            <td className="px-3 py-2.5">
                              <div className="font-mono text-xs text-slate-900">
                                {row.target}
                              </div>
                              <div className="mt-0.5 font-mono text-[9px] text-slate-400">
                                threshold {row.threshold}
                              </div>
                            </td>

                            <td className="px-3 py-2.5 text-right font-mono text-xs tabular-nums text-slate-700">
                              {row.sensitivity}
                            </td>

                            <td className="px-3 py-2.5 text-right font-mono text-xs tabular-nums text-slate-700">
                              {row.specificity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* --------------------------------------------------------
                    Footer link
                -------------------------------------------------------- */}
                <div className="mt-auto p-6 pt-5">
                  <Link
                    href={card.link.href}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-teal-700 hover:text-teal-800"
                  >
                    {card.link.label}
                    <Icon
                      className="h-3.5 w-3.5"
                      strokeWidth={1.75}
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* ----------------------------------------------------------------
            Quiet platform-level statement
        ---------------------------------------------------------------- */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-slate-400">
          Alzheimer&apos;s disease is Clinovia&apos;s current application
          case. The underlying approach is designed for data-driven candidate
          enrichment across clinical trial programs.
        </p>
      </div>
    </section>
  );
}

