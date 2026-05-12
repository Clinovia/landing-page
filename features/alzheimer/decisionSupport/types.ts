/**
 * Decision Support Types (UI Layer)
 *
 * Clean separation:
 * - API types → raw backend outputs
 * - Derived types → computed clinical intelligence
 * - UI state → AsyncState<T>
 * - Component props → standardized base shape
 */

import type {
  Stage1Output,
  Stage2aOutput,
  Stage2bOutput,
  ClinicalSummary as ClinicalSummaryData,
  RiskStratification as RiskStratificationData,
  PathwayDecision as PathwayDecisionData,
  PetSimulation as PetSimulationData,
  PatientCommunication as PatientCommunicationData,
  UncertaintyResult as UncertaintyResultData,
  DecisionSupportInput,
} from "@/lib/api/alzheimer";

/* ──────────────────────────────────────────────
 * Re-export API types (RAW LAYER ONLY)
 * ────────────────────────────────────────────── */
export type {
  Stage1Output,
  Stage2aOutput,
  Stage2bOutput,
  DecisionSupportInput,
  ClinicalSummaryData,
  RiskStratificationData,
  PathwayDecisionData,
  PetSimulationData,
  PatientCommunicationData,
  UncertaintyResultData,
};

/* ──────────────────────────────────────────────
 * Shared UI unions (STRICT + NORMALIZED)
 * ────────────────────────────────────────────── */

/**
 * IMPORTANT:
 * This is UI-derived ONLY (NOT backend field)
 */
export type RiskLevel = "LOW" | "INTERMEDIATE" | "HIGH";

/* ──────────────────────────────────────────────
 * DERIVED CLINICAL MODELS (IMPORTANT FIX)
 * These DO NOT exist in backend directly
 * ────────────────────────────────────────────── */

export interface RiskStratificationDerived {
  risk_level: RiskLevel;
  probability?: number;
  confidence?: number;

  /**
   * Derived clinical recommendation
   * (computed from Stage1 + Stage2a + Stage2b)
   */
  recommendation: string;

  contributing_factors?: string[];
}

/* ──────────────────────────────────────────────
 * Aggregated upstream context
 * ────────────────────────────────────────────── */
export interface DecisionSupportContext {
  stage1?: Stage1Output;
  stage2a?: Stage2aOutput;
  stage2b?: Stage2bOutput;
}

/* ──────────────────────────────────────────────
 * Generic async state wrapper
 * ────────────────────────────────────────────── */
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

/* ──────────────────────────────────────────────
 * Hook return type
 * ────────────────────────────────────────────── */
export interface DecisionSupportHookReturn {
  summary: AsyncState<ClinicalSummaryData>;
  fetchSummary: () => Promise<void>;

  risk: AsyncState<RiskStratificationDerived>;
  fetchRisk: () => Promise<void>;

  pathway: AsyncState<PathwayDecisionData>;
  fetchPathway: () => Promise<void>;

  petSimulation: AsyncState<PetSimulationData>;
  fetchPetSimulation: () => Promise<void>;

  communication: AsyncState<PatientCommunicationData>;
  fetchCommunication: () => Promise<void>;

  uncertainty: AsyncState<UncertaintyResultData>;
  fetchUncertainty: () => Promise<void>;

  fetchAll: () => Promise<void>;
  isAnyLoading: boolean;
}

/* ──────────────────────────────────────────────
 * Base component props (DRY)
 * ────────────────────────────────────────────── */
export interface BaseDecisionProps<T> {
  context: DecisionSupportContext;
  data: T | null;
  isLoading: boolean;
  error: string | null;
  onRefresh?: () => void;
}

/* ──────────────────────────────────────────────
 * Component props (typed via BaseDecisionProps)
 * ────────────────────────────────────────────── */

export type ClinicalSummaryProps =
  BaseDecisionProps<ClinicalSummaryData>;

export type RiskStratificationProps =
  BaseDecisionProps<RiskStratificationDerived>;

export type PathwayRouterProps =
  BaseDecisionProps<PathwayDecisionData>;

export type PetSimulatorProps =
  BaseDecisionProps<PetSimulationData>;

export type PatientCommunicationProps =
  BaseDecisionProps<PatientCommunicationData>;

export type UncertaintyGuardProps =
  BaseDecisionProps<UncertaintyResultData>;