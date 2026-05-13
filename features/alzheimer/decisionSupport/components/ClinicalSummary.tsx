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
  const raw = data as any;
  const hasContext = !!(context.stage1 || context.stage2a || context.stage2b);

  // Backend returns: tier, tier_label_en, tier_label_ko, amyloid_prob,
  // confidence_band, nhi_code, contributing_factors, top_features_by_stage, reasoning
  const tier: string = raw?.tier ?? "";
  const tierLabelEn: string = raw?.tier_label_en ?? "";
  const tierLabelKo: string = raw?.tier_label_ko ?? "";
  const amyloidProb: number = raw?.amyloid_prob ?? 0;
  const confidenceBand: string = raw?.confidence_band ?? "";
  const topFeatures: Record<string, string[]> = raw?.top_features_by_stage ?? {};
  const contributing: string[] = raw?.contributing_factors ?? [];

  const tierBadgeVariant = (
    tier === "URGENT" || tier === "HIGH_RISK" ? "destructive" :
    tier === "CONCERN" ? "secondary" : "outline"
  ) as "destructive" | "secondary" | "outline";

  const contextBadges = [
    context.stage1 && {
      label: `Stage 1 — ${context.stage1.predicted_class?.replace(/_/g, " ") ?? "—"}`,
      variant: context.stage1.predicted_class === "HIGH_RISK_PROGRESSOR" ? "destructive" : "outline",
    },
    context.stage2b && {
      label: `MRI — ${context.stage2b.predicted_class === "N_POSITIVE" ? "N+" : "N−"}`,
      variant: context.stage2b.predicted_class === "N_POSITIVE" ? "destructive" : "outline",
    },
    context.stage2a && {
      label: `Plasma — ${context.stage2a.predicted_class === "AMYLOID_POSITIVE" ? "A+" : "A−"}`,
      variant: context.stage2a.predicted_class === "AMYLOID_POSITIVE" ? "destructive" : "outline",
    },
  ].filter(Boolean) as { label: string; variant: "destructive" | "secondary" | "outline" }[];

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
            <Button variant="ghost" size="sm" onClick={onRefresh} disabled={isLoading} className="text-xs">
              {isLoading ? <LoadingSpinner className="w-3 h-3" /> : "↻ Refresh"}
            </Button>
          )}
        </div>
        {contextBadges.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {contextBadges.map((b) => (
              <Badge key={b.label} variant={b.variant} className="text-xs">{b.label}</Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <Separator />

      <CardContent className="pt-4 space-y-4">
        {!hasContext && (
          <p className="text-sm text-muted-foreground italic">
            No upstream stage data available. Run at least one diagnostic stage.
          </p>
        )}

        {hasContext && isLoading && (
          <div className="flex items-center gap-3 py-6 justify-center text-muted-foreground">
            <LoadingSpinner className="w-3 h-3" />
            <span className="text-sm">Generating clinical summary…</span>
          </div>
        )}

        {hasContext && !isLoading && error && <ErrorMessage message={error} />}

        {hasContext && !isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-6">
            <p className="text-sm text-muted-foreground">Summary not yet generated.</p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>Generate Summary</Button>
            )}
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-5">
            {/* Tier */}
            {tier && (
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Clinical Tier</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{tierLabelEn}</p>
                  {tierLabelKo && <p className="text-xs text-muted-foreground">{tierLabelKo}</p>}
                </div>
                <Badge variant={tierBadgeVariant}>{tier.replace(/_/g, " ")}</Badge>
              </div>
            )}

            {/* Amyloid prob + confidence */}
            {amyloidProb > 0 && (
              <div className="rounded-md border border-border px-4 py-3 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Calibrated P(Amyloid+)
                </p>
                <p className="text-2xl font-bold text-foreground tabular-nums">
                  {Math.round(amyloidProb * 100)}%
                </p>
                {confidenceBand && (
                  <p className="text-xs text-muted-foreground">{confidenceBand}</p>
                )}
              </div>
            )}

            {/* Contributing factors */}
            {contributing.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Contributing Factors
                </p>
                <ul className="space-y-1">
                  {contributing.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary mt-0.5">•</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Top features by stage */}
            {Object.keys(topFeatures).length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Key Predictive Features
                </p>
                {Object.entries(topFeatures).map(([stage, features]) => (
                  <div key={stage} className="rounded-md border border-border px-4 py-3">
                    <p className="text-xs font-medium text-foreground mb-1">{stage}</p>
                    <ol className="space-y-0.5">
                      {features.map((f: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span className="font-medium text-foreground">{i + 1}.</span>{f}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}