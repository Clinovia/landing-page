import { z } from "zod";
import type { Stage2bMRIGateInput } from "@/features/alzheimer/stage2b/types";

export const stage2bSchema = z.object({
  patient_id: z.union([z.string(), z.number()]).optional(),

  /* Baseline MRI volumes — all optional per interface */
  Hippocampus: z.number().nonnegative().optional(),
  Entorhinal:  z.number().nonnegative().optional(),
  Ventricles:  z.number().nonnegative().optional(),
  WholeBrain:  z.number().nonnegative().optional(),
  ICV:         z.number().nonnegative().optional(),

  /* Longitudinal features — unbounded (slopes can be negative) */
  Hippocampus_slope: z.number().optional(),
  Ventricles_slope:  z.number().optional(),
  WholeBrain_slope:  z.number().optional(),

  /* Covariates */
  AGE:   z.number().positive().optional(),
  APOE4: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),
});

export function validateStage2b(input: unknown): Stage2bMRIGateInput {
  return stage2bSchema.parse(input);
}