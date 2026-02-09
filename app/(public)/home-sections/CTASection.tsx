import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 bg-green-800 text-white w-full">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to explore Clinovia.ai?
        </h2>
        <p className="mb-8 text-lg md:text-xl">
          Early access is free for February — join researchers and clinical teams testing our neurology and cardiology tools.
        </p>
        <Link
          href="/explore"
          className="inline-block bg-white text-green-800 font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition-transform hover:scale-105"
        >
          Request Early Access
        </Link>
      </div>
    </section>
  );
}
