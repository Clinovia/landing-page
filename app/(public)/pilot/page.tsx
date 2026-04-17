"use client";

import { useState } from "react";
import Link from "next/link";

type Specialty = "neurology" | "cardiology";

const content = {
  neurology: {
    label: "Memory & Neurology",
    tagline: "AI-assisted Alzheimer's screening and prognosis for memory clinics and neurology practices.",
    heroDetail: "We are onboarding a small number of memory clinics and neurology practices to integrate cognitive screening and diagnostic support into real patient workflows.",
    tools: [
      {
        name: "Cognitive Screening",
        desc: "Rapid Alzheimer's risk screening across your patient population — no prior diagnosis required.",
      },
      {
        name: "Diagnostic Support",
        desc: "Basic and extended diagnosis models using structured clinical data to support clinician decision-making.",
      },
      {
        name: "2-Year Prognosis",
        desc: "Prognosis modeling to support care planning and early intervention conversations.",
      },
      {
        name: "Structured PDF Reports",
        desc: "Automatically generated clinical summaries ready for documentation and care coordination.",
      },
    ],
    successMetrics: [
      "Number of patients screened over 60 days",
      "Time saved per assessment vs. current workflow",
      "Clinician confidence score (simple end-of-pilot survey)",
    ],
    idealFor: [
      "Memory clinics evaluating AI-assisted screening workflows",
      "Neurology practices with high cognitive assessment volume",
      "Clinicians looking to reduce documentation burden",
      "Practices preparing for early intervention programs",
    ],
    accentColor: "indigo",
    pilotFee: "$4,000 – $8,000",
  },
  cardiology: {
    label: "Cardiology",
    tagline: "AI-assisted cardiovascular risk stratification and clinical decision support for cardiology practices.",
    heroDetail: "We are onboarding a small number of cardiology clinics and preventive care teams to integrate risk stratification tools into real patient workflows.",
    tools: [
      {
        name: "ASCVD Risk Scoring",
        desc: "Automated 10-year cardiovascular risk calculation integrated directly into your assessment workflow.",
      },
      {
        name: "Blood Pressure Categorization",
        desc: "Consistent, guideline-aligned BP classification to support documentation and treatment decisions.",
      },
      {
        name: "CHA₂DS₂-VASc Scoring",
        desc: "Stroke risk scoring for atrial fibrillation patients, with structured output for clinical notes.",
      },
      {
        name: "Structured PDF Reports",
        desc: "Automatically generated clinical summaries ready for documentation, referrals, and care coordination.",
      },
    ],
    successMetrics: [
      "Number of risk assessments completed over 60 days",
      "Reduction in manual calculation time per patient",
      "Report accuracy vs. clinician manual scoring (spot-check audit)",
    ],
    idealFor: [
      "Cardiology practices with high preventive care volume",
      "Preventive cardiology teams managing complex risk panels",
      "Clinicians looking to standardize risk documentation",
      "Practices interested in structured quality reporting",
    ],
    accentColor: "rose",
    pilotFee: "$3,000 – $6,000",
  },
};

const accentStyles = {
  indigo: {
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    activeTab: "bg-emerald-700 text-white",
    inactiveTab: "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    ctaBtn: "bg-emerald-700 hover:bg-emerald-800 text-white",
    highlight: "bg-emerald-50 border-emerald-200",
    bullet: "bg-emerald-500",
    divider: "border-emerald-100",
    stepNum: "bg-emerald-100 text-emerald-700",
  },
  rose: {
    badge: "bg-teal-50 text-teal-700 border border-teal-200",
    activeTab: "bg-teal-700 text-white",
    inactiveTab: "text-gray-600 hover:text-teal-700 hover:bg-teal-50",
    iconBg: "bg-teal-50",
    iconText: "text-teal-600",
    ctaBtn: "bg-teal-700 hover:bg-teal-800 text-white",
    highlight: "bg-teal-50 border-teal-200",
    bullet: "bg-teal-500",
    divider: "border-teal-100",
    stepNum: "bg-teal-100 text-teal-700",
  },
};

const icons = {
  neurology: {
    "Cognitive Screening": (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    "Diagnostic Support": (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75" />
      </svg>
    ),
    "2-Year Prognosis": (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    "Structured PDF Reports": (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  cardiology: {
    "ASCVD Risk Scoring": (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    "Blood Pressure Categorization": (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    "CHA₂DS₂-VASc Scoring": (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    "Structured PDF Reports": (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
};

export default function PilotPage() {
  const [specialty, setSpecialty] = useState<Specialty>("neurology");
  const c = content[specialty];
  const s = accentStyles[c.accentColor as keyof typeof accentStyles];
  const toolIcons = icons[specialty];

  return (
    <div className="min-h-screen bg-white mt-8">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Specialty toggle */}
        <div className="flex justify-center mb-14">
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
            {(["neurology", "cardiology"] as Specialty[]).map((sp) => (
              <button
                key={sp}
                onClick={() => setSpecialty(sp)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  specialty === sp ? s.activeTab : accentStyles[content[sp].accentColor as keyof typeof accentStyles].inactiveTab
                }`}
              >
                {content[sp].label}
              </button>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="mb-16">
          <div className="mb-4">
            <span className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${s.badge}`}>
              Pilot Program · Limited Availability
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-5 mt-4">
            Clinovia for {c.label} Clinics
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-3">
            {c.tagline}
          </p>
          <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
            {c.heroDetail}
          </p>
        </div>

        {/* Not a trial callout */}
        <div className={`border rounded-2xl p-7 mb-16 ${s.highlight}`}>
          <p className="text-gray-800 font-semibold text-lg mb-3">This is not a software trial.</p>
          <p className="text-gray-600 leading-relaxed">
            Our pilot is a structured 60-day engagement — scoped to a defined patient cohort,
            with agreed success criteria before we begin. You'll work directly with our team,
            and at the end of the pilot we'll review the results together and decide if a
            full engagement makes sense. No ambiguity, no pressure.
          </p>
        </div>

        {/* Tools */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What's included</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.tools.map((tool) => (
              <div key={tool.name} className="border border-gray-100 rounded-xl p-5 bg-white hover:border-gray-200 transition-colors">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${s.iconBg} ${s.iconText}`}>
                  {toolIcons[tool.name as keyof typeof toolIcons]}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">{tool.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pilot structure */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">How the pilot works</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "We define success together",
                desc: "Before the pilot starts, we agree on 2–3 measurable outcomes and a target patient cohort. If we can't define what success looks like, we don't start.",
              },
              {
                step: "2",
                title: "60-day structured engagement",
                desc: "Your team uses Clinovia with real patients. We provide direct support throughout. A mid-pilot check-in at day 30 gives us a chance to course-correct early.",
              },
              {
                step: "3",
                title: "Results review and decision",
                desc: "At the end of the pilot, we review the outcomes against the criteria we agreed on. We either move to a full contract — with the pilot fee credited — or we part ways cleanly.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s.stepNum}`}>
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success metrics */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-2">How we define success</h2>
          <p className="text-gray-500 text-sm mb-5">
            These are the metrics we use as a starting point. We finalize them with you before the pilot begins.
          </p>
          <ul className="space-y-3">
            {c.successMetrics.map((m) => (
              <li key={m} className="flex items-start gap-3">
                <span className={`mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full ${s.bullet}`} />
                <span className="text-gray-700 text-sm">{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ideal for */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Who this is for</h2>
          <ul className="space-y-3">
            {c.idealFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className={`mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full ${s.bullet}`} />
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className={`border rounded-2xl p-7 mb-16 ${s.highlight}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Pilot investment</p>
              <p className="text-3xl font-bold text-gray-900">{c.pilotFee}</p>
              <p className="text-sm text-gray-500 mt-1">Flat fee · 60 days · Credited toward Year 1 contract</p>
            </div>
            <div className="text-sm text-gray-600 max-w-xs">
              Final pricing is tailored based on clinic size and patient volume.
              We'll confirm the exact fee before you commit to anything.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-gray-100 pt-14">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-3">
            We are onboarding a limited number of clinics
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to run a pilot with your clinic?
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Start with a 20-minute walkthrough. We'll show you the tool with
            example patient data and answer any clinical or technical questions.
          </p>
          <Link
            href="/apply"
            className={`inline-block px-10 py-4 rounded-xl text-base font-semibold transition-colors ${s.ctaBtn}`}
          >
            Schedule a 20-Minute Walkthrough
          </Link>
          <p className="mt-4 text-xs text-gray-400">
            No commitment required. Pick a time that works — we'll confirm within one business day.
          </p>
        </div>

      </div>
    </div>
  );
}