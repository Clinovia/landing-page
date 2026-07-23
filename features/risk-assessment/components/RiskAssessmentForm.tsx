"use client";

import { FormEvent, useState } from "react";

import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// =============================================================================
// Types
// =============================================================================

export type CognitiveAssessmentInput = {
  patient_id?: string;
  AGE: number;
  PTGENDER: 0 | 1;
  MMSE: number;
  RAVLT_immediate?: number;
  LIMMTOTAL?: number;
  Hippocampus?: number;
  Entorhinal?: number;
  MidTemp?: number;
  WholeBrain?: number;
  Ventricles?: number;
};

type Props = {
  onSubmit: (data: CognitiveAssessmentInput) => void;
  loading?: boolean;
};

// Every slider-backed field in the form, keyed by name.
type FieldKey =
  | "AGE"
  | "MMSE"
  | "RAVLT_immediate"
  | "LIMMTOTAL"
  | "Hippocampus"
  | "Entorhinal"
  | "MidTemp"
  | "WholeBrain"
  | "Ventricles";

type FieldConfig = {
  key: FieldKey;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
};

// -----------------------------------------------------------------------
// Field definitions
// -----------------------------------------------------------------------
// NOTE: MRI ranges below (Hippocampus/Entorhinal/MidTemp/WholeBrain/
// Ventricles) are placeholder volumetric ranges (mm^3) approximating
// typical ADNI FreeSurfer output. Swap in your actual data-derived
// min/max before shipping.

const PATIENT_FIELDS: FieldConfig[] = [
  { key: "AGE", label: "Age", min: 40, max: 90, step: 1, default: 72 },
];

const COGNITIVE_FIELDS: FieldConfig[] = [
  { key: "MMSE", label: "MMSE", min: 0, max: 30, step: 1, default: 26 },
  {
    key: "RAVLT_immediate",
    label: "RAVLT Immediate Recall",
    min: 0,
    max: 75,
    step: 1,
    default: 35,
  },
  {
    key: "LIMMTOTAL",
    label: "LIMM Total",
    min: 0,
    max: 25,
    step: 1,
    default: 12,
  },
];

const MRI_FIELDS: FieldConfig[] = [
  {
    key: "Hippocampus",
    label: "Hippocampus (mm³)",
    min: 2000,
    max: 5000,
    step: 10,
    default: 3500,
  },
  {
    key: "Entorhinal",
    label: "Entorhinal (mm³)",
    min: 1000,
    max: 5000,
    step: 10,
    default: 3000,
  },
  {
    key: "MidTemp",
    label: "Mid Temporal (mm³)",
    min: 10000,
    max: 30000,
    step: 100,
    default: 19000,
  },
  {
    key: "WholeBrain",
    label: "Whole Brain (mm³)",
    min: 700000,
    max: 1300000,
    step: 1000,
    default: 1000000,
  },
  {
    key: "Ventricles",
    label: "Ventricles (mm³)",
    min: 5000,
    max: 100000,
    step: 100,
    default: 30000,
  },
];

// =============================================================================
// Component
// =============================================================================

