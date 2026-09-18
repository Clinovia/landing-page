// frontend/app/(marketing)/page.tsx

import Hero from "./sections/Hero";
import TheProblem from "./sections/TheProblem";
import TrialEnrichmentAgent from "./sections/TrialEnrichmentAgent";
import CSFPrescreening from "./sections/CSFPrescreening";
import ModelToolkit from "./sections/ModelToolkit";
import ExternalValidation from "./sections/ExternalValidation";
import ExampleReport from "./sections/ExampleReport";
import Pilot from "./sections/Pilot";

export default function HomePage() {
  return (
    <main className="bg-stone-50 text-slate-900">
      <Hero />
      <TheProblem />
      <TrialEnrichmentAgent />
      <CSFPrescreening />
      <ModelToolkit />
      <ExternalValidation />
      <ExampleReport />
      <Pilot />
    </main>
  );
}