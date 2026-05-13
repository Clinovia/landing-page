"use client";
import {
  ClinicalSummary,
  PathwayRouter,
  PatientCommunication,
  PetSimulator,
  RiskStratification,
  UncertaintyGuard,
} from "@/features/alzheimer/decisionSupport";
import { useDecisionSupport } from "@/features/alzheimer/decisionSupport/hooks/useDecisionSupport";
import { useStageResults } from "@/context/StageResultsContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DecisionSupportPage() {
  const { stage1, stage2a, stage2b } = useStageResults();
  const decision = useDecisionSupport();

  const context = { stage1, stage2a, stage2b };
  const hasAnyResult = !!(stage1 || stage2a || stage2b);

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B4D3E]">
            Alzheimer Decision Support
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Unified clinical workflow integrating Stage 1 clinical screening,
            Stage 2a plasma biomarkers, and Stage 2b MRI neurodegeneration.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant={stage1 ? "default" : "secondary"}>Stage 1</Badge>
          <Badge variant={stage2a ? "default" : "secondary"}>Stage 2a</Badge>
          <Badge variant={stage2b ? "default" : "secondary"}>Stage 2b</Badge>
          <Badge>Clinical AI</Badge>
          {hasAnyResult && (
            <Button
              size="sm"
              variant="outline"
              onClick={decision.fetchAll}
              disabled={decision.isAnyLoading}
            >
              {decision.isAnyLoading ? "Refreshing…" : "↻ Refresh"}
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Empty state */}
      {!hasAnyResult && (
        <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
          <p className="text-sm">
            No stage results yet. Complete at least one assessment (Stage 1, 2a, or 2b)
            to populate the decision support dashboard.
          </p>
        </div>
      )}

      {/* Top Row */}
      {hasAnyResult && (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Risk Stratification</CardTitle>
              </CardHeader>
              <CardContent>
                <RiskStratification
                  context={context}
                  {...decision.risk}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uncertainty Guard</CardTitle>
              </CardHeader>
              <CardContent>
                <UncertaintyGuard
                  context={context}
                  {...decision.uncertainty}
                />
              </CardContent>
            </Card>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Pathway Router</CardTitle>
              </CardHeader>
              <CardContent>
                <PathwayRouter
                  context={context}
                  {...decision.pathway}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PET Cost-Benefit Simulator</CardTitle>
              </CardHeader>
              <CardContent>
                <PetSimulator
                  context={context}
                  {...decision.petSimulation}
                />
              </CardContent>
            </Card>
          </div>

          {/* Clinical Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Clinical Summary Report</CardTitle>
            </CardHeader>
            <CardContent>
              <ClinicalSummary
                context={context}
                {...decision.summary}
              />
            </CardContent>
          </Card>

          {/* Patient Communication */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Communication (한국어)</CardTitle>
            </CardHeader>
            <CardContent>
              <PatientCommunication
                context={context}
                {...decision.communication}
              />
            </CardContent>
          </Card>
        </>
      )}

    </div>
  );
}