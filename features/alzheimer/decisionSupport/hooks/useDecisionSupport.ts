// features/alzheimer/decisionSupport/hooks/useDecisionSupport.ts
"use client";

export function useDecisionSupport(_context: unknown) {
  const noop = async () => {};
  const slice = { data: null, isLoading: false, error: null };

  return {
    summary:       slice,
    risk:          slice,
    pathway:       slice,
    petSimulation: slice,
    communication: slice,
    uncertainty:   slice,
    fetchSummary:       noop,
    fetchRisk:          noop,
    fetchPathway:       noop,
    fetchPetSimulation: noop,
    fetchCommunication: noop,
    fetchUncertainty:   noop,
    fetchAll:           noop,
  };
}