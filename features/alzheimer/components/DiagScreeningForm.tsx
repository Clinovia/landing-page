"use client";

import { useState, FormEvent } from "react";
import { Race, Gender, AlzheimerDiagnosisFormData, mapFormToBackend } from "@/features/alzheimer/types";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (data: any) => void; // Accept backend type
  loading?: boolean;
};

const raceMap: Record<number, string> = {
  1: "American Indian",
  2: "African American",
  3: "Asian",
  4: "Pacific Islander",
  5: "Caucasian",
  6: "More than one race",
  7: "Unknown",
};

export default function DiagnosisScreeningForm({ onSubmit, loading = false }: Props) {
  const [formData, setFormData] = useState<AlzheimerDiagnosisFormData>({
    age: 75,
    educationYears: 16,
    mocaScore: 26,
    adas13Score: 10,
    cdrSum: 1,
    faqTotal: 5,
    gender: "female",
    race: 5,
  });

  const handleChange = <K extends keyof AlzheimerDiagnosisFormData>(
    key: K,
    value: AlzheimerDiagnosisFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(mapFormToBackend(formData));
  };

  return (
    <Card className="p-6 rounded-2xl shadow-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div className="space-y-2">
            <Label>Age: {formData.age}</Label>
            <Slider
              min={50}
              max={95}
              step={1}
              value={[formData.age]}
              onValueChange={(v) => handleChange("age", v[0])}
            />
          </div>

          {/* Education Years */}
          <div className="space-y-2">
            <Label>Years of Education: {formData.educationYears}</Label>
            <Slider
              min={6}
              max={20}
              step={1}
              value={[formData.educationYears]}
              onValueChange={(v) => handleChange("educationYears", v[0])}
            />
          </div>

          {/* MoCA */}
          <div className="space-y-2">
            <Label>MoCA Score: {formData.mocaScore}</Label>
            <Slider
              min={0}
              max={30}
              step={1}
              value={[formData.mocaScore]}
              onValueChange={(v) => handleChange("mocaScore", v[0])}
            />
          </div>

          {/* ADAS13 */}
          <div className="space-y-2">
            <Label>ADAS13 Score: {formData.adas13Score}</Label>
            <Slider
              min={0}
              max={70}
              step={0.5}
              value={[formData.adas13Score]}
              onValueChange={(v) => handleChange("adas13Score", v[0])}
            />
          </div>

          {/* CDR Sum */}
          <div className="space-y-2">
            <Label>CDR Sum: {formData.cdrSum}</Label>
            <Slider
              min={0}
              max={18}
              step={0.5}
              value={[formData.cdrSum]}
              onValueChange={(v) => handleChange("cdrSum", v[0])}
            />
          </div>

          {/* FAQ */}
          <div className="space-y-2">
            <Label>FAQ Total: {formData.faqTotal}</Label>
            <Slider
              min={0}
              max={30}
              step={1}
              value={[formData.faqTotal]}
              onValueChange={(v) => handleChange("faqTotal", v[0])}
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(v) => handleChange("gender", v as Gender)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Race */}
          <div className="space-y-2">
            <Label>Race</Label>
            <Select
              value={String(formData.race)}
              onValueChange={(v) => handleChange("race", Number(v) as Race)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select race" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(raceMap).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Predicting..." : "Predict"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
