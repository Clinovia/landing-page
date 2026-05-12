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
  // Semi-circle SVG gauge, 0–100
  const radius = 54;
  const cx = 70;
  const cy = 70;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference * (1 - pct / 100);

  const color =
    pct >= 70
      ? "stroke-destructive"
      : pct >= 40
      ? "stroke-amber-500"
      : "stroke-emerald-500";

  return (
    <svg viewBox="0 0 140 80" className="w-48 mx-auto" aria-hidden>
      {/* Track */}
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        className="text-muted stroke-current opacity-20"
      />
      {/* Fill */}
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={color}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      {/* Label */}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        className="fill-foreground"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {pct}%
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fontSize="9"
        className="fill-muted-foreground"
      >
        Expected Positivity
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
  const positivityPct = data
    ? Math.round(data.expected_positivity * 100)
    : 0;

  const positivityLabel =
    positivityPct >= 70
      ? { text: "Likely Positive", variant: "destructive" as const }
      : positivityPct >= 40
      ? { text: "Uncertain", variant: "secondary" as const }
      : { text: "Likely Negative", variant: "outline" as const };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              PET Scan Simulator
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              Estimated amyloid PET positivity based on current clinical profile
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
        {isLoading && (
          <div className="flex items-center gap-3 py-6 justify-center text-muted-foreground">
            <LoadingSpinner className="w-3 h-3" />
            <span className="text-sm">Simulating PET outcome…</span>
          </div>
        )}

        {!isLoading && error && <ErrorMessage message={error} />}

        {!isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-sm text-muted-foreground">PET simulation not yet run.</p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>
                Run Simulation
              </Button>
            )}
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-5">
            {/* Gauge */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <GaugeArc pct={positivityPct} />
              <Badge variant={positivityLabel.variant}>{positivityLabel.text}</Badge>
            </div>

            {/* NNT */}
            {data.nnt !== undefined && (
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Number Needed to Test (NNT)
                    </p>
                    <p className="text-2xl font-bold text-foreground tabular-nums mt-0.5">
                      {data.nnt.toFixed(1)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground max-w-[160px] leading-relaxed">
                      Patients with this profile needed to find one true positive
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Interpretation */}
            <Alert>
              <AlertDescription className="text-sm text-foreground leading-relaxed">
                {positivityPct >= 70
                  ? "High likelihood of amyloid positivity. PET imaging is strongly recommended to confirm before initiating disease-modifying therapy."
                  : positivityPct >= 40
                  ? "Intermediate likelihood. Clinical judgment required — consider additional biomarker evidence before ordering PET."
                  : "Low likelihood of amyloid positivity. PET imaging may not be cost-effective at this risk level."}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}