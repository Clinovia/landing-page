// app/clinical/alzheimer/decision-support/page.tsx
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

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

/**
 * DecisionSupportContext expects optional fields,
 * so empty context must use undefined / omitted values,
 * not null.
 */
const EMPTY_CONTEXT = {};

export default function DecisionSupportPage() {
  const decision = useDecisionSupport(EMPTY_CONTEXT);

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

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Stage 1</Badge>
          <Badge variant="secondary">Stage 2a</Badge>
          <Badge variant="secondary">Stage 2b</Badge>
          <Badge>Clinical AI</Badge>
        </div>
      </div>

      <Separator />

      {/* Top Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Risk Stratification */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Risk Stratification</CardTitle>
          </CardHeader>

          <CardContent>
            <RiskStratification
              context={EMPTY_CONTEXT}
              {...decision.risk}
            />
          </CardContent>
        </Card>

        {/* Uncertainty */}
        <Card>
          <CardHeader>
            <CardTitle>Uncertainty Guard</CardTitle>
          </CardHeader>

          <CardContent>
            <UncertaintyGuard
              context={EMPTY_CONTEXT}
              {...decision.uncertainty}
            />
          </CardContent>
        </Card>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Treatment Pathway */}
        <Card>
          <CardHeader>
            <CardTitle>Treatment Pathway Router</CardTitle>
          </CardHeader>

          <CardContent>
            <PathwayRouter
              context={EMPTY_CONTEXT}
              {...decision.pathway}
            />
          </CardContent>
        </Card>

        {/* PET Simulator */}
        <Card>
          <CardHeader>
            <CardTitle>PET Cost-Benefit Simulator</CardTitle>
          </CardHeader>

          <CardContent>
            <PetSimulator
              context={EMPTY_CONTEXT}
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
            context={EMPTY_CONTEXT}
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
            context={EMPTY_CONTEXT}
            {...decision.communication}
          />
        </CardContent>
      </Card>
    </div>
  );
}