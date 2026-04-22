"use client";

import { useState, FormEvent } from "react";
import { AlzheimerUnifiedPrognosisInput, PrognosisHorizon } from "@/features/alzheimer/types";

import { Card, CardContent } from "@/components/ui/card";
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

type Props = {
  onSubmit: (data: AlzheimerUnifiedPrognosisInput) => void;
  loading?: boolean;
};

export default function PrognosisForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState("");

  const [formData, setFormData] = useState<AlzheimerUnifiedPrognosisInput>({
    patient_id: undefined,
    horizon: "1yr",

    AGE: 70,
    PTGENDER: "female",
    PTEDUCAT: 12,

    ADAS13: 10,
    MOCA: 25,

    APOE4_count: 1,
    GDTOTAL: 3,
  });

  const handleChange = <K extends keyof AlzheimerUnifiedPrognosisInput>(
    key: K,
    value: AlzheimerUnifiedPrognosisInput[K]
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
              placeholder="e.g. pt-1001"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Horizon */}
          <div className="space-y-2">
            <Label>Prediction Horizon</Label>
            <Select
              value={formData.horizon}
              onValueChange={(v) => handleChange("horizon", v as PrognosisHorizon)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1yr">1 Year</SelectItem>
                <SelectItem value="3yr">3 Years</SelectItem>
                <SelectItem value="5yr">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* AGE */}
          <div className="space-y-2">
            <Label>Age: {formData.AGE}</Label>
            <Slider
              min={40}
              max={100}
              step={1}
              value={[formData.AGE]}
              onValueChange={(v) => handleChange("AGE", v[0])}
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select
              value={formData.PTGENDER}
              onValueChange={(v) =>
                handleChange("PTGENDER", v as "male" | "female")
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

          {/* Education */}
          <div className="space-y-2">
            <Label>Years of Education: {formData.PTEDUCAT}</Label>
            <Slider
              min={0}
              max={30}
              step={1}
              value={[formData.PTEDUCAT]}
              onValueChange={(v) => handleChange("PTEDUCAT", v[0])}
            />
          </div>

          {/* ADAS13 */}
          <div className="space-y-2">
            <Label>ADAS13: {formData.ADAS13}</Label>
            <Slider
              min={0}
              max={85}
              step={1}
              value={[formData.ADAS13]}
              onValueChange={(v) => handleChange("ADAS13", v[0])}
            />
          </div>

          {/* MOCA */}
          <div className="space-y-2">
            <Label>MOCA: {formData.MOCA}</Label>
            <Slider
              min={0}
              max={30}
              step={1}
              value={[formData.MOCA]}
              onValueChange={(v) => handleChange("MOCA", v[0])}
            />
          </div>

          {/* APOE4 */}
          <div className="space-y-2">
            <Label>APOE4 Count: {formData.APOE4_count}</Label>
            <Slider
              min={0}
              max={2}
              step={1}
              value={[formData.APOE4_count]}
              onValueChange={(v) =>
                handleChange("APOE4_count", v[0] as 0 | 1 | 2)
              }
            />
          </div>

          {/* GDTOTAL */}
          <div className="space-y-2">
            <Label>Global Deterioration: {formData.GDTOTAL}</Label>
            <Slider
              min={1}
              max={7}
              step={0.1}
              value={[formData.GDTOTAL]}
              onValueChange={(v) => handleChange("GDTOTAL", v[0])}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? "Predicting..."
              : `🧠 Predict ${formData.horizon.replace("yr", "-Year")} Progression`}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}