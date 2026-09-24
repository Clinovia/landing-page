// frontend/app/(marketing)/page.tsx

import Hero from "./sections/Hero";
import TheProblem from "./sections/TheProblem";
import TrialEnrichmentAgent from "./sections/TrialEnrichmentAgent";
import ExampleReport from "./sections/ExampleReport";
import TwoAxisPrescreening from "./sections/TwoAxisPrescreening";
import Research from "./sections/Research";
import FAQ from "./sections/FAQ";

export default function HomePage() {
  return (
    <main className="bg-stone-50 text-slate-900">
      <Hero />
      <TheProblem />
      <TrialEnrichmentAgent />
      <ExampleReport />
      <TwoAxisPrescreening />
      <Research />
      <FAQ />
    </main>
  );
}