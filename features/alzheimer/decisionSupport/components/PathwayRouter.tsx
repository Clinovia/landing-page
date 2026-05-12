"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { PathwayRouterProps } from "../types";

/* ──────────────────────────────────────────────
 * Helpers
 * ────────────────────────────────────────────── */

function resolveStepVariant(
  nextStep: string
): "default" | "secondary" | "outline" | "destructive" {
  const lower = nextStep.toLowerCase();

  if (lower.includes("pet") || lower.includes("amyloid")) return "default";
  if (lower.includes("monitor") || lower.includes("watchful")) return "outline";
  if (lower.includes("multimodal") || lower.includes("fusion")) return "secondary";
  if (lower.includes("urgent") || lower.includes("immediate")) return "destructive";

  return "secondary";
}

function TimelineStep({
  step,
  label,
  isActive,
}: {
  step: number;
  label: string;
  isActive?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 border-2 ${
          isActive
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-muted text-muted-foreground border-border"
        }`}
      >
        {step}
      </div>
      <span
        className={`text-sm ${
          isActive ? "font-medium text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
 * FIXED: Correct clinical pathway ordering
 * ────────────────────────────────────────────── */
function buildPathwaySteps(
  nextStep: string,
  hasStage1: boolean,
  hasStage2b: boolean,
  hasStage2a: boolean
): { label: string; done: boolean }[] {
  return [
    {
      label: "Stage 1 — Clinical Screening",
      done: hasStage1,
    },
    {
      label: "Stage 2B — MRI (Neurodegeneration, N)",
      done: hasStage2b,
    },
    {
      label: "Stage 2A — Plasma (Amyloid, A)",
      done: hasStage2a,
    },
    {
      label: nextStep.replace(/_/g, " "),
      done: false,
    },
  ];
}

/* ──────────────────────────────────────────────
 * Main
 * ────────────────────────────────────────────── */

export function PathwayRouter({
  context,
  data,
  isLoading,
  error,
  onRefresh,
}: PathwayRouterProps) {

  const steps = data
    ? buildPathwaySteps(
        data.next_step,
        !!context.stage1,
        !!context.stage2b,
        !!context.stage2a
      )
    : [];

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Pathway Decision
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              Recommended next clinical action based on clinical, MRI (N), and plasma (A)
            </CardDescription>
          </div>

          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="text-xs"
            >
              {isLoading ? (
                <LoadingSpinner className="w-3 h-3" />
              ) : (
                "↻ Refresh"
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4 space-y-4">

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center gap-3 py-6 justify-center text-muted-foreground">
            <LoadingSpinner className="w-3 h-3" />
            <span className="text-sm">Determining pathway…</span>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && <ErrorMessage message={error} />}

        {/* Empty */}
        {!isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-sm text-muted-foreground">
              Pathway not yet determined.
            </p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>
                Get Pathway Recommendation
              </Button>
            )}
          </div>
        )}

        {/* Success */}
        {data && !isLoading && (
          <div className="space-y-5">

            {/* Next step highlight */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Recommended Next Step
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {data.next_step.replace(/_/g, " ")}
                </p>
              </div>
              <Badge variant={resolveStepVariant(data.next_step)}>
                Next
              </Badge>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              {steps.map((s, i) => (
                <TimelineStep
                  key={i}
                  step={i + 1}
                  label={s.label}
                  isActive={i === steps.length - 1}
                />
              ))}
            </div>

            {/* Rationale */}
            <Alert>
              <AlertDescription className="text-sm text-foreground leading-relaxed">
                <span className="font-medium">Clinical Rationale: </span>
                {data.rationale}
              </AlertDescription>
            </Alert>

          </div>
        )}
      </CardContent>
    </Card>
  );
}