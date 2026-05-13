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
  const color = score >= 0.7 ? "bg-destructive" : score >= 0.4 ? "bg-amber-500" : "bg-emerald-500";
  const label = score >= 0.7 ? "High Uncertainty" : score >= 0.4 ? "Moderate" : "Low";
  const labelColor = score >= 0.7
    ? "text-destructive"
    : score >= 0.4
    ? "text-amber-600 dark:text-amber-400"
    : "text-emerald-600 dark:text-emerald-400";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Uncertainty Score</span>
        <span className={`font-semibold tabular-nums ${labelColor}`}>{pct}% — {label}</span>
      </div>
      <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
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
  const raw = data as any;

  // Backend returns flag_count + flags[] (list of FlagDetail objects)
  const flagCount: number = raw?.flag_count ?? 0;
  const flags: any[] = raw?.flags ?? [];
  const uncertaintyOverride: boolean = raw?.uncertainty_override ?? false;
  const maxSeverity: string | null = raw?.max_severity ?? null;
  const actionEn: string = raw?.action_en ?? "";

  // Derive a 0–1 score from flag_count for the meter
  const uncertaintyScore = Math.min(1, flagCount / 5);

  const isHighUncertainty = uncertaintyOverride || maxSeverity === "HIGH";

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
            <Button variant="ghost" size="sm" onClick={onRefresh} disabled={isLoading} className="text-xs">
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
              <Button size="sm" variant="outline" onClick={onRefresh}>Evaluate Uncertainty</Button>
            )}
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-5">
            <UncertaintyMeter score={uncertaintyScore} />

            {isHighUncertainty && (
              <Alert variant="destructive">
                <AlertTitle className="text-sm font-semibold">High Uncertainty Detected</AlertTitle>
                <AlertDescription className="text-sm">
                  {actionEn || "Model confidence is low. Clinical decisions should not be based solely on these results. Consider specialist consultation."}
                </AlertDescription>
              </Alert>
            )}

            {flags.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Active Flags ({flags.length})
                </p>
                <ul className="space-y-1.5">
                  {flags.map((flag: any, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 py-2 px-3 rounded-md bg-muted/50 border border-border">
                      <span className="mt-0.5 text-amber-500 shrink-0" aria-hidden>⚠</span>
                      <div className="space-y-0.5">
                        <p className="text-sm text-foreground">
                          {flag.message_en ?? flag.message ?? String(flag)}
                        </p>
                        {flag.severity && (
                          <p className="text-xs text-muted-foreground">Severity: {flag.severity}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {flags.length === 0 && !isHighUncertainty && (
              <div className="flex items-center gap-2.5 py-3 px-3 rounded-md bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800">
                <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>✓</span>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                  No uncertainty flags — model confidence is acceptable.
                </p>
              </div>
            )}

            {missingStages && (
              <Alert>
                <AlertDescription className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Incomplete pipeline: </span>
                  {missingStages} data not available. Uncertainty estimate may be elevated due to missing inputs.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}