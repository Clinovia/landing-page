// lib/api/cardiology.ts
import { apiRequest } from "@/lib/apiClient";
import type {
  ASCVDInput,
  ASCVDOutput,
  BPCategoryInput,
  BPCategoryOutput,
  CHA2DS2VAScInput,
  CHA2DS2VAScOutput,
  ECGInterpretationInput,
  ECGInterpretationOutput,
} from "@/features/cardiology/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.clinovia.ai";

function post<TInput, TOutput>(path: string, body: TInput): Promise<TOutput> {
  return apiRequest<TOutput, TInput>({
    path: `${BASE_URL}${path}`,
    method: "POST",
    body,
    requireAuth: true, // Supabase auth token will still be used
  });
}

export const calculateASCVD = (data: ASCVDInput) =>
  post<ASCVDInput, ASCVDOutput>("/api/v1/cardiology/ascvd", data);

export const categorizeBP = (data: BPCategoryInput) =>
  post<BPCategoryInput, BPCategoryOutput>("/api/v1/cardiology/bp-category", data);

export const calculateCHA2DS2VASc = (data: CHA2DS2VAScInput) =>
  post<CHA2DS2VAScInput, CHA2DS2VAScOutput>("/api/v1/cardiology/cha2ds2vasc", data);

export const interpretECG = (data: ECGInterpretationInput) =>
  post<ECGInterpretationInput, ECGInterpretationOutput>("/api/v1/cardiology/ecg-interpretation", data);
