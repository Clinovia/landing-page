"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  clinicType: string;
  patientsPerWeek: string;
  currentWorkflow: string;
  goals: string[];
};

const GOALS = [
  "Save time per assessment",
  "Improve diagnostic confidence",
  "Standardize documentation",
  "Reduce manual calculation errors",
  "Explore AI tools for our workflow",
];

const emptyForm: FormData = {
  name: "",
  email: "",
  clinicType: "",
  patientsPerWeek: "",
  currentWorkflow: "",
  goals: [],
};

function isValid(form: FormData) {
  return (
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.clinicType !== "" &&
    form.patientsPerWeek !== "" &&
    form.currentWorkflow !== "" &&
    form.goals.length > 0
  );
}

export default function ApplyPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function toggleGoal(goal: string) {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttempted(true);
    if (!isValid(form)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/v1/pilot-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  }

  const fieldError = (val: string) =>
    attempted && val.trim() === ""
      ? "border-red-300 focus:ring-red-400"
      : "border-gray-200 focus:ring-emerald-500";

  const selectError = (val: string) =>
    attempted && val === ""
      ? "border-red-300 focus:ring-red-400"
      : "border-gray-200 focus:ring-emerald-500";

  // ── Confirmation screen ──────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="min-h-screen bg-white mt-8">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-emerald-700" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Thank you, {form.name.split(" ")[0]}
          </h1>
          <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-2">
            We've received your application and will be in touch shortly to
            schedule your walkthrough.
          </p>
          <p className="text-gray-400 text-sm">
            We'll reach you at{" "}
            <span className="text-gray-600 font-medium">{form.email}</span>
          </p>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white mt-8">
      <div className="max-w-2xl mx-auto px-6 py-16">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Apply for the Clinovia Pilot
        </h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Tell us about your clinic and we'll be in touch to schedule a
          20-minute walkthrough.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-7">

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Your name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Dr. Jane Smith"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${fieldError(form.name)}`}
              />
              {attempted && form.name.trim() === "" && (
                <p className="text-xs text-red-500 mt-1">Required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@clinic.com"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${fieldError(form.email)}`}
              />
              {attempted && form.email.trim() === "" && (
                <p className="text-xs text-red-500 mt-1">Required</p>
              )}
            </div>
          </div>

          {/* Clinic type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What best describes your practice? <span className="text-red-400">*</span>
            </label>
            <select
              value={form.clinicType}
              onChange={(e) => setForm({ ...form, clinicType: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition bg-white ${selectError(form.clinicType)}`}
            >
              <option value="">Select practice type</option>
              <option>Memory clinic</option>
              <option>Neurology practice</option>
              <option>Cardiology clinic</option>
              <option>Preventive care team</option>
              <option>Other</option>
            </select>
            {attempted && form.clinicType === "" && (
              <p className="text-xs text-red-500 mt-1">Please select an option</p>
            )}
          </div>

          {/* Patient volume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How many patients do you see per week? <span className="text-red-400">*</span>
            </label>
            <select
              value={form.patientsPerWeek}
              onChange={(e) => setForm({ ...form, patientsPerWeek: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition bg-white ${selectError(form.patientsPerWeek)}`}
            >
              <option value="">Select patient volume</option>
              <option>Fewer than 50</option>
              <option>50–150</option>
              <option>150–300</option>
              <option>300+</option>
            </select>
            {attempted && form.patientsPerWeek === "" && (
              <p className="text-xs text-red-500 mt-1">Please select an option</p>
            )}
          </div>

          {/* Current workflow */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How do you currently perform assessments? <span className="text-red-400">*</span>
            </label>
            <select
              value={form.currentWorkflow}
              onChange={(e) => setForm({ ...form, currentWorkflow: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition bg-white ${selectError(form.currentWorkflow)}`}
            >
              <option value="">Select current workflow</option>
              <option>Manual calculation</option>
              <option>EHR-based tools</option>
              <option>External software</option>
              <option>Mixed workflow</option>
            </select>
            {attempted && form.currentWorkflow === "" && (
              <p className="text-xs text-red-500 mt-1">Please select an option</p>
            )}
          </div>

          {/* Goals — multi-select checkboxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What are you hoping to improve? <span className="text-red-400">*</span>
              <span className="text-gray-400 font-normal ml-1">(select all that apply)</span>
            </label>
            <div className="space-y-2.5">
              {GOALS.map((goal) => {
                const checked = form.goals.includes(goal);
                return (
                  <label
                    key={goal}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      checked
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition ${
                      checked ? "bg-emerald-700 border-emerald-700" : "border-gray-300"
                    }`}>
                      {checked && (
                        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="white" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleGoal(goal)}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-700">{goal}</span>
                  </label>
                );
              })}
            </div>
            {attempted && form.goals.length === 0 && (
              <p className="text-xs text-red-500 mt-1">Please select at least one goal</p>
            )}
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500 text-center">
              Something went wrong — please try again or email us directly at{" "}
              <a href="mailto:sophe@clinovia.ai" className="underline">
                sophpe@clinovia.ai
              </a>
              .
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-emerald-700 text-white py-3 rounded-lg font-semibold hover:bg-emerald-800 transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            We'll only use your details to prepare for the call and follow up afterward.
          </p>

        </form>
      </div>
    </div>
  );
}