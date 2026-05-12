import type { Stage2bOutput } from "../types";

export function parseStage2bResponse(data: any): Stage2bOutput {
  return {
    neurodegeneration_score: Number(data.neurodegeneration_score),
    positive: Boolean(data.positive),
  };
}