export default function RiskAssessmentForm({
  onSubmit,
  loading = false,
}: Props) {
  const [patientId, setPatientId] = useState("");

  const [rawInputs, setRawInputs] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Record<FieldKey, number>>(() => {
    const initial: Partial<Record<FieldKey, number>> = {};
    [...PATIENT_FIELDS, ...COGNITIVE_FIELDS, ...MRI_FIELDS].forEach((f) => {
      initial[f.key] = f.default;
    });
    return initial as Record<FieldKey, number>;
  });

  const [sex, setSex] = useState<0 | 1>(0);

  // Optional-field inclusion toggles. A slider's default value is always
  // a valid number, so "optional" is tracked explicitly here rather than
  // inferred from the slider itself.
  const [includeRavlt, setIncludeRavlt] = useState(true);
  const [includeLimm, setIncludeLimm] = useState(false);
  const [includeMri, setIncludeMri] = useState(false);

  const [submitAttempted, setSubmitAttempted] = useState(false);

  // ---------------------------------------------------------------------
  // Slider / raw-text-input handlers
  // ---------------------------------------------------------------------

  const handleSliderChange = (key: FieldKey, value: number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setRawInputs((prev) => ({ ...prev, [key]: String(value) }));
  };

  const handleRawInput = (
    key: FieldKey,
    raw: string,
    min: number,
    max: number
  ) => {
    setRawInputs((prev) => ({ ...prev, [key]: raw }));

    const parsed = Number(raw);

    if (raw !== "" && !isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      setFormData((prev) => ({ ...prev, [key]: clamped }));
    }
  };

  const handleRawBlur = (key: FieldKey, min: number, max: number) => {
    const raw = rawInputs[key];
    const parsed = Number(raw);

    if (!raw || isNaN(parsed)) {
      setRawInputs((prev) => ({
        ...prev,
        [key]: String(formData[key] ?? ""),
      }));
      return;
    }

    const clamped = Math.min(max, Math.max(min, parsed));

    setFormData((prev) => ({ ...prev, [key]: clamped }));
    setRawInputs((prev) => ({ ...prev, [key]: String(clamped) }));
  };

  // ---------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------

  const memoryTestSelected = includeRavlt || includeLimm;
  const isValid = memoryTestSelected;

  // ---------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!isValid) return;

    const payload: CognitiveAssessmentInput = {
      patient_id: patientId.trim() || undefined,
      AGE: formData.AGE,
      PTGENDER: sex,
      MMSE: formData.MMSE,
      ...(includeRavlt
        ? { RAVLT_immediate: formData.RAVLT_immediate }
        : {}),
      ...(includeLimm ? { LIMMTOTAL: formData.LIMMTOTAL } : {}),
      // MRI is all-or-nothing: the section is only ever submitted in full,
      // so a partial MRI feature vector is never sent to the backend.
      ...(includeMri
        ? {
            Hippocampus: formData.Hippocampus,
            Entorhinal: formData.Entorhinal,
            MidTemp: formData.MidTemp,
            WholeBrain: formData.WholeBrain,
            Ventricles: formData.Ventricles,
          }
        : {}),
    };

    onSubmit(payload);
  };

  // ---------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------

  const renderSlider = (field: FieldConfig, required = false) => {
    const { key, label, min, max, step } = field;
    const value = formData[key] ?? min;
    const raw = rawInputs[key] ?? String(value);

    return (
      <div key={key} className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-1">
            {label}
            {required && <span className="text-destructive">*</span>}
          </Label>

          <input
            type="text"
            value={raw}
            onChange={(e) => handleRawInput(key, e.target.value, min, max)}
            onBlur={() => handleRawBlur(key, min, max)}
            className="w-28 rounded border px-2 py-1 text-right text-sm"
          />
        </div>

        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(v) => handleSliderChange(key, v[0])}
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{min.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  const renderOptionalToggle = (
    label: string,
    checked: boolean,
    onChange: (v: boolean) => void
  ) => (
    <label className="flex items-center gap-2 text-sm font-medium cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-input"
      />
      {label}
    </label>
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* ================================================================
              Section 1: Patient Information
          ================================================================ */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold uppercase tracking-wide text-muted-foreground">
              Patient Information
            </h2>

            <div className="space-y-4 pl-8 sm:pl-10">
              <div className="space-y-2">
                <Label>Patient ID (optional)</Label>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="e.g. pt-2001"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>

              {renderSlider(PATIENT_FIELDS[0], true)}

              <div className="space-y-2">
                <Label>
                  Sex <span className="text-destructive">*</span>
                </Label>

                <Select
                  value={String(sex)}
                  onValueChange={(v) => setSex(Number(v) as 0 | 1)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="0">Female</SelectItem>
                    <SelectItem value="1">Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* ================================================================
              Section 2: Cognitive Assessment
          ================================================================ */}
          <section className="mt-6 space-y-4">
            <div>
              <h2 className="text-base font-semibold uppercase tracking-wide text-muted-foreground">
                Cognitive Assessment
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                MMSE is required. At least one of RAVLT Immediate Recall or
                LIMM Total is also required.
              </p>
            </div>

            <div className="space-y-4 pl-8 sm:pl-10">
              {renderSlider(
                COGNITIVE_FIELDS.find((f) => f.key === "MMSE")!,
                true
              )}

              {/* RAVLT - optional, toggled */}
              <div className="rounded-md border p-3 space-y-3">
                {renderOptionalToggle(
                  "Include RAVLT Immediate Recall",
                  includeRavlt,
                  setIncludeRavlt
                )}
                {includeRavlt && (
                  <div className="pl-6">
                    {renderSlider(
                      COGNITIVE_FIELDS.find(
                        (f) => f.key === "RAVLT_immediate"
                      )!
                    )}
                  </div>
                )}
              </div>

              {/* LIMM - optional, toggled */}
              <div className="rounded-md border p-3 space-y-3">
                {renderOptionalToggle(
                  "Include LIMM Total",
                  includeLimm,
                  setIncludeLimm
                )}
                {includeLimm && (
                  <div className="pl-6">
                    {renderSlider(
                      COGNITIVE_FIELDS.find((f) => f.key === "LIMMTOTAL")!
                    )}
                  </div>
                )}
              </div>

              {submitAttempted && !memoryTestSelected && (
                <p className="text-sm text-destructive">
                  Include at least one of RAVLT Immediate Recall or LIMM
                  Total.
                </p>
              )}
            </div>
          </section>

          {/* ================================================================
              Section 3: MRI Features (optional)
          ================================================================ */}
          <section className="mt-6 space-y-4">
            <div>
              <h2 className="text-base font-semibold uppercase tracking-wide text-muted-foreground">
                MRI Features (optional)
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                If any MRI value is provided, all five measurements are
                required — this prevents sending a partial MRI feature
                vector to the model.
              </p>
            </div>

            <div className="pl-8 sm:pl-10">
              <div className="rounded-md border p-3 space-y-4">
                {renderOptionalToggle(
                  "Include MRI Measurements",
                  includeMri,
                  setIncludeMri
                )}

                {includeMri && (
                  <div className="space-y-6 pl-6 pt-2">
                    {MRI_FIELDS.map((f) => renderSlider(f))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <Button
            type="submit"
            disabled={loading}
            className="mt-8 w-full"
          >
            {loading ? "Running model…" : "🧠 Run Risk Assessment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}