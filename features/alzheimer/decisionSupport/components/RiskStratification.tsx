"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { RiskStratificationProps, RiskLevel } from "../types";

const RISK_CONFIG: Record<
  RiskLevel,
  {
    label: string;
    badge: "destructive" | "secondary" | "outline";
    bar: string;
    bg: string;
    pct: number;
  }
> = {
  HIGH: {
    label: "High Risk",
    badge: "destructive",
    bar: "bg-destructive",
    bg: "bg-destructive/10 border-destructive/30",
    pct: 90,
  },
  INTERMEDIATE: {
    label: "Intermediate Risk",
    badge: "secondary",
    bar: "bg-amber-500",
    bg: "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800",
    pct: 55,
  },
  LOW: {
    label: "Low Risk",
    badge: "outline",
    bar: "bg-emerald-500",
    bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800",
    pct: 15,
  },
};

/* Upstream context score rows */
function ContextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

export function RiskStratification({
  context,
  data,
  isLoading,
  error,
  onRefresh,
}: RiskStratificationProps) {
  const cfg = data ? RISK_CONFIG[data.risk_level] : null;

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Risk Stratification
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              Integrated risk level derived from all available stage outputs
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
              {isLoading ? <LoadingSpinner className="w-3 h-3" />: "↻ Refresh"}
            </Button>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4 space-y-4">
        {/* Upstream inputs */}
        {(context.stage1 || context.stage2a|| context.stage2b) && (
          <div className="rounded-md border border-border divide-y divide-border">
            {context.stage1 && (
              <div className="px-3">
                <ContextRow
                  label="Stage 1 — Clinical Risk"
                  value={`${context.stage1.predicted_class} (${Math.round(context.stage1.progression_probability * 100)}%)`}
                />
              </div>
            )}
            {context.stage2a && (
              <div className="px-3">
                <ContextRow
                  label="Stage 2A — Amyloid Risk"
                  value={`${Math.round(context.stage2a.amyloid_positive_probability * 100)}% — ${context.stage2a.predicted_class}`}
                />
              </div>
            )}
            {context.stage2b && (
              <div className="px-3">
                <ContextRow
                  label="Stage 2B — Neurodegeneration"
                  value={`${Math.round(context.stage2b.mri_risk_probability * 100)}% — ${context.stage2b.predicted_class}`}
                />
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center gap-3 py-6 justify-center text-muted-foreground">
            <LoadingSpinner className="w-3 h-3" />
            <span className="text-sm">Computing risk stratification…</span>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && <ErrorMessage message={error} />}

        {/* Empty */}
        {!isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-sm text-muted-foreground">Risk level not yet computed.</p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>
                Compute Risk
              </Button>
            )}
          </div>
        )}

        {/* Result */}
        {data && cfg && !isLoading && (
          <div className="space-y-4">
            {/* Risk level banner */}
            <div className={`rounded-lg border p-4 ${cfg.bg}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Integrated Risk Level</span>
                <Badge variant={cfg.badge}>{cfg.label}</Badge>
              </div>
              {/* Visual risk bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${cfg.bar}`}
                    style={{ width: `${cfg.pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Intermediate</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <Alert>
              <AlertDescription className="text-sm text-foreground leading-relaxed">
                <span className="font-medium">Recommendation: </span>
                {data.recommendation}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}