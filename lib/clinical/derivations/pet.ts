import type { Stage2aOutput } from "@/lib/api/alzheimer";

/**
 * PET simulation is a DERIVED clinical construct
 * based on amyloid probability from Stage 2A
 */
export interface PetSimulationDerived {
  amyloid_probability: number;
  expected_positivity: number;
  nnt?: number;
  interpretation: "LOW" | "INTERMEDIATE" | "HIGH";
}

export function derivePetSimulation(
  stage2a?: Stage2aOutput
): PetSimulationDerived {
  const p = stage2a?.amyloid_positive_probability ?? 0;

  const nnt = p > 0 ? Math.round(1 / p) : undefined;

  const interpretation =
    p >= 0.7 ? "HIGH" :
    p >= 0.4 ? "INTERMEDIATE" :
    "LOW";

  return {
    amyloid_probability: p,
    expected_positivity: p,
    nnt,
    interpretation,
  };
}