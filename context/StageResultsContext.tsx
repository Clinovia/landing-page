"use client";

import { createContext, useContext, useState } from "react";

/* -------------------------------------
 * Import from feature types (NOT api)
 * ----------------------------------- */

import {
  Stage1ClinicalScreeningOutput,
} from "@/features/alzheimer/stage1/types";

import {
  Stage2aPlasmaModelOutput,
} from "@/features/alzheimer/stage2a/types";

import {
  Stage2bMRIGateOutput,
} from "@/features/alzheimer/stage2b/types";

/* -------------------------------------
 * Types
 * ----------------------------------- */

interface StageResultsState {
  stage1?: Stage1ClinicalScreeningOutput;
  stage2a?: Stage2aPlasmaModelOutput;
  stage2b?: Stage2bMRIGateOutput;
}

interface StageResultsContextType extends StageResultsState {
  setStage1: (result: Stage1ClinicalScreeningOutput) => void;
  setStage2a: (result: Stage2aPlasmaModelOutput) => void;
  setStage2b: (result: Stage2bMRIGateOutput) => void;

  resetStage1: () => void;
  resetStage2a: () => void;
  resetStage2b: () => void;

  resetAll: () => void;
}

/* -------------------------------------
 * Context
 * ----------------------------------- */

const StageResultsContext = createContext<StageResultsContextType | null>(null);

/* -------------------------------------
 * Provider
 * ----------------------------------- */

export function StageResultsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stage1, setStage1State] =
    useState<Stage1ClinicalScreeningOutput | undefined>();

  const [stage2a, setStage2aState] =
    useState<Stage2aPlasmaModelOutput | undefined>();

  const [stage2b, setStage2bState] =
    useState<Stage2bMRIGateOutput | undefined>();

  /* -------------------------------------
   * Setters
   * ----------------------------------- */

  const setStage1 = (result: Stage1ClinicalScreeningOutput) => {
    setStage1State(result);
  };

  const setStage2a = (result: Stage2aPlasmaModelOutput) => {
    setStage2aState(result);
  };

  const setStage2b = (result: Stage2bMRIGateOutput) => {
    setStage2bState(result);
  };

  /* -------------------------------------
   * Resets
   * ----------------------------------- */

  const resetStage1 = () => setStage1State(undefined);
  const resetStage2a = () => setStage2aState(undefined);
  const resetStage2b = () => setStage2bState(undefined);

  const resetAll = () => {
    setStage1State(undefined);
    setStage2aState(undefined);
    setStage2bState(undefined);
  };

  /* -------------------------------------
   * Value
   * ----------------------------------- */

  const value: StageResultsContextType = {
    stage1,
    stage2a,
    stage2b,

    setStage1,
    setStage2a,
    setStage2b,

    resetStage1,
    resetStage2a,
    resetStage2b,
    resetAll,
  };

  return (
    <StageResultsContext.Provider value={value}>
      {children}
    </StageResultsContext.Provider>
  );
}

/* -------------------------------------
 * Hook
 * ----------------------------------- */

export function useStageResults() {
  const ctx = useContext(StageResultsContext);

  if (!ctx) {
    throw new Error(
      "useStageResults must be used within StageResultsProvider"
    );
  }

  return ctx;
}