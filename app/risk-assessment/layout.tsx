// frontend/app/risk-assessment/layout.tsx

import type { ReactNode } from "react";

import Topbar from "@/components/layout/Topbar";
import { RiskAssessmentProvider } from "@/context/RiskAssessmentContext";

export default function RiskAssessmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RiskAssessmentProvider>
      <div className="min-h-screen bg-stone-50">
        <Topbar />

        <main className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </main>
      </div>
    </RiskAssessmentProvider>
  );
}