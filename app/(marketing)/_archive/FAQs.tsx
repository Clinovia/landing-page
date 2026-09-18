"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// =============================================================================
// Design notes
// =============================================================================
// Background continues the rhythm: PilotProgram (white) → here (stone-50).
// Plain accordion, no icons per question — this section's job is to be
// scannable and quick to resolve, not another opportunity for visual
// flourish.
//
// One question ("How are recommendations generated?") is still flagged
// 🔶 — its answer depends on the regulatory framing decision for the
// "Recommendation" field (see ExampleReport.tsx, Why.tsx) that hasn't
// been made yet. Left as an honest placeholder rather than invented.
//
// Added one question not in the original FAQ list — "What does this
// cost?" — since Pricing (section 9) is intentionally not built yet per
// the human's decision to wait for a few paid pilots. A visitor reaching
// FAQ without ever seeing a pricing section will likely still ask this;
// better to answer it honestly here than leave a visible gap.

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do I need MRI?",
    answer:
      "No. MMSE plus one memory test (RAVLT or LIMM) is enough to generate a risk estimate. MRI improves accuracy when available.",
  },
  {
    question: "Which cognitive tests are required?",
    answer:
      "MMSE is required. You need at least one of RAVLT Immediate Recall or LIMM Total — both is best, but either alone works.",
  },
  {
    question: "Can I use LIMM instead of RAVLT?",
    answer:
      "Yes. Clinovia automatically applies whichever validated model matches the data you provide.",
  },
  {
    question: "How are recommendations generated?",
    answer:
      "We're finalizing how this is worded and presented — check back shortly, or contact us for details in the meantime.",
  },
  {
    question: "Is this a diagnostic tool?",
    answer:
      "No. Clinovia is intended for Research Use Only and does not diagnose Alzheimer's disease. It estimates statistical risk of progression to support clinical judgment, not replace it.",
  },
  {
    question: "Can I upload historical patients?",
    answer:
      "Yes — this is a common way to use Clinovia during a pilot. See Retrospective Validation under the Pilot Program.",
  },
  {
    question: "What does this cost?",
    answer:
      "We're currently running paid pilots with early partners rather than publishing self-serve pricing. Request a pilot and we'll talk through what fits your organization.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-stone-50 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        {/* Section heading */}
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            FAQ
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Questions clinicians ask first
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
                  onClick={() => setOpenIndex(isOpen ? null : index)}
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