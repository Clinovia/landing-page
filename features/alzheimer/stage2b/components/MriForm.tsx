"use client";

import { useState, FormEvent } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export type Stage2MRIInput = {
  patient_id?: string;
  Hippocampus?: number;
  Entorhinal?: number;
  Ventricles?: number;
  WholeBrain?: number;
  ICV?: number;
  Hippocampus_slope?: number;
  Ventricles_slope?: number;
  WholeBrain_slope?: number;
  AGE?: number;
  APOE4?: 0 | 1 | 2;
};

type Props = {
  onSubmit: (data: Stage2MRIInput) => void;
  loading?: boolean;
};

export default function MriForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState("");
  const [rawInputs, setRawInputs] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Stage2MRIInput>({
    Hippocampus: 4500,
    Entorhinal: 3500,
    Ventricles: 30000,
    WholeBrain: 1000000,
    ICV: 1500000,
    Hippocampus_slope: -120,
    Ventricles_slope: 800,
    WholeBrain_slope: -5000,
    AGE: 72,
    APOE4: 1,
  });

  const handleSliderChange = (key: keyof Stage2MRIInput, value: number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setRawInputs((prev) => ({ ...prev, [key]: String(value) }));
  };

  const handleStep = (key: keyof Stage2MRIInput, step: number, min: number, max: number) => {
    const current = (formData[key] as number) ?? min;
    const next = Math.min(max, Math.max(min, current + step));
    setFormData((prev) => ({ ...prev, [key]: next }));
    setRawInputs((prev) => ({ ...prev, [key]: String(next) }));
  };

  const handleRawInput = (key: keyof Stage2MRIInput, raw: string, min: number, max: number) => {
    setRawInputs((prev) => ({ ...prev, [key]: raw }));
    const parsed = Number(raw);
    if (raw !== "" && raw !== "-" && !isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      setFormData((prev) => ({ ...prev, [key]: clamped }));
    }
  };

  const handleRawBlur = (key: keyof Stage2MRIInput, min: number, max: number) => {
    const raw = rawInputs[key];
    const parsed = Number(raw);
    if (!raw || isNaN(parsed)) {
      const current = formData[key] as number;
      setRawInputs((prev) => ({ ...prev, [key]: String(current) }));
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

  const fields: Array<[keyof Stage2MRIInput, string, number, number, number]> = [
    ["Hippocampus", "Hippocampus Volume", 1000, 8000, 50],
    ["Entorhinal", "Entorhinal Volume", 1000, 6000, 50],
    ["Ventricles", "Ventricular Volume", 5000, 80000, 500],
    ["WholeBrain", "Whole Brain Volume", 800000, 1400000, 5000],
    ["ICV", "ICV", 1000000, 2000000, 5000],
    ["Hippocampus_slope", "Hippocampus Atrophy Rate", -500, 100, 10],
    ["Ventricles_slope", "Ventricular Expansion Rate", 0, 3000, 50],
    ["WholeBrain_slope", "Whole Brain Atrophy Rate", -15000, 0, 200],
    ["AGE", "Age", 40, 100, 1],
  ];

  return (
    <Card className="p-6 rounded-2xl shadow-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Patient ID */}
          <div className="space-y-2">
            <Label>Patient ID (optional)</Label>
            <input
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          {/* APOE4 */}
          <div className="space-y-2">
            <Label>APOE4</Label>
            <Select
              value={String(formData.APOE4 ?? 0)}
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
          {fields.map(([key, label, min, max, step]) => {
            const value = (formData[key] as number) ?? min;
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Running..." : "🧠 Run MRI Model"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}