import { z } from "zod";
import type { Stage2aPlasmaModelInput } from "@/features/alzheimer/stage2a/types";

export const stage2aSchema = z.object({
  patient_id: z.union([z.string(), z.number()]).optional(),

  /* Plasma biomarkers */
  PLASMA_ABETA_RATIO: z.number().positive(),
  PLASMA_PTAU217:     z.number().nonnegative(),
  PLASMA_GFAP:        z.number().nonnegative(),
  PLASMA_NfL:         z.number().nonnegative(),

  /* Covariates */
  AGE:       z.number().positive(),
  APOE4:     z.union([z.literal(0), z.literal(1), z.literal(2)]),
  EDUCATION: z.number().nonnegative(),
  MMSE:      z.number().min(0).max(30),
});

export function validateStage2a(input: unknown): Stage2aPlasmaModelInput {
  return stage2aSchema.parse(input);
}