// frontend/context/RiskAssessmentContext.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type {
  RiskAssessmentOutput,
} from "@/features/risk-assessment";

/* -------------------------------------
 * Types
 * ----------------------------------- */

interface RiskAssessmentState {
  riskAssessment?: RiskAssessmentOutput;
}

interface RiskAssessmentContextType
  extends RiskAssessmentState {
  setRiskAssessment: (
    result: RiskAssessmentOutput
  ) => void;

  resetRiskAssessment: () => void;

  resetAll: () => void;
}

/* -------------------------------------
 * Context
 * ----------------------------------- */

const RiskAssessmentContext =
  createContext<RiskAssessmentContextType | null>(
    null
  );

/* -------------------------------------
 * Provider
 * ----------------------------------- */

export function RiskAssessmentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    riskAssessment,
    setRiskAssessmentState,
  ] = useState<RiskAssessmentOutput>();

  /* -------------------------------------
   * Setters
   * ----------------------------------- */

  const setRiskAssessment = (
    result: RiskAssessmentOutput
  ) => {
    setRiskAssessmentState(result);
  };

  /* -------------------------------------
   * Resets
   * ----------------------------------- */

  const resetRiskAssessment = () => {
    setRiskAssessmentState(undefined);
  };

  const resetAll = () => {
    resetRiskAssessment();
  };

  /* -------------------------------------
   * Context value
   * ----------------------------------- */

  const value: RiskAssessmentContextType = {
    riskAssessment,
    setRiskAssessment,
    resetRiskAssessment,
    resetAll,
  };

  return (
    <RiskAssessmentContext.Provider value={value}>
      {children}
    </RiskAssessmentContext.Provider>
  );
}

/* -------------------------------------
 * Hook
 * ----------------------------------- */

export function useRiskAssessment() {
  const ctx = useContext(
    RiskAssessmentContext
  );

  if (!ctx) {
    throw new Error(
      "useRiskAssessment must be used within RiskAssessmentProvider"
    );
  }

  return ctx;
}