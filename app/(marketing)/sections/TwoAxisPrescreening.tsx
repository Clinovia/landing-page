"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// =============================================================================
// Example application: Alzheimer's disease
// =============================================================================
// This section demonstrates one current Clinovia application in Alzheimer's
// disease clinical trials. The platform itself is designed for broader
// clinical-trial enrichment workflows; Alzheimer's disease is the initial
// validated application shown here.
//
// The two cards represent independent enrichment axes:
//   - 24-Month Progression: externally validated on NACC + OASIS-3
//   - A+T+ Biomarker Enrichment: developed and internally validated on ADNI;
//     external validation is underway
//
// Do not imply that the two models share the same feature set or validation
// status.
//
// Per product guidance, specific AUC/sensitivity/specificity figures are not
// shown here. Full quantitative results belong in the Research section.
//
// Bar widths and the progression score below are illustrative sample values,
// not live predictions.

const PROGRESSION_INPUTS = "Age · Sex · MMSE · RAVLT · LDELTOTAL";
const BIOMARKER_INPUTS = "Age · Sex · MMSE · RAVLT · LDELTOTAL";

const PROGRESSION_VALIDATION =
  "A simpler model with Age · Sex · MMSE externally validated on independent NACC and OASIS-3 cohorts.";

const BIOMARKER_VALIDATION =
  "Developed and internally validated on ADNI. External validation is underway.";

const AT_N_CATEGORIES = [
  { label: "A+T+", value: 61 },
  { label: "A+", value: 22 },
  { label: "A-T-", value: 12 },
  { label: "A-", value: 5 },
];

const PROGRESSION_SCORE = 0.58;

// =============================================================================
// Shared pieces
// =============================================================================

function Bar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-stone-100 ${className}`}>
      <div
        className="h-full rounded-full bg-teal-600"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 font-mono text-xs text-slate-600">
        {label}
      </span>
      <Bar value={value} className="flex-1" />
      <span className="w-10 shrink-0 text-right font-mono text-xs text-slate-500">
        {value}%
      </span>
    </div>
  );
}

function CardSection({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
        {eyebrow}
      </p>
      {children}
    </div>
  );
}

function ValidationNote({ children }: { children: ReactNode }) {
  return (
    <CardSection eyebrow="Validation">
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{children}</p>
    </CardSection>
  );
}

function ModelCard({
  title,
  inputs,
  validation,
  children,
}: {
  title: string;
  inputs: string;
  validation: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <p className="font-mono text-[11px] uppercase tracking-wide text-teal-700">
        {title}
      </p>

      <p className="mt-1 text-sm text-slate-700">{inputs}</p>

      {children}

      <ValidationNote>{validation}</ValidationNote>
    </div>
  );
}

// =============================================================================
// Section
// =============================================================================

export default function TwoAxisPrescreening() {
  return (
    <section id="prescreening" className="bg-stone-100 px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
            Example Application · Alzheimer&apos;s Disease
          </p>

          <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
            Two enrichment axes before confirmatory testing
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            In Alzheimer&apos;s disease trials, Clinovia can estimate
            progression risk and biomarker status from baseline clinical and
            cognitive data before expensive imaging or CSF confirmation.
          </p>
        </div>

        {/* Two cards */}
        <div className="mx-auto mt-16 grid gap-6 lg:grid-cols-2">

          <ModelCard
            title="24-Month Progression"
            inputs={PROGRESSION_INPUTS}
            validation={PROGRESSION_VALIDATION}
          >
            <CardSection eyebrow="Predicted Progression Risk">
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-4xl text-slate-900">
                  {Math.round(PROGRESSION_SCORE * 100)}%
                </span>

                <span className="font-mono text-xs uppercase tracking-wide text-slate-400">
                  likelihood of decline within 24 months
                </span>
              </div>

              <Bar value={PROGRESSION_SCORE * 100} className="mt-4" />
            </CardSection>
          </ModelCard>

          <ModelCard
            title="A+T+ Biomarker Enrichment"
            inputs={BIOMARKER_INPUTS}
            validation={BIOMARKER_VALIDATION}
          >
            <CardSection eyebrow="Estimated AT(N) Status">
              <div className="mt-4 space-y-3">
                {AT_N_CATEGORIES.map(({ label, value }) => (
                  <ScoreRow key={label} label={label} value={value} />
                ))}
              </div>
            </CardSection>
          </ModelCard>

        </div>

        {/* Shared note */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          These are independent enrichment signals. The agent does not combine
          them into a single clinical score; trial teams can use the signals
          according to their protocol and confirm eligibility with the
          appropriate biomarker or clinical assessments.
        </p>

        <div className="mt-6 text-center">
          <Link
            href="#research"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-teal-700 hover:text-teal-800"
          >
            Read the Methodology
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-xs text-slate-400">
          Illustrative example. For Research Use Only. Not a diagnostic device.
        </p>

      </div>
    </section>
  );
}

