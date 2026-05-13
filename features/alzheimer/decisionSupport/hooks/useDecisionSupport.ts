"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useStageResults } from "@/context/StageResultsContext";
import { apiRequest } from "@/lib/apiClient";
import type {
  DecisionSupportContext,
  DecisionSupportHookReturn,
  AsyncState,
  ClinicalSummaryData,
  RiskStratificationDerived,
  PathwayDecisionData,
  PetSimulationData,
  PatientCommunicationData,
  UncertaintyResultData,
} from "../types";

function emptyState<T>(): AsyncState<T> {
  return { data: null, isLoading: false, error: null };
}

function useAsyncFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[]
): [AsyncState<T>, () => Promise<void>] {
  const [state, setState] = useState<AsyncState<T>>(emptyState());

  const fetch = useCallback(async () => {
    setState({ data: null, isLoading: true, error: null });
    try {
      const data = await fetcher();
      setState({ data, isLoading: false, error: null });
    } catch (err: any) {
      const message =
        err?.message ||
        (typeof err === "string" ? err : null) ||
        "Unknown error";
      console.error("useAsyncFetch error:", err);
      setState({ data: null, isLoading: false, error: message });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, fetch];
}

export function useDecisionSupport(_unused?: unknown): DecisionSupportHookReturn {
  const { stage1, stage2a, stage2b } = useStageResults();

  // Stable ref so fetchAll doesn't trigger re-renders
  const contextRef = useRef<DecisionSupportContext>({ stage1, stage2a, stage2b });
  useEffect(() => {
    contextRef.current = { stage1, stage2a, stage2b };
  }, [stage1, stage2a, stage2b]);

  const hasAnyResult = !!(stage1 || stage2a || stage2b);

  const makeBody = useCallback(
    () => ({ stage1, stage2a, stage2b }),
    [stage1, stage2a, stage2b]
  );

  const [summary, fetchSummary] = useAsyncFetch<ClinicalSummaryData>(
    () => apiRequest({ path: "/api/v1/decision-support/summary", method: "POST", body: makeBody() }),
    [stage1, stage2a, stage2b]
  );

  const [risk, fetchRisk] = useAsyncFetch<RiskStratificationDerived>(
    () => apiRequest({ path: "/api/v1/decision-support/risk", method: "POST", body: makeBody() }),
    [stage1, stage2a, stage2b]
  );

  const [pathway, fetchPathway] = useAsyncFetch<PathwayDecisionData>(
    () => apiRequest({ path: "/api/v1/decision-support/pathway", method: "POST", body: makeBody() }),
    [stage1, stage2a, stage2b]
  );

  const [petSimulation, fetchPetSimulation] = useAsyncFetch<PetSimulationData>(
    () => apiRequest({ path: "/api/v1/decision-support/pet", method: "POST", body: makeBody() }),
    [stage1, stage2a, stage2b]
  );

  const [communication, fetchCommunication] = useAsyncFetch<PatientCommunicationData>(
    () => apiRequest({ path: "/api/v1/decision-support/communication", method: "POST", body: makeBody() }),
    [stage1, stage2a, stage2b]
  );

  const [uncertainty, fetchUncertainty] = useAsyncFetch<UncertaintyResultData>(
    () => apiRequest({ path: "/api/v1/decision-support/uncertainty", method: "POST", body: makeBody() }),
    [stage1, stage2a, stage2b]
  );

  const fetchAll = useCallback(async () => {
    await Promise.all([
      fetchSummary(),
      fetchRisk(),
      fetchPathway(),
      fetchPetSimulation(),
      fetchCommunication(),
      fetchUncertainty(),
    ]);
  }, [fetchSummary, fetchRisk, fetchPathway, fetchPetSimulation, fetchCommunication, fetchUncertainty]);

  // Auto-fetch when any stage result becomes available
  useEffect(() => {
    if (hasAnyResult) fetchAll();
  // fetchAll is stable via useCallback — safe to omit from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage1, stage2a, stage2b]);

  const isAnyLoading =
    summary.isLoading ||
    risk.isLoading ||
    pathway.isLoading ||
    petSimulation.isLoading ||
    communication.isLoading ||
    uncertainty.isLoading;

  return {
    summary,
    fetchSummary,
    risk,
    fetchRisk,
    pathway,
    fetchPathway,
    petSimulation,
    fetchPetSimulation,
    communication,
    fetchCommunication,
    uncertainty,
    fetchUncertainty,
    fetchAll,
    isAnyLoading,
  };
}