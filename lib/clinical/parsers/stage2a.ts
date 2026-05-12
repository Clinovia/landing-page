import type { Stage2aOutput } from "../types";

export function parseStage2aResponse(data: any): Stage2aOutput {
  return {
    amyloid_probability: Number(data.amyloid_probability),
    positive: Boolean(data.positive),
  };
}