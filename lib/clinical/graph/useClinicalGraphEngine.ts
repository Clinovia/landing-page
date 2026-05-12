"use client";

import { useMemo, useState } from "react";

import { computeGraphState } from "@/lib/clinical/graph/engine";
import { computeClinicalDecision } from "@/lib/clinical/graph/decision";
import { explainDecision } from "@/lib/clinical/graph/explain";

export function useClinicalGraphEngine() {
  const [state, setState] = useState<any>({});

  const graph = useMemo(() => computeGraphState(state), [state]);

  const decision = useMemo(
    () => computeClinicalDecision(state, graph.global_risk_score),
    [state, graph]
  );

  const explanation = useMemo(
    () => explainDecision(state),
    [state]
  );

  return {
    state,
    setState,

    graph,
    decision,
    explanation,
  };
}