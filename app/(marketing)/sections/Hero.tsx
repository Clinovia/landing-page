import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/alzheimer.jpg"
        alt="Clinician reviewing brain imaging"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center animate-fadeIn">
        <div className="mt-20 max-w-3xl space-y-6 md:mt-32">
          {/* Badge */}
          <p className="inline-block rounded-full border border-green-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-green-400">
            Research Use Only · ADNI Validated
          </p>

          {/* Headline */}
          <h1 className="text-5xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl">
            24-Month MCI-to-Alzheimer&apos;s
            <span className="mt-1 block text-green-400">
              Risk Prediction
            </span>
          </h1>

          {/* Supporting text */}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
            Clinovia helps clinicians stratify 24-month Alzheimer&apos;s
            progression risk at first contact using routine cognitive and
            demographic data.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              "AUC 0.91",
              "4 Routine Inputs",
              "24-Month Prediction",
              "ADNI Validated",
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
              >
                {label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/signup"
              className="inline-block rounded-full bg-green-700 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-800"
            >
              Try MCI Screening
            </Link>

            <Link
              href="#platform"
              className="text-base font-medium text-white/80 underline underline-offset-4 transition-colors hover:text-white"
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-12 max-w-2xl text-center text-xs text-gray-400">
        Research Use Only. Not approved for clinical diagnosis or treatment decisions.
        </p>
      </div>
    </section>
  );
}