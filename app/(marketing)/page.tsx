// frontend/app/(marketing)/page.tsx

import Hero from "./sections/Hero";
import Why from "./sections/Why";
import Workflow from "./sections/Workflow";
import Inputs from "./sections/Inputs";
import ExampleReport from "./sections/ExampleReport";
import Validation from "./sections/Validation";
import MemoryClinics from "./sections/MemoryClinics";
import Pilot from "./sections/Pilot";
import FAQ from "./sections/FAQs";
import CTASection from "./sections/CTASection";

export default function HomePage() {
  return (
    <main className="bg-stone-50 text-slate-900">
      <Hero />
      <Why />
      <Workflow />
      <Inputs />
      <ExampleReport />
      <Validation />
      <MemoryClinics />
      <Pilot />
      <FAQ />
      <CTASection />
    </main>
  );
}