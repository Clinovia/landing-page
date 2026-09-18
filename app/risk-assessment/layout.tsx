// frontend/app/risk-assessment/layout.tsx

import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import { RiskAssessmentProvider } from "@/context/RiskAssessmentContext";

export default function RiskAssessmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RiskAssessmentProvider>
      <div className="min-h-screen bg-stone-50">
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </main>
      </div>
    </RiskAssessmentProvider>
  );
}

