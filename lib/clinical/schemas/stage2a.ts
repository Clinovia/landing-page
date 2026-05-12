import { z } from "zod";

export const stage2aSchema = z.object({
  patient_id: z.union([z.string(), z.number()]).optional(),
  hippocampal_volume: z.number().positive(),
  cortical_thickness: z.number().positive(),
  ventricle_volume: z.number().positive(),
});