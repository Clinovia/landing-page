"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { ClinicalSummaryProps } from "../types";

export function ClinicalSummary({
  context,
  data,
  isLoading,
  error,
  onRefresh,
}: ClinicalSummaryProps) {

  const hasContext =
    context.stage1 || context.stage2a || context.stage2b;

  /* ──────────────────────────────────────────────
   * Context badges (FIXED)
   * ────────────────────────────────────────────── */
  const contextBadges = [

    /* Stage 1 — Clinical */
    context.stage1 && {
      label: `Stage 1 — ${context.stage1.predicted_class.replace(/_/g, " ")}`,
      variant:
        context.stage1.predicted_class === "HIGH_RISK_PROGRESSOR"
          ? "destructive"
          : "outline",
    },

    /* Stage 2B — MRI (Neurodegeneration N) */
    context.stage2b && {
      label: `MRI — ${
        context.stage2b.predicted_class === "N_POSITIVE" ? "N+" : "N−"
      }`,
      variant:
        context.stage2b.predicted_class === "N_POSITIVE"
          ? "destructive"
          : "outline",
    },

    /* Stage 2A — Plasma (Amyloid A) */
    context.stage2a && {
      label: `Plasma — ${
        context.stage2a.predicted_class === "AMYLOID_POSITIVE"
          ? "A+"
          : "A−"
      }`,
      variant:
        context.stage2a.predicted_class === "AMYLOID_POSITIVE"
          ? "destructive"
          : "outline",
    },

  ].filter(Boolean) as {
    label: string;
    variant: "destructive" | "secondary" | "outline";
  }[];

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Clinical Summary
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              Integrated narrative across clinical, MRI (N), and plasma (A)
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

        {/* Context badges */}
        {contextBadges.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {contextBadges.map((b) => (
              <Badge key={b.label} variant={b.variant} className="text-xs">
                {b.label}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        {/* No context */}
        {!hasContext && (
          <p className="text-sm text-muted-foreground italic">
            No upstream stage data available. Run at least one diagnostic stage.
          </p>
        )}

        {/* Loading */}
        {hasContext && isLoading && (
          <div className="flex items-center gap-3 py-6 justify-center text-muted-foreground">
            <LoadingSpinner className="w-3 h-3" />
            <span className="text-sm">Generating clinical summary…</span>
          </div>
        )}

        {/* Error */}
        {hasContext && error && (
          <ErrorMessage message={error} />
        )}

        {/* Empty */}
        {hasContext && !isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-6">
            <p className="text-sm text-muted-foreground">
              Summary not yet generated.
            </p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>
                Generate Summary
              </Button>
            )}
          </div>
        )}

        {/* Success */}
        {data && !isLoading && (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {data.summary}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}