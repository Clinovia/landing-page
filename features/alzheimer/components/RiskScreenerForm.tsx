"use client";

import { useState, FormEvent } from "react";
import { AlzheimerRiskScreenerInput } from "@/features/alzheimer/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  onSubmit: (data: AlzheimerRiskScreenerInput) => void;
  loading?: boolean;
};

export default function AlzheimerRiskForm({ onSubmit, loading = false }: Props) {
  const [patientId, setPatientId] = useState("");
  const [formData, setFormData] = useState<Omit<AlzheimerRiskScreenerInput, "patient_id">>({
    age: 65,
    gender: "female",
    education_years: 16,
    apoe4_status: false,
    memory_score: 26,
    hippocampal_volume: 3500,
  });

  const handleChange = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...formData, patient_id: patientId.trim() || undefined });
  };

  return (
    <Card className="p-6 rounded-2xl shadow-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient ID */}
          <div>
            <label className="block font-medium">Patient ID (optional)</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="e.g. pt-1001"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium">Age: {formData.age}</label>
            <input
              type="range"
              min={40}
              max={90}
              value={formData.age}
              onChange={(e) => handleChange("age", Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value as "male" | "female")}
              className="w-full border rounded p-2"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* Education Years */}
          <div>
            <label className="block font-medium">Years of Education: {formData.education_years}</label>
            <input
              type="range"
              min={0}
              max={30}
              value={formData.education_years}
              onChange={(e) => handleChange("education_years", Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* APOE4 Status */}
          <div>
            <label className="block font-medium">
              APOE4 Status: {formData.apoe4_status ? "Positive" : "Negative"}
            </label>
            <input
              type="checkbox"
              checked={formData.apoe4_status}
              onChange={(e) => handleChange("apoe4_status", e.target.checked)}
              className="mt-1"
            />
          </div>

          {/* Memory Score */}
          <div>
            <label className="block font-medium">Memory Score: {formData.memory_score}</label>
            <input
              type="range"
              min={0}
              max={30}
              step={0.5}
              value={formData.memory_score}
              onChange={(e) => handleChange("memory_score", Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Hippocampal Volume */}
          <div>
            <label className="block font-medium">Hippocampal Volume: {formData.hippocampal_volume}</label>
            <input
              id="hippocampal_volume"
              type="range"
              min={2000}
              max={5000}
              step={10}
              value={formData.hippocampal_volume ?? 2000} // fallback if null
              onChange={(e) =>
                handleChange("hippocampal_volume", Number(e.target.value))
              }
              className="w-full"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Assessing..." : "🧠 Assess Alzheimer's Risk"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}