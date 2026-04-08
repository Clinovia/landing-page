"use client";

import { useState, FormEvent } from "react";
import { ECGInterpretationInput } from "@/features/cardiology/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onSubmit: (data: ECGInterpretationInput) => void;
  loading?: boolean;
};

export default function ECGInterpretationForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState<string>("");

  const [formData, setFormData] = useState<Omit<ECGInterpretationInput, "patient_id">>({
    heart_rate: 70,
    qrs_duration: 100,
    qt_interval: 400,
    pr_interval: 160,
    rhythm: "sinus",
    st_elevation: false,
    t_wave_inversion: false,
  });

  const handleChange = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      patient_id: patientId.trim() || undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ECG Interpretation</CardTitle>
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

          {/* Heart Rate */}
          <div>
            <Label>Heart Rate: {formData.heart_rate} bpm</Label>
            <Slider
              value={[formData.heart_rate ?? 70]}
              min={20}
              max={300}
              step={1}
              onValueChange={(val) => handleChange("heart_rate", val[0])}
            />
          </div>

          {/* QRS Duration */}
          <div>
            <Label>QRS Duration: {formData.qrs_duration} ms</Label>
            <Slider
              value={[formData.qrs_duration ?? 100]}
              min={50}
              max={200}
              step={1}
              onValueChange={(val) => handleChange("qrs_duration", val[0])}
            />
          </div>

          {/* QT Interval */}
          <div>
            <Label>QT Interval: {formData.qt_interval} ms</Label>
            <Slider
              value={[formData.qt_interval ?? 400]}
              min={300}
              max={600}
              step={1}
              onValueChange={(val) => handleChange("qt_interval", val[0])}
            />
          </div>

          {/* PR Interval */}
          <div>
            <Label>PR Interval: {formData.pr_interval} ms</Label>
            <Slider
              value={[formData.pr_interval ?? 160]}
              min={80}
              max={400}
              step={1}
              onValueChange={(val) => handleChange("pr_interval", val[0])}
            />
          </div>

          {/* Rhythm */}
          <div className="space-y-2">
            <Label>Rhythm</Label>
            <Select
              value={formData.rhythm}
              onValueChange={(v) => handleChange("rhythm", v as typeof formData.rhythm)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sinus">Sinus</SelectItem>
                <SelectItem value="afib">Atrial Fibrillation</SelectItem>
                <SelectItem value="flutter">Atrial Flutter</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.st_elevation}
                onCheckedChange={(checked) => handleChange("st_elevation", Boolean(checked))}
              />
              <Label>ST Elevation</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.t_wave_inversion}
                onCheckedChange={(checked) => handleChange("t_wave_inversion", Boolean(checked))}
              />
              <Label>T Wave Inversion</Label>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "🫀 Submit ECG"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}