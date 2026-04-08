"use client";

import { useState, FormEvent } from "react";
import { CHA2DS2VAScInput } from "@/features/cardiology/types";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gender } from "@/features/alzheimer/types";

type Props = {
  onSubmit: (data: CHA2DS2VAScInput) => void;
  loading?: boolean;
};

export default function CHA2DS2VAScForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState("");

  const [formData, setFormData] = useState<Omit<CHA2DS2VAScInput, "patient_id">>({
    age: 65,
    gender: "female",
    congestive_heart_failure: false,
    hypertension: false,
    diabetes: false,
    stroke_tia_thromboembolism: false,
    vascular_disease: false,
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

          {/* Age */}
          <div className="space-y-2">
            <Label>Age: {formData.age}</Label>
            <Slider
              min={18}
              max={120}
              step={1}
              value={[formData.age]}
              onValueChange={(v) => handleChange("age", v[0])}
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
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clinical Risk Factors */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.congestive_heart_failure}
                onCheckedChange={(v) =>
                  handleChange("congestive_heart_failure", Boolean(v))
                }
              />
              <Label>Congestive Heart Failure</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.hypertension}
                onCheckedChange={(v) =>
                  handleChange("hypertension", Boolean(v))
                }
              />
              <Label>Hypertension</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.diabetes}
                onCheckedChange={(v) =>
                  handleChange("diabetes", Boolean(v))
                }
              />
              <Label>Diabetes</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.stroke_tia_thromboembolism}
                onCheckedChange={(v) =>
                  handleChange("stroke_tia_thromboembolism", Boolean(v))
                }
              />
              <Label>Stroke / TIA / Thromboembolism</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.vascular_disease}
                onCheckedChange={(v) =>
                  handleChange("vascular_disease", Boolean(v))
                }
              />
              <Label>Vascular Disease</Label>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Calculating..." : "🫀 Assess CHA₂DS₂-VASc"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}