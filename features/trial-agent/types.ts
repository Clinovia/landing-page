export const TRIAL_AGENT_STAGES = [
"Protocol",
"Eligibility mapping",
"Candidate identification",
"Clinovia A+T+ scoring",
"Enrichment analysis",
"Report",
] as const;

export type TrialAgentStage = (typeof TRIAL_AGENT_STAGES)[number];

export interface TrialAgentCandidate {
[key: string]: unknown;
}

export interface MappingSummary {
mapped?: number;
unmapped?: number;
unavailable?: number;
invalid?: number;
[key: string]: unknown;
}

export interface EnrichmentAnalysisSummary {
[key: string]: unknown;
}

export interface TrialEnrichmentSummary {
initial_cohort_n?: number;
candidate_n?: number;
scored_n?: number;
criteria_n?: number;
mapping_summary?: MappingSummary;
enrichment_summary?: EnrichmentAnalysisSummary;
report_path?: string | null;

[key: string]: unknown;

}

export interface TrialEnrichmentResponse {
run_id: string;
status: string;
requires_human_review: boolean;
review_reasons: string[];
errors: string[];
summary: TrialEnrichmentSummary;
candidates?: TrialAgentCandidate[];
}

export interface TrialEnrichmentRunInput {
protocol: string;
criteria?: string;
cohortFile: File;
}

export interface TrialEnrichmentState {
isRunning: boolean;
activeStage: number;
result: TrialEnrichmentResponse | null;
error: string | null;
}

export interface CandidateTableProps {
candidates: TrialAgentCandidate[];
participantIdField?: string;
limit?: number;
}
