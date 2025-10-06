// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/ai_doctor.png"
          alt="AI Doctor"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay: Dark gradient */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Accelerating Clinical Insights with AI
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-3xl">
          Clinovia.ai delivers validated AI models to stratify patient risk, 
          predict disease progression, and optimize clinical trial design—helping CROs, 
          pharma, and clinicians reduce screen failure, accelerate enrollment, and enable earlier intervention.
        </p>
      </div>
    </section>
  );
}
