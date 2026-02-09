"use client";

import { useState, FormEvent } from "react";
import { AlzheimerDiagnosisExtendedInput } from "@/features/alzheimer/types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (data: AlzheimerDiagnosisExtendedInput) => void;
  loading?: boolean;
};

export default function DiagExtendedForm({ onSubmit, loading = false }: Props) {
  const [formData, setFormData] = useState<AlzheimerDiagnosisExtendedInput>({
    patient_id: null,
    AGE: 72,
    MMSE: 25,
    FAQ: 4,
    PTEDUCAT: 14,
    PTGENDER: "male",
    APOE4: 1,
    RAVLT_immediate: 32,
    MOCA: 24,
    ADAS13: 12,
    Hippocampus: 6000,
    Ventricles: 45000,
    WholeBrain: 950000,
    Entorhinal: 3500,
    FDG: 1.25,
    AV45: 1.35,
    PIB: 1.28,
    FBB: 1.2,
    ABETA: 180,
    TAU: 350,
    PTAU: 55,
    mPACCdigit: 0.45,
    mPACCtrailsB: -0.6,
  });

  const handleChange = (key: keyof AlzheimerDiagnosisExtendedInput, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const sliderFields: Array<[keyof AlzheimerDiagnosisExtendedInput, string, number, number, number]> = [
    ["AGE", "Age", 0, 120, 1],
    ["MMSE", "MMSE", 0, 30, 1],
    ["FAQ", "FAQ", 0, 30, 0.1],
    ["PTEDUCAT", "Years of Education", 0, 30, 1],
    ["RAVLT_immediate", "RAVLT Immediate", 0, 50, 1],
    ["MOCA", "MOCA", 0, 30, 1],
    ["ADAS13", "ADAS13", 0, 100, 0.1],
    ["Hippocampus", "Hippocampus", 0, 10000, 1],
    ["Ventricles", "Ventricles", 0, 100000, 10],
    ["WholeBrain", "Whole Brain", 0, 2000000, 1000],
    ["Entorhinal", "Entorhinal", 0, 10000, 1],
    ["FDG", "FDG", 0, 5, 0.01],
    ["AV45", "AV45", 0, 5, 0.01],
    ["PIB", "PIB", 0, 5, 0.01],
    ["FBB", "FBB", 0, 5, 0.01],
    ["ABETA", "ABETA", 0, 1000, 1],
    ["TAU", "TAU", 0, 1000, 1],
    ["PTAU", "PTAU", 0, 100, 0.1],
    ["mPACCdigit", "mPACCdigit", -5, 5, 0.01],
    ["mPACCtrailsB", "mPACCtrailsB", -5, 5, 0.01],
  ];

  return (
    <Card className="p-6 rounded-2xl shadow-md max-w-3xl mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gender */}
          <div>
            <Label htmlFor="PTGENDER">Gender</Label>
            <select
              id="PTGENDER"
              value={formData.PTGENDER}
              onChange={(e) => handleChange("PTGENDER", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* APOE4 */}
          <div>
            <Label htmlFor="APOE4">APOE4 Allele Count: {formData.APOE4}</Label>
            <input
              id="APOE4"
              type="range"
              min={0}
              max={2}
              step={1}
              value={formData.APOE4}
              onChange={(e) => handleChange("APOE4", Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Sliders */}
          {sliderFields.map(([key, label, min, max, step]) => (
            <div key={key}>
              <Label htmlFor={key}>
                {label}: {formData[key] ?? 0}
              </Label>
              <input
                id={key}
                type="range"
                min={min}
                max={max}
                step={step}
                value={formData[key] ?? 0}
                onChange={(e) => handleChange(key, Number(e.target.value))}
                className="w-full"
              />
            </div>
          ))}

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Assessing..." : "🧠 Assess Extended Diagnosis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
