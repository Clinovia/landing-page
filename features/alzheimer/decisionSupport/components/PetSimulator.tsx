"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { PetSimulatorProps } from "../types";

function GaugeArc({ pct }: { pct: number }) {
  const radius = 54;
  const cx = 70;
  const cy = 70;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - Math.min(100, Math.max(0, pct)) / 100);
  const color =
    pct >= 70 ? "stroke-destructive" : pct >= 40 ? "stroke-amber-500" : "stroke-emerald-500";

  return (
    <svg viewBox="0 0 140 80" className="w-48 mx-auto" aria-hidden>
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round"
        className="text-muted stroke-current opacity-20"
      />
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={offset}
        className={color} style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="700"
        className="fill-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>
        {pct}%
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
        PET Value Score
      </text>
    </svg>
  );
}

export function PetSimulator({
  context,
  data,
  isLoading,
  error,
  onRefresh,
}: PetSimulatorProps) {
  const raw = data as any;

  // Backend returns: pet_value_level, recommended_action, reason_summary[], visual_state, raw_score
  const petValueLevel: string = raw?.pet_value_level ?? "LOW";
  const recommendedAction: string = raw?.recommended_action ?? "";
  const reasons: string[] = raw?.reason_summary ?? [];
  const rawScore: number = raw?.raw_score ?? 0;

  // Map level to gauge pct
  const pct = petValueLevel === "HIGH" ? 85 : petValueLevel === "MODERATE" ? 55 : 20;

  const levelConfig = {
    HIGH:     { text: "PET Recommended",     variant: "destructive" as const },
    MODERATE: { text: "PET May Help",         variant: "secondary" as const },
    LOW:      { text: "PET Low Value",        variant: "outline" as const },
  }[petValueLevel] ?? { text: petValueLevel, variant: "outline" as const };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              PET Cost-Benefit Simulator
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              Expected value of confirmatory amyloid PET given current clinical profile
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
            <span className="text-sm">Simulating PET value…</span>
          </div>
        )}

        {!isLoading && error && <ErrorMessage message={error} />}

        {!isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-sm text-muted-foreground">PET simulation not yet run.</p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>Run Simulation</Button>
            )}
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-5">
            <div className="flex flex-col items-center gap-2 pt-2">
              <GaugeArc pct={pct} />
              <Badge variant={levelConfig.variant}>{levelConfig.text}</Badge>
            </div>

            {recommendedAction && (
              <Alert>
                <AlertDescription className="text-sm text-foreground leading-relaxed">
                  {recommendedAction}
                </AlertDescription>
              </Alert>
            )}

            {reasons.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Factors
                </p>
                <ul className="space-y-1">
                  {reasons.map((r: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-right">
              Raw score: {rawScore}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}