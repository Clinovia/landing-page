import type { Stage1Output } from "../types";

export function parseStage1Response(data: any): Stage1Output {
  return {
    risk_score: Number(data.risk_score),
    risk_level: data.risk_level,
    probability: Number(data.probability),
  };
}