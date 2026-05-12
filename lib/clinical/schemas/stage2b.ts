import { z } from "zod";

export const stage2bSchema = z.object({
  patient_id: z.union([z.string(), z.number()]).optional(),
  plasma_abeta42_40: z.number().positive(),
  ptau181: z.number().positive(),
  nfl: z.number().positive().optional(),
});