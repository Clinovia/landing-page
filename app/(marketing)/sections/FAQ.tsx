"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// =============================================================================
// Trial Enrichment Agent FAQ
// =============================================================================
// The FAQ is written for CROs, sponsors, and clinical-trial teams.
// It describes the Agent as a research-use workflow for cohort
// stratification and enrichment, rather than as a diagnostic product.
//
// Avoids:
// - "pilot" language
// - patient-facing clinical language
// - implying diagnosis
// - implying that confirmatory biomarkers are predicted with certainty
//
// The Agent uses validated statistical models to prioritize candidates
// for downstream testing or trial procedures. Confirmatory testing remains
// the responsibility of the trial protocol.

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What does the Trial Enrichment Agent do?",
    answer:
      "The Trial Enrichment Agent analyzes candidate-level clinical and cognitive data to stratify a trial population by modeled progression or biomarker risk. It helps trial teams prioritize candidates for downstream screening, confirmatory testing, or other protocol-defined procedures.",
  },
  {
    question: "What data does the Agent need?",
    answer:
      "The required inputs depend on the model and trial objective. For the current Alzheimer's disease use cases, models can use variables such as age, sex, MMSE, RAVLT, and LIMM. MRI and other biomarkers can be incorporated when the relevant validated model supports them.",
  },
  {
    question: "Do I need MRI or CSF data?",
    answer:
      "Not necessarily. Clinovia includes models designed to work with clinical and cognitive information before expensive or invasive biomarker testing. MRI, CSF, PET, or other biomarkers can be used when they are already available or when a particular trial workflow calls for them.",
  },
  {
    question: "Can the Agent work with an existing candidate dataset?",
    answer:
      "Yes. The Agent is designed to work with existing trial or screening datasets. Variables are mapped to the required model inputs, missingness is handled according to the prespecified model pipeline, and candidates are scored without refitting the model to the submitted cohort.",
  },
  {
    question: "What does the Agent produce?",
    answer:
      "The Agent produces candidate-level risk estimates and cohort-level enrichment outputs based on the selected model. These can be used to prioritize candidates for downstream screening or confirmatory procedures. The exact output format can be adapted to the trial workflow.",
  },
  {
    question: "How are recommendations generated?",
    answer:
      "Recommendations are based on prespecified statistical models and frozen operating thresholds established during model development. The Agent does not independently diagnose disease or replace protocol-defined clinical or biomarker confirmation.",
  },
  {
    question: "Can I use the Agent for retrospective validation?",
    answer:
      "Yes. Historical datasets can be used to evaluate model performance in an independent cohort. For external validation, the model and operating thresholds can be transported without refitting, recalibration, or threshold optimization on the validation cohort.",
  },
  {
    question: "Is the Agent a diagnostic tool?",
    answer:
      "No. Clinovia is intended for Research Use Only and is not a diagnostic device. Its outputs are statistical risk estimates intended to support research and trial-enrichment workflows, not clinical diagnosis.",
  },
  {
    question: "Can the Agent be adapted to a specific trial?",
    answer:
      "Yes. The enrichment workflow can be configured around the population, available variables, endpoint, and screening workflow of a particular study. Model selection and any new model development or validation are handled separately from the frozen models used for external validation.",
  },
  {
    question: "How do we work with Clinovia?",
    answer:
      "Tell us about the trial population, screening workflow, and data you already have. We can determine which existing models and enrichment workflows are applicable and what additional validation may be appropriate."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-stone-100 px-6 py-24">
      <div className="mx-auto max-w-2xl">

        {/* Section heading */}
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Trial Enrichment Agent
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Questions trial teams ask first
          </h2>
        </div>

        {/* Accordion */}
        <div className="mt-14 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {FAQS.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={question}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-slate-900">
                    {question}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.75}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

