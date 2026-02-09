// lib/api/cardiology.ts
import { apiClient } from "../apiClient";
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

/* ------------------------------------------------------------------ */
/* Core Assessments                                                    */
/* ------------------------------------------------------------------ */

export async function calculateASCVD(
  data: ASCVDInput
): Promise<ASCVDOutput> {
  const res = await apiClient.post("/api/v1/cardiology/ascvd", data);
  return res.data;
}

export async function categorizeBP(
  data: BPCategoryInput
): Promise<BPCategoryOutput> {
  const res = await apiClient.post(
    "/api/v1/cardiology/bp-category",
    data
  );
  return res.data;
}

export async function calculateCHA2DS2VASc(
  data: CHA2DS2VAScInput
): Promise<CHA2DS2VAScOutput> {
  const res = await apiClient.post(
    "/api/v1/cardiology/cha2ds2vasc",
    data
  );
  return res.data;
}

export async function interpretECG(
  data: ECGInterpreterInput
): Promise<ECGInterpreterOutput> {
  const res = await apiClient.post(
    "/api/v1/cardiology/ecg-interpreter",
    data
  );
  return res.data;
}
