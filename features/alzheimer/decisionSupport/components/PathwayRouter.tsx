"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { PathwayRouterProps } from "../types";

function TimelineStep({ step, label, isActive }: { step: number; label: string; isActive?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 border-2 ${
        isActive ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"
      }`}>
        {step}
      </div>
      <span className={`text-sm ${isActive ? "font-medium text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}

export function PathwayRouter({
  context,
  data,
  isLoading,
  error,
  onRefresh,
}: PathwayRouterProps) {
  const raw = data as any;

  // Backend returns TreatmentPathwayRouter output:
  // suggested_diagnosis_code, referrals[], drugs[], lifestyle[], facility_guidance, reasoning[]
  const diagCode = raw?.suggested_diagnosis_code;
  const referrals: any[] = raw?.referrals ?? [];
  const drugs: any[] = raw?.drugs ?? [];
  const facilityGuidance = raw?.facility_guidance;
  const reasoning: string[] = raw?.reasoning ?? [];

  const steps = [
    { label: "Stage 1 — Clinical Screening", done: !!context.stage1 },
    { label: "Stage 2B — MRI (Neurodegeneration, N)", done: !!context.stage2b },
    { label: "Stage 2A — Plasma (Amyloid, A)", done: !!context.stage2a },
  ];

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Treatment Pathway Router
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-0.5">
              NHI-aware pathway recommendation based on tier and stage
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
            <span className="text-sm">Determining pathway…</span>
          </div>
        )}

        {!isLoading && error && <ErrorMessage message={error} />}

        {!isLoading && !error && !data && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-sm text-muted-foreground">Pathway not yet determined.</p>
            {onRefresh && (
              <Button size="sm" variant="outline" onClick={onRefresh}>Get Pathway</Button>
            )}
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-5">
            {/* Pipeline progress */}
            <div className="space-y-3">
              {steps.map((s, i) => (
                <TimelineStep key={i} step={i + 1} label={s.label} isActive={s.done} />
              ))}
            </div>

            <Separator />

            {/* Diagnosis code */}
            {diagCode && (
              <div className="rounded-md border border-border px-4 py-3 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Suggested Diagnosis Code</p>
                <p className="text-sm font-semibold text-foreground">
                  {diagCode.icd10} — {diagCode.description}
                </p>
                {diagCode.review_required && (
                  <p className="text-xs text-amber-600">⚠ Specialist review required before filing</p>
                )}
              </div>
            )}

            {/* Referrals */}
            {referrals.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Referrals ({referrals.length})
                </p>
                {referrals.map((r: any, i: number) => (
                  <div key={i} className="rounded-md border border-border px-4 py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{r.label_en ?? "—"}</p>
                      <Badge variant="secondary">{r.urgency_weeks ?? "—"}w</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{r.label_ko}</p>
                    {r.nhi_billing?.code && (
                      <p className="text-xs text-muted-foreground">NHI: {r.nhi_billing.code} — {r.nhi_billing.coverage}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Eligible drugs */}
            {drugs.filter((d: any) => d.eligible).length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Eligible Medications
                </p>
                {drugs.filter((d: any) => d.eligible).map((d: any, i: number) => (
                  <div key={i} className="rounded-md border border-border px-4 py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{d.label_en ?? "—"}</p>
                      {d.nhi_covered && <Badge variant="outline">NHI Covered</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{d.label_ko}</p>
                    {d.starting_dose && (
                      <p className="text-xs text-muted-foreground">Starting dose: {d.starting_dose}</p>
                    )}
                    {d.apoe4_warning && (
                      <p className="text-xs text-destructive">⚠ APOE4 ARIA risk — specialist review required</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Facility guidance */}
            {facilityGuidance?.upgrade_required && (
              <Alert>
                <AlertDescription className="text-sm text-foreground leading-relaxed">
                  {facilityGuidance.upgrade_message ?? "Referral to higher-level facility recommended."}
                </AlertDescription>
              </Alert>
            )}

            {/* Reasoning (collapsed) */}
            {reasoning.length > 0 && (
              <details className="text-xs text-muted-foreground">
                <summary className="cursor-pointer hover:text-foreground">
                  Show reasoning ({reasoning.length} steps)
                </summary>
                <ul className="mt-2 space-y-1 pl-3 border-l border-border">
                  {reasoning.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </details>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}