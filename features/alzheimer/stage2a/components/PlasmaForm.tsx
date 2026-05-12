"use client";

import { useState, FormEvent } from "react";
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

export type Stage2aPlasmaInput = {
  patient_id?: string;
  PLASMA_ABETA_RATIO: number;
  PLASMA_PTAU217: number;
  PLASMA_GFAP: number;
  PLASMA_NfL: number;
  AGE: number;
  APOE4: 0 | 1 | 2;
  EDUCATION: number;
  MMSE: number;
};

type Props = {
  onSubmit: (data: Stage2aPlasmaInput) => void;
  loading?: boolean;
};

export default function PlasmaForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState("");
  const [rawInputs, setRawInputs] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Omit<Stage2aPlasmaInput, "patient_id">>({
    PLASMA_ABETA_RATIO: 0.08,
    PLASMA_PTAU217: 2.5,
    PLASMA_GFAP: 120,
    PLASMA_NfL: 18,
    AGE: 72,
    APOE4: 1,
    EDUCATION: 16,
    MMSE: 27,
  });

  const handleSliderChange = (key: keyof typeof formData, value: number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setRawInputs((prev) => ({ ...prev, [key]: String(value) }));
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
    setFormData((prev) => ({ ...prev, [key]: display }));
    setRawInputs((prev) => ({ ...prev, [key]: String(display) }));
  };

  const handleRawInput = (
    key: keyof typeof formData,
    raw: string,
    min: number,
    max: number
  ) => {
    setRawInputs((prev) => ({ ...prev, [key]: raw }));
    const parsed = Number(raw);
    if (raw !== "" && raw !== "-" && !isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      setFormData((prev) => ({ ...prev, [key]: clamped }));
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
      setRawInputs((prev) => ({ ...prev, [key]: String(formData[key]) }));
    } else {
      const clamped = Math.min(max, Math.max(min, parsed));
      setFormData((prev) => ({ ...prev, [key]: clamped }));
      setRawInputs((prev) => ({ ...prev, [key]: String(clamped) }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, patient_id: patientId.trim() || undefined });
  };

  const sliderFields: Array<[keyof typeof formData, string, number, number, number]> = [
    ["PLASMA_ABETA_RATIO", "Aβ42/Aβ40 Ratio", 0.02, 0.20, 0.001],
    ["PLASMA_PTAU217", "pTau217 (pg/mL)", 0, 20, 0.1],
    ["PLASMA_GFAP", "GFAP (pg/mL)", 0, 500, 1],
    ["PLASMA_NfL", "Neurofilament Light (pg/mL)", 0, 100, 0.5],
    ["AGE", "Age", 40, 100, 1],
    ["EDUCATION", "Education (years)", 0, 30, 1],
    ["MMSE", "MMSE", 0, 30, 1],
  ];

  return (
    <Card className="p-6 rounded-2xl shadow-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Patient ID */}
          <div className="space-y-2">
            <Label>Patient ID (optional)</Label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="e.g. pt-3001"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* APOE4 */}
          <div className="space-y-2">
            <Label>APOE4 Alleles</Label>
            <Select
              value={String(formData.APOE4)}
              onValueChange={(v) =>
                setFormData((prev) => ({ ...prev, APOE4: Number(v) as 0 | 1 | 2 }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Slider fields */}
          {sliderFields.map(([key, label, min, max, step]) => {
            const value = formData[key] as number;
            const rawValue = rawInputs[key] ?? String(value);

            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label>{label}</Label>

                  {/* Text input + up/down buttons */}
                  <div className="flex items-center border rounded overflow-hidden text-sm">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={rawValue}
                      onChange={(e) => handleRawInput(key, e.target.value, min, max)}
                      onBlur={() => handleRawBlur(key, min, max)}
                      className="w-24 px-2 py-1 text-right focus:outline-none"
                    />
                    <div className="flex flex-col border-l">
                      <button
                        type="button"
                        onClick={() => handleStep(key, step, min, max)}
                        className="px-2 py-0.5 hover:bg-muted text-xs leading-none border-b"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStep(key, -step, min, max)}
                        className="px-2 py-0.5 hover:bg-muted text-xs leading-none"
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
                  onValueChange={(v) => handleSliderChange(key, v[0])}
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              </div>
            );
          })}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Running..." : "🧪 Run Plasma Model"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}