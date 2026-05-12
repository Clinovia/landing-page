import { z } from "zod";
import type { Stage1ClinicalScreeningInput } from "@/features/alzheimer/stage1/types";

export const stage1Schema = z.object({
  patient_id: z.union([z.string(), z.number()]).optional(),
  AGE:                 z.number().min(40).max(90),
  PTGENDER:            z.union([z.literal(0), z.literal(1)]),
  PTEDUCAT:            z.number().min(0).max(30),
  APOE4:               z.union([z.literal(0), z.literal(1), z.literal(2)]),
  MMSE:                z.number().min(0).max(30),
  EcogSPTotal:         z.number().min(1).max(4),
  EcogMem_discrepancy: z.number().min(-3).max(3),
  RAVLT_forgetting:    z.number().min(0).max(15),
  RAVLT_immediate:     z.number().min(0).max(75),
});

export function validateStage1(input: unknown): Stage1ClinicalScreeningInput {
  return stage1Schema.parse(input);
}