"use client";

import { useState, FormEvent } from "react";
import { BPCategoryInput } from "@/features/cardiology/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  onSubmit: (data: BPCategoryInput) => void;
  loading?: boolean;
};

export default function BPCategoryForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState("");

  const [formData, setFormData] = useState<Omit<BPCategoryInput, "patient_id">>({
    systolic_bp: 120,
    diastolic_bp: 80,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Pressure Category Assessment</CardTitle>
      </CardHeader>

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

          {/* Systolic BP */}
          <div>
            <Label>Systolic BP: {formData.systolic_bp} mmHg</Label>
            <Slider
              value={[formData.systolic_bp]}
              min={70}
              max={250}
              step={1}
              onValueChange={(val) => handleChange("systolic_bp", val[0])}
            />
          </div>

          {/* Diastolic BP */}
          <div>
            <Label>Diastolic BP: {formData.diastolic_bp} mmHg</Label>
            <Slider
              value={[formData.diastolic_bp]}
              min={40}
              max={150}
              step={1}
              onValueChange={(val) => handleChange("diastolic_bp", val[0])}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Assessing..." : "🫀 Assess BP Category"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}