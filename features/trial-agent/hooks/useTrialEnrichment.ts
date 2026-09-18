"use client";

import { useCallback, useState } from "react";

import type {
  TrialEnrichmentResponse,
  TrialEnrichmentRunInput,
  TrialEnrichmentState,
} from "../types";

import { TRIAL_AGENT_STAGES } from "../types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CLINOVIA_API_URL ?? "http://localhost:8000";

export const STAGES = TRIAL_AGENT_STAGES;

export function useTrialEnrichment() {
  const [state, setState] = useState<TrialEnrichmentState>({
    isRunning: false,
    activeStage: -1,
    result: null,
    error: null,
  });

  const run = useCallback(
    async ({
      protocol,
      criteria,
      cohortFile,
    }: TrialEnrichmentRunInput): Promise<TrialEnrichmentResponse> => {
      setState({
        isRunning: true,
        activeStage: 0,
        result: null,
        error: null,
      });

      try {
        // -----------------------------------------------------------------
        // Parse cohort
        // -----------------------------------------------------------------

        const cohort = await parseCsvFile(cohortFile);

        setState((current) => ({
          ...current,
          activeStage: 1,
        }));

        // -----------------------------------------------------------------
        // Parse protocol and eligibility criteria
        //
        // Structured JSON is passed through directly.
        // Plain text remains supported as a fallback.
        // -----------------------------------------------------------------

        const parsedProtocol = parseProtocol(protocol);
        const parsedCriteria = parseCriteria(criteria);

        const requestBody = {
          run_id: createRunId(),
          protocol: parsedProtocol,
          cohort,
          ...(parsedCriteria ? { criteria: parsedCriteria } : {}),
        };

        // -----------------------------------------------------------------
        // Submit run
        // -----------------------------------------------------------------

        setState((current) => ({
          ...current,
          activeStage: 2,
        }));

        const response = await fetch(`${API_BASE_URL}/runs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorBody = await readErrorResponse(response);

          throw new Error(
            errorBody ||
              `Trial enrichment request failed with status ${response.status}.`,
          );
        }

        // The FastAPI endpoint executes the workflow synchronously.
        // These stages are therefore represented client-side after
        // the request completes.
        setState((current) => ({
          ...current,
          activeStage: 3,
        }));

        const result =
          (await response.json()) as TrialEnrichmentResponse;

        setState((current) => ({
          ...current,
          activeStage: 4,
        }));

        setState((current) => ({
          ...current,
          activeStage: 5,
        }));

        // activeStage === STAGES.length means every stage is complete.
        setState({
          isRunning: false,
          activeStage: STAGES.length,
          result,
          error: null,
        });

        return result;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while running Clinovia enrichment.";

        setState({
          isRunning: false,
          activeStage: -1,
          result: null,
          error: message,
        });

        throw error;
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setState({
      isRunning: false,
      activeStage: -1,
      result: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    stages: STAGES,
    run,
    reset,
  };
}


// ---------------------------------------------------------------------------
// Protocol parsing
// ---------------------------------------------------------------------------

function parseProtocol(
  protocol: string,
): Record<string, unknown> {
  const trimmed = protocol.trim();

  if (!trimmed) {
    throw new Error("Trial protocol is required.");
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);

    if (
      parsed === null ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      throw new Error("Protocol JSON must be an object.");
    }

    return parsed as Record<string, unknown>;
  } catch (error) {
    // If the user supplied valid JSON but it has the wrong shape,
    // surface that error rather than silently treating it as text.
    if (
      error instanceof Error &&
      error.message === "Protocol JSON must be an object."
    ) {
      throw error;
    }

    // Plain-text protocol input remains supported.
    return {
      text: trimmed,
    };
  }
}


// ---------------------------------------------------------------------------
// Eligibility criteria parsing
// ---------------------------------------------------------------------------

function parseCriteria(
  criteria?: string,
): Record<string, unknown>[] | undefined {
  const trimmed = criteria?.trim();

  if (!trimmed) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);

    if (!Array.isArray(parsed)) {
      throw new Error(
        "Eligibility criteria JSON must be an array.",
      );
    }

    return parsed as Record<string, unknown>[];
  } catch (error) {
    // If the user supplied valid JSON but it has the wrong shape,
    // surface that error rather than silently treating it as text.
    if (
      error instanceof Error &&
      error.message ===
        "Eligibility criteria JSON must be an array."
    ) {
      throw error;
    }

    // Plain-text criteria remain supported.
    return [
      {
        text: trimmed,
      },
    ];
  }
}


// ---------------------------------------------------------------------------
// CSV parsing
// ---------------------------------------------------------------------------

async function parseCsvFile(
  file: File,
): Promise<Record<string, unknown>[]> {
  const text = await file.text();

  return parseCsv(text);
}

function parseCsv(
  text: string,
): Record<string, unknown>[] {
  const rows = splitCsvRows(text);

  if (rows.length === 0) {
    throw new Error("The cohort CSV is empty.");
  }

  const headers = rows[0].map((header) =>
    header.trim(),
  );

  if (headers.some((header) => !header)) {
    throw new Error(
      "The cohort CSV contains an empty column name.",
    );
  }

  const duplicateHeaders = headers.filter(
    (header, index) =>
      headers.indexOf(header) !== index,
  );

  if (duplicateHeaders.length > 0) {
    throw new Error(
      `The cohort CSV contains duplicate column names: ${[
        ...new Set(duplicateHeaders),
      ].join(", ")}`,
    );
  }

  return rows.slice(1).map((row) => {
    const record: Record<string, unknown> = {};

    headers.forEach((header, index) => {
      const value = row[index] ?? "";

      record[header] = parseCsvValue(value);
    });

    return record;
  });
}

function splitCsvRows(
  text: string,
): string[][] {
  const rows: string[][] = [];

  let row: string[] = [];
  let field = "";
  let insideQuotes = false;

  for (
    let index = 0;
    index < text.length;
    index += 1
  ) {
    const character = text[index];

    if (character === '"') {
      if (
        insideQuotes &&
        text[index + 1] === '"'
      ) {
        field += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (
      character === "," &&
      !insideQuotes
    ) {
      row.push(field);
      field = "";
      continue;
    }

    if (
      (character === "\n" ||
        character === "\r") &&
      !insideQuotes
    ) {
      if (
        character === "\r" &&
        text[index + 1] === "\n"
      ) {
        index += 1;
      }

      row.push(field);
      field = "";

      if (
        row.some(
          (value) =>
            value.trim() !== "",
        )
      ) {
        rows.push(row);
      }

      row = [];

      continue;
    }

    field += character;
  }

  if (
    field !== "" ||
    row.length > 0
  ) {
    row.push(field);

    if (
      row.some(
        (value) =>
          value.trim() !== "",
      )
    ) {
      rows.push(row);
    }
  }

  return rows;
}

function parseCsvValue(
  value: string,
): unknown {
  const trimmed = value.trim();

  if (trimmed === "") {
    return null;
  }

  if (
    /^(true|false)$/i.test(trimmed)
  ) {
    return (
      trimmed.toLowerCase() ===
      "true"
    );
  }

  const number = Number(trimmed);

  if (Number.isFinite(number)) {
    return number;
  }

  return trimmed;
}


// ---------------------------------------------------------------------------
// Run ID
// ---------------------------------------------------------------------------

function createRunId(): string {
  const timestamp =
    Date.now().toString(36);

  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
    return `web_${timestamp}_${crypto.randomUUID()}`;
  }

  return `web_${timestamp}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}


// ---------------------------------------------------------------------------
// API error handling
// ---------------------------------------------------------------------------

async function readErrorResponse(
  response: Response,
): Promise<string | null> {
  try {
    const body =
      (await response.json()) as {
        detail?: string;
      };

    if (body.detail) {
      return body.detail;
    }
  } catch {
    // Fall through to generic HTTP error.
  }

  return null;
}

