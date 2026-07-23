import Link from "next/link";

export default function CTASection() {
  return (
    <section id="cta" className="bg-slate-900 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-bold text-white">
          Ready to Explore Clinovia?
        </h2>

        <p className="mt-6 text-lg text-slate-300">
          We're looking for pilot clinics and research partners to bring
          first-contact MCI risk stratification into practice.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/pilot"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Apply for Pilot Access
          </Link>

          <Link
            href="/collaborate"
            className="inline-block rounded-full border border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Propose a Collaboration
          </Link>
        </div>
      </div>
    </section>
  );
}