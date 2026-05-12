// features/alzheimer/decisionSupport/components/UncertaintyGuard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { UncertaintyGuardProps } from "../types";

function UncertaintyMeter({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    score >= 0.7 ? "bg-destructive" : score >= 0.4 ? "bg-amber-500" : "bg-emerald-500";
  const label =
    score >= 0.7 ? "High Uncertainty" : score >= 0.4 ? "Moderate" : "Low";
  const labelColor =
    score >= 0.7
      ? "text-destructive"
      : score >= 0.4
      ? "text-amber-600 dark:text-amber-400"
      : "text-emerald-600 dark:text-emerald-400";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Uncertainty Score</span>
        <span className={`font-semibold tabular-nums ${labelColor}`}>
          {pct}% — {label}
        </span>
      </div>
      <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Certain</span>
        <span>Uncertain</span>
      </div>
    </div>
  );
}

export function UncertaintyGuard({
  context,
  data,
  isLoading,
  error,
  onRefresh,
}: UncertaintyGuardProps) {
  // Defensive access — UncertaintyResult type will be updated later
  const uncertaintyScore: number = (data as any)?.uncertainty_score ?? 0;
  const flags: string[] = (data as any)?.flags ?? [];
  const isHighUncertainty = data && uncertaintyScore >= 0.7;
  const hasFlags = flags.length > 0;

  // context uses stage2a / stage2b, not stage2 / stage3
  const isIncompletePipeline = !context.stage1 || !context.stage2a || !context.stage2b;
  const missingStages = [
    !context.stage1 && "Stage 1",
    !context.stage2a && "Stage 2a",
    !context.stage2b && "Stage 2b",
  ].filter(Boolean).join(", ");

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Uncertainty Guard
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              Flags low-confidence predictions and data quality concerns
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
              {isLoading ? <LoadingSpinner className="w-3 h-3" /> : "↻ Refresh"}
            </Button>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4 space-y-4">
        {isLoading && (
          <div className="flex items-center gap-3 py-6 justify-center text-muted-foreground">
            <LoadingSpinner className="w-3 h-3" />
            <span className="text-sm">Evaluating uncertainty…</span>
          </div>
        )}

        {!isLoading && error && <ErrorMessage message={error} />}

        {!isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-sm text-muted-foreground">Uncertainty not yet evaluated.</p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>
                Evaluate Uncertainty
              </Button>
            )}
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-5">
            <UncertaintyMeter score={uncertaintyScore} />

            {isHighUncertainty && (
              <Alert variant="destructive">
                <AlertTitle className="text-sm font-semibold">
                  High Uncertainty Detected
                </AlertTitle>
                <AlertDescription className="text-sm">
                  Model confidence is low. Clinical decisions should not be based solely on
                  these results. Consider gathering additional data or specialist consultation.
                </AlertDescription>
              </Alert>
            )}

            {hasFlags && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Active Flags ({flags.length})
                </p>
                <ul className="space-y-1.5">
                  {flags.map((flag, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 py-2 px-3 rounded-md bg-muted/50 border border-border"
                    >
                      <span className="mt-0.5 text-amber-500 shrink-0" aria-hidden>⚠</span>
                      <span className="text-sm text-foreground">{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!hasFlags && !isHighUncertainty && (
              <div className="flex items-center gap-2.5 py-3 px-3 rounded-md bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800">
                <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>✓</span>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                  No uncertainty flags — model confidence is acceptable.
                </p>
              </div>
            )}

            {isIncompletePipeline && (
              <Alert>
                <AlertDescription className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Incomplete pipeline: </span>
                  {missingStages} data not available. Uncertainty estimate may be elevated
                  due to missing inputs.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}