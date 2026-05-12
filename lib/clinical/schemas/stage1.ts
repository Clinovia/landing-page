import { z } from "zod";

export const stage1Schema = z.object({
  patient_id: z.union([z.string(), z.number()]).optional(),
  age: z.number().min(40).max(120),
  education: z.number().min(0).max(30),
  gender: z.enum(["male", "female", "other"]),
  apoe4: z.number().min(0).max(2),
  mmse: z.number().min(0).max(30),
  moca: z.number().min(0).max(30).optional(),
  ecog: z.number().min(0).max(50).optional(),
});