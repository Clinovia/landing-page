"use client";

import { useState, FormEvent } from "react";
import { AlzheimerDiagnosisBasicInput } from "@/features/alzheimer/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Clean label map
const getDisplayLabel = (fieldName: string): string => {
  const labels: Record<string, string> = {
    AGE: "Age",
    MMSE: "MMSE",
    FAQ: "FAQ Score",
    PTEDUCAT: "Education (years)",
    PTGENDER: "Gender",
    APOE4: "APOE4 Allele Count",
    RAVLT_immediate: "RAVLT Immediate Recall",
    MOCA: "MoCA Score",
    ADAS13: "ADAS13 Score",
  };
  return labels[fieldName] || fieldName;
};

type Props = {
  onSubmit: (data: AlzheimerDiagnosisBasicInput) => void;
  loading?: boolean;
};

export default function DiagBasicForm({ onSubmit, loading = false }: Props) {
  const [formData, setFormData] = useState<AlzheimerDiagnosisBasicInput>({
    patient_id: null,
    AGE: 74,
    MMSE: 26,
    FAQ: 3,
    PTEDUCAT: 16,
    PTGENDER: "female",
    APOE4: 1,
    RAVLT_immediate: 35,
    MOCA: 25,
    ADAS13: 10.5,
  });

  const handleChange = (key: keyof AlzheimerDiagnosisBasicInput, value: number | string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6 rounded-2xl shadow-md max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Alzheimer’s Basic Diagnosis</CardTitle>
        <CardDescription>
          Input patient data to predict cognitive class (CN, MCI, AD) using basic features.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* AGE */}
          <div>
            <Label htmlFor="AGE">{getDisplayLabel("AGE")}: {formData.AGE} yrs</Label>
            <input
              type="range"
              min={18}
              max={120}
              value={formData.AGE}
              onChange={(e) => handleChange("AGE", Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="PTGENDER">{getDisplayLabel("PTGENDER")}</Label>
            <select
              id="PTGENDER"
              value={formData.PTGENDER}
              onChange={(e) => handleChange("PTGENDER", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* APOE4 */}
          <div>
            <Label htmlFor="APOE4">{getDisplayLabel("APOE4")}</Label>
            <select
              id="APOE4"
              value={formData.APOE4}
              onChange={(e) => handleChange("APOE4", Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              <option value={-1}>Unknown</option>
              <option value={0}>0 alleles</option>
              <option value={1}>1 allele</option>
              <option value={2}>2 alleles</option>
            </select>
          </div>

          {/* Sliders for numeric features */}
          {["MMSE","FAQ","PTEDUCAT","RAVLT_immediate","MOCA","ADAS13"].map((key) => {
            const minMaxStep: Record<string, [number, number, number]> = {
              MMSE: [0, 30, 1],
              FAQ: [0, 30, 0.1],
              PTEDUCAT: [0, 30, 1],
              RAVLT_immediate: [0, 75, 1],
              MOCA: [0, 30, 1],
              ADAS13: [0, 100, 0.1],
            };
            const [min, max, step] = minMaxStep[key];
            return (
              <div key={key}>
                <Label htmlFor={key}>{getDisplayLabel(key)}: {formData[key as keyof AlzheimerDiagnosisBasicInput]}</Label>
                <input
                  id={key}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={formData[key as keyof AlzheimerDiagnosisBasicInput] as number}
                  onChange={(e) => handleChange(key as keyof AlzheimerDiagnosisBasicInput, Number(e.target.value))}
                  className="w-full"
                />
              </div>
            );
          })}

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Predicting..." : "🧠 Predict Diagnosis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
