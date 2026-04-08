"use client";

import { useState, FormEvent } from "react";
import { AlzheimerDiagnosisBasicInput } from "@/features/alzheimer/types";
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
  onSubmit: (data: AlzheimerDiagnosisBasicInput) => void;
  loading?: boolean;
};

export default function DiagBasicForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState("");

  const [formData, setFormData] = useState<Omit<
    AlzheimerDiagnosisBasicInput,
    "patient_id"
  >>({
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
    ["FAQ", "FAQ Score", 0, 30, 0.1],
    ["PTEDUCAT", "Education (years)", 0, 30, 1],
    ["RAVLT_immediate", "RAVLT Immediate Recall", 0, 75, 1],
    ["MOCA", "MoCA Score", 0, 30, 1],
    ["ADAS13", "ADAS13 Score", 0, 100, 0.1],
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
              onValueChange={(v) =>
                handleChange("PTGENDER", v as AlzheimerDiagnosisBasicInput["PTGENDER"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* APOE4 */}
          <div className="space-y-2">
            <Label>APOE4 Allele Count</Label>
            <Select
              value={String(formData.APOE4)}
              onValueChange={(v) => handleChange("APOE4", Number(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-1">Unknown</SelectItem>
                <SelectItem value="0">0 Alleles</SelectItem>
                <SelectItem value="1">1 Allele</SelectItem>
                <SelectItem value="2">2 Alleles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sliders */}
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
            {loading ? "Predicting..." : "🧠 Predict Diagnosis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}