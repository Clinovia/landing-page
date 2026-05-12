import type {
  Stage1Output,
  Stage2bOutput,
} from "@/lib/api/alzheimer";

export type RiskLevel = "LOW" | "INTERMEDIATE" | "HIGH";

export interface RiskStratificationDerived {
  risk_level: RiskLevel;
  probability: number;
  confidence: number;
  recommendation: string;
}

export function deriveRiskLevel(
  s1?: Stage1Output,
  s2b?: Stage2bOutput
): RiskStratificationDerived {
  const p1 = s1?.progression_probability ?? 0;
  const p2 = s2b?.mri_risk_probability ?? 0;

  const score = 0.4 * p1 + 0.6 * p2;

  let risk_level: RiskLevel = "LOW";

  if (score > 0.7) risk_level = "HIGH";
  else if (score > 0.4) risk_level = "INTERMEDIATE";

  return {
    risk_level,
    probability: score,
    confidence: 0.8,
    recommendation:
      risk_level === "HIGH"
        ? "Immediate specialist evaluation recommended"
        : risk_level === "INTERMEDIATE"
        ? "Consider additional biomarker testing"
        : "Routine monitoring",
  };
}