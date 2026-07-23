// frontend/app/(marketing)/collaborate/page.tsx
"use client";

import { Microscope, Database, FileCheck2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// =============================================================================
// Design notes
// =============================================================================
// Deliberately lighter than /pilot: no editions, no pricing, no toggle.
// The audience here isn't a paying customer evaluating a product — it's
// a research/academic partner deciding whether to share cohort data for
// external validation. Pricing language would be tone-deaf to this
// audience; the ask here is scientific credibility (co-authorship, data
// governance clarity), not a subscription decision.
//
// Styled consistently with the rest of the site: serif headline, mono
// uppercase eyebrow/labels, single teal accent, lucide icons in the same
// icon-in-circle treatment as Why.tsx / DesignedForClinics.tsx.
//
// Exists specifically to give Validation.tsx's "External Validation:
// NACC, OASIS-3 — in progress" line somewhere concrete to send an
// interested reader — that line names a gap; this page is the way to
// act on it.

const LOOKING_FOR = [
  {
    icon: Database,
    title: "Independent cohort data",
    desc: "Institutions with MCI progression data — age, sex, MMSE, and RAVLT- or LIMM-equivalent memory testing. MRI measures are a plus, not a requirement.",
  },
  {
    icon: Microscope,
    title: "Real-world, not research-only, populations",
    desc: "Cohorts with different demographics and recruitment than ADNI are the most valuable kind of validation, not the least.",
  },
];

const HOW_IT_WORKS = [
  {
    icon: FileCheck2,
    title: "A clear data use agreement",
    desc: "No cost to your institution. We work within whatever governance and IRB requirements your data already operates under.",
  },
  {
    icon: Users,
    title: "Shared results, shared authorship",
    desc: "Our pre-trained models are evaluated against your held-out data. Results are shared jointly, with co-authorship on any resulting publication.",
  },
];

export default function CollaboratePage() {
  const mailtoHref = `mailto:sophchoe@gmail.com?subject=${encodeURIComponent(
    "External Validation / Research Collaboration"
  )}&body=${encodeURIComponent(
    "Hi Sophie,\n\nI'm interested in discussing an external validation or research collaboration with Clinovia.\n\nInstitution:\nBrief description of available cohort data:\nBest times for a call:\n\n"
  )}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* -----------------------------------------------------------
            Hero
        ----------------------------------------------------------- */}
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            External Validation & Research Collaboration
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-slate-900">
            Help us validate Clinovia beyond ADNI
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Our models are cross-validated on ADNI, but ADNI participants
            don&rsquo;t represent the full population clinicians see day
            to day. We&rsquo;re looking for research partners with
            independent cohort data to test how well that holds up
            outside ADNI.
          </p>
        </div>

        {/* -----------------------------------------------------------
            What we're looking for
        ----------------------------------------------------------- */}
        <div className="mb-14">
          <h2 className="mb-6 font-serif text-2xl text-slate-900">
            What we&rsquo;re looking for
          </h2>

          <div className="space-y-5">
            {LOOKING_FOR.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-stone-50 text-teal-700">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------
            How collaboration works
        ----------------------------------------------------------- */}
        <div className="mb-14">
          <h2 className="mb-6 font-serif text-2xl text-slate-900">
            How collaboration works
          </h2>

          <div className="space-y-5">
            {HOW_IT_WORKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-stone-50 text-teal-700">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------
            Why now
        ----------------------------------------------------------- */}
        <div className="mb-14 rounded-lg border border-slate-200 bg-stone-50 p-7">
          <p className="mb-2 text-sm font-semibold text-slate-900">
            Why we&rsquo;re asking now
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            Our validation page states plainly that external validation
            on NACC and OASIS-3 is in progress. We&rsquo;d rather say
            that honestly than overstate what we&rsquo;ve confirmed so
            far — and we&rsquo;re actively looking for partners to help
            close that gap.
          </p>
        </div>

        {/* -----------------------------------------------------------
            CTA
        ----------------------------------------------------------- */}
        <div className="border-t border-slate-200 pt-14 text-center">
          <h3 className="mb-3 font-serif text-2xl text-slate-900">
            Interested in collaborating?
          </h3>

          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-slate-500">
            Tell us a bit about your cohort data and we&rsquo;ll set up a
            time to talk through what a collaboration could look like.
          </p>

          <Button
            size="lg"
            className="bg-teal-700 text-white hover:bg-teal-800"
            asChild
          >
            <a href={mailtoHref}>Propose a Collaboration</a>
          </Button>
        </div>
      </div>
    </div>
  );
}