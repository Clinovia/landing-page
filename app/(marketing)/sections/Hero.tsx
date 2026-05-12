import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="Hero" className="relative w-full h-screen">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/alzheimer.jpg"
          alt="MCI due to Alzheimer's Disease Clinical Tool"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center animate-fadeIn">
        <div className="mt-20 md:mt-32 max-w-3xl space-y-6">

          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-green-400 border border-green-400/40 rounded-full px-4 py-1">
            ADNI-Validated · Research Use Only
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            MCI Due to Alzheimer's Disease
            <span className="block text-green-400 mt-1">Decision Support Tool</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            A multi-stage AI pipeline — clinical screening, parallel MRI neurodegeneration
            gating and plasma biomarker triage — built on ADNI data to stratify
            progression risk and guide next clinical steps.
          </p>

          {/* Stage badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
            {[
              "Stage 1 · Clinical Screening",
              "Stage 2a · Plasma Triage",
              "Stage 2b · MRI Gate",
            ].map((label) => (
              <span
                key={label}
                className="text-xs font-medium text-white/80 bg-white/10 border border-white/20 rounded-full px-3 py-1"
              >
                {label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/signup?redirect=/clinical/alzheimer"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition-transform hover:scale-105"
            >
              Start Assessment
            </Link>
            <Link
              href="/modules"
              className="inline-block text-white/80 hover:text-white font-medium text-base underline underline-offset-4 transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>

        <p className="absolute bottom-6 text-xs text-gray-400 max-w-xl mx-auto px-4">
          * This tool is intended for research purposes only and is not approved
          for clinical diagnosis or treatment decisions.
        </p>
      </div>
    </section>
  );
}