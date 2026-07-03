"use client";

import { createContext, useContext, useState } from "react";
import {
  MCIScreeningOutput,
} from "@/features/mci-screening/types";

/* -------------------------------------
 * Types
 * ----------------------------------- */
interface MCIScreeningResultsState {
  mciScreening?: MCIScreeningOutput;
}

interface MCIScreeningResultsContextType extends MCIScreeningResultsState {
  setMCIScreening: (result: MCIScreeningOutput) => void;
  resetMCIScreening: () => void;
  resetAll: () => void;
}

/* -------------------------------------
 * Context
 * ----------------------------------- */
const MCIScreeningResultsContext =
  createContext<MCIScreeningResultsContextType | null>(null);

/* -------------------------------------
 * Provider
 * ----------------------------------- */
export function MCIScreeningResultsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mciScreening, setMCIScreeningState] =
    useState<MCIScreeningOutput>();

  /* -------------------------------------
   * Setters
   * ----------------------------------- */
  const setMCIScreening = (
    result: MCIScreeningOutput
  ) => {
    setMCIScreeningState(result);
  };

  /* -------------------------------------
   * Resets
   * ----------------------------------- */
  const resetMCIScreening = () => {
    setMCIScreeningState(undefined);
  };

  const resetAll = () => {
    resetMCIScreening();
  };

  /* -------------------------------------
   * Context value
   * ----------------------------------- */
  const value: MCIScreeningResultsContextType = {
    mciScreening,
    setMCIScreening,
    resetMCIScreening,
    resetAll,
  };

  return (
    <MCIScreeningResultsContext.Provider value={value}>
      {children}
    </MCIScreeningResultsContext.Provider>
  );
}

/* -------------------------------------
 * Hook
 * ----------------------------------- */
export function useMCIScreeningResults() {
  const ctx = useContext(MCIScreeningResultsContext);

  if (!ctx) {
    throw new Error(
      "useMCIScreeningResults must be used within MCIScreeningResultsProvider"
    );
  }

  return ctx;
}