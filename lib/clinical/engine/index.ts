import type {
  ClinicalContext,
  Stage1Output,
  Stage2aOutput,
  Stage2bOutput,
} from "../types";

/* ─────────────────────────────────────────────
 * Risk Engine
 * ───────────────────────────────────────────── */
export function deriveRisk(context: ClinicalContext) {
  const s1 = context.stage1;
  const s2a = context.stage2a;
  const s2b = context.stage2b;

  let score = 0;

  if (s1) score += s1.probability * 0.4;
  if (s2a) score += s2a.amyloid_probability * 0.3;
  if (s2b) score += s2b.neurodegeneration_score * 0.3;

  let level: "LOW" | "INTERMEDIATE" | "HIGH" = "LOW";

  if (score > 0.7) level = "HIGH";
  else if (score > 0.4) level = "INTERMEDIATE";

  return {
    score,
    level,
  };
}

/* ─────────────────────────────────────────────
 * Pathway Engine
 * ───────────────────────────────────────────── */
export function derivePathway(context: ClinicalContext) {
  const risk = deriveRisk(context);

  if (risk.level === "HIGH") {
    return {
      next_step: "PET Imaging + Specialist Referral",
      rationale: "High integrated risk across modalities",
    };
  }

  if (risk.level === "INTERMEDIATE") {
    return {
      next_step: "Monitor + Repeat Biomarkers in 6 months",
      rationale: "Moderate risk requires longitudinal tracking",
    };
  }

  return {
    next_step: "Routine Follow-up",
    rationale: "Low risk profile across modalities",
  };
}

/* ─────────────────────────────────────────────
 * Clinical Summary Engine
 * ───────────────────────────────────────────── */
export function deriveSummary(context: ClinicalContext) {
  const risk = deriveRisk(context);

  return {
    summary: `Integrated assessment indicates ${risk.level} risk based on multimodal biomarkers.`,
  };
}