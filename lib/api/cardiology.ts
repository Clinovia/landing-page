// lib/api/cardiology.ts
import { apiRequest } from "../apiClient";
import type {
  ASCVDInput,
  ASCVDOutput,
  BPCategoryInput,
  BPCategoryOutput,
  CHA2DS2VAScInput,
  CHA2DS2VAScOutput,
  ECGInterpreterInput,
  ECGInterpreterOutput,
} from "@/features/cardiology/types";

function post<TInput, TOutput>(path: string, body: TInput): Promise<TOutput> {
  return apiRequest<TOutput, TInput>({ path, method: "POST", body });
}

export const calculateASCVD = (data: ASCVDInput) =>
  post<ASCVDInput, ASCVDOutput>("/api/v1/cardiology/ascvd", data);

export const categorizeBP = (data: BPCategoryInput) =>
  post<BPCategoryInput, BPCategoryOutput>("/api/v1/cardiology/bp-category", data);

export const calculateCHA2DS2VASc = (data: CHA2DS2VAScInput) =>
  post<CHA2DS2VAScInput, CHA2DS2VAScOutput>("/api/v1/cardiology/cha2ds2vasc", data);

export const interpretECG = (data: ECGInterpreterInput) =>
  post<ECGInterpreterInput, ECGInterpreterOutput>("/api/v1/cardiology/ecg-interpreter", data);