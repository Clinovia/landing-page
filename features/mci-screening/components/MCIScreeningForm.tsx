"use client";

import { useState, FormEvent } from "react";
import type { MCIScreeningInput } from "@/lib/api/mci-screening";

import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  onSubmit: (data: MCIScreeningInput) => void;
  loading?: boolean;
};

export default function MCIScreeningForm({
  onSubmit,
  loading = false,
}: Props) {
  const [patientId, setPatientId] = useState("");
  const [rawInputs, setRawInputs] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<
    Omit<MCIScreeningInput, "patient_id">
  >({
    AGE: 72,
    PTGENDER: 0,
    MMSE: 26,
    RAVLT_immediate: 35,
  });

  const handleSliderChange = (
    key: keyof typeof formData,
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    setRawInputs((prev) => ({
      ...prev,
      [key]: String(value),
    }));
  };

  const handleStep = (
    key: keyof typeof formData,
    step: number,
    min: number,
    max: number
  ) => {
    const current = formData[key] as number;
    const next = Math.min(max, Math.max(min, current + step));

    const rounded = Math.round(next / step) * step;
    const display = parseFloat(rounded.toPrecision(10));

    setFormData((prev) => ({
      ...prev,
      [key]: display,
    }));

    setRawInputs((prev) => ({
      ...prev,
      [key]: String(display),
    }));
  };

  const handleRawInput = (
    key: keyof typeof formData,
    raw: string,
    min: number,
    max: number
  ) => {
    setRawInputs((prev) => ({
      ...prev,
      [key]: raw,
    }));

    const parsed = Number(raw);

    if (raw !== "" && raw !== "-" && !isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));

      setFormData((prev) => ({
        ...prev,
        [key]: clamped,
      }));
    }
  };

  const handleRawBlur = (
    key: keyof typeof formData,
    min: number,
    max: number
  ) => {
    const raw = rawInputs[key];
    const parsed = Number(raw);

    if (!raw || isNaN(parsed)) {
      setRawInputs((prev) => ({
        ...prev,
        [key]: String(formData[key]),
      }));
    } else {
      const clamped = Math.min(max, Math.max(min, parsed));

      setFormData((prev) => ({
        ...prev,
        [key]: clamped,
      }));

      setRawInputs((prev) => ({
        ...prev,
        [key]: String(clamped),
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      patient_id: patientId.trim() || undefined,
    });
  };

  const sliderFields: Array<
    [
      keyof typeof formData,
      string,
      number,
      number,
      number,
      string?
    ]
  > = [
    ["AGE", "Age", 40, 90, 1],
    ["MMSE", "MMSE Score", 0, 30, 1],
    [
      "RAVLT_immediate",
      "RAVLT Immediate Recall",
      0,
      75,
      1,
      "Sum of trials 1–5",
    ],
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Patient ID */}
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

          {/* Sex */}
          <div className="space-y-2">
            <Label>Sex</Label>

            <Select
              value={String(formData.PTGENDER)}
              onValueChange={(v) =>
                setFormData((prev) => ({
                  ...prev,
                  PTGENDER: Number(v) as 0 | 1,
                }))
              }
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

          {/* Numeric sliders */}
          {sliderFields.map(
            ([key, label, min, max, step, hint]) => {
              const value = formData[key] as number;
              const rawValue = rawInputs[key] ?? String(value);

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Label>{label}</Label>

                      {hint && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {hint}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center overflow-hidden rounded border text-sm">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={rawValue}
                        onChange={(e) =>
                          handleRawInput(
                            key,
                            e.target.value,
                            min,
                            max
                          )
                        }
                        onBlur={() =>
                          handleRawBlur(key, min, max)
                        }
                        className="w-24 px-2 py-1 text-right focus:outline-none"
                      />

                      <div className="flex flex-col border-l">
                        <button
                          type="button"
                          onClick={() =>
                            handleStep(key, step, min, max)
                          }
                          className="border-b px-2 py-0.5 text-xs hover:bg-muted"
                        >
                          ▲
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleStep(key, -step, min, max)
                          }
                          className="px-2 py-0.5 text-xs hover:bg-muted"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </div>

                  <Slider
                    min={min}
                    max={max}
                    step={step}
                    value={[value]}
                    onValueChange={(v) =>
                      handleSliderChange(key, v[0])
                    }
                  />

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{min}</span>
                    <span>{max}</span>
                  </div>
                </div>
              );
            }
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Running model…"
              : "🧠 Run Clinical Screening"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}