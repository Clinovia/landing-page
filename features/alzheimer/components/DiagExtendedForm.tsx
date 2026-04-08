"use client";

import { useState, FormEvent } from "react";
import { AlzheimerDiagnosisExtendedInput, Gender } from "@/features/alzheimer/types";
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
  onSubmit: (data: AlzheimerDiagnosisExtendedInput) => void;
  loading?: boolean;
};

export default function DiagExtendedForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState("");

  const [formData, setFormData] = useState<Omit<
    AlzheimerDiagnosisExtendedInput,
    "patient_id"
  >>({
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

  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      patient_id: patientId.trim() || undefined,
    });
  };

  const sliderFields: Array<
    [keyof typeof formData, string, number, number, number]
  > = [
    ["AGE", "Age", 18, 120, 1],
    ["MMSE", "MMSE", 0, 30, 1],
    ["FAQ", "FAQ", 0, 30, 0.1],
    ["PTEDUCAT", "Education (years)", 0, 30, 1],
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
              placeholder="e.g. pt-2001"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select
              value={formData.PTGENDER}
              onValueChange={(v) => handleChange("PTGENDER", v as Gender)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* APOE4 */}
          <div className="space-y-2">
            <Label>APOE4 Allele Count: {formData.APOE4}</Label>
            <Slider
              min={0}
              max={2}
              step={1}
              value={[formData.APOE4]}
              onValueChange={(v) => handleChange("APOE4", v[0])}
            />
          </div>

          {/* Dynamic Sliders */}
          {sliderFields.map(([key, label, min, max, step]) => (
            <div key={key} className="space-y-2">
              <Label>
                {label}: {formData[key]}
              </Label>
              <Slider
                min={min}
                max={max}
                step={step}
                value={[formData[key] as number]}
                onValueChange={(v) => handleChange(key, v[0])}
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