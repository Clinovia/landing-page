"use client";
import Link from "next/link";

type Module = {
  name: string;
  description: string;
  inputs: string;
  outputs: string;
};

export default function ModulesPage() {
  const cardiology: Module[] = [
    { name: "ASCVD", description: "Atherosclerotic cardiovascular disease risk calculator", inputs: "Patient demographics, vitals, labs", outputs: "10-year ASCVD risk score" },
    { name: "Blood Pressure Category", description: "Classifies BP readings", inputs: "Systolic & diastolic BP", outputs: "BP category classification" },
    { name: "CHA2DS2VASc", description: "Stroke risk estimation in AF patients", inputs: "Clinical factors", outputs: "Risk score" },
    { name: "ECG Interpreter", description: "Basic ECG interpretation module", inputs: "ECG parameters", outputs: "Interpretation summary" },
  ];

  const neurology: Module[] = [
    { name: "Risk Screener", description: "Neurologic risk screening tool", inputs: "Basic clinical inputs", outputs: "Alzheimer's risk assessment" },
    { name: "Diagnosis Screening", description: "Initial diagnostic triage", inputs: "Symptoms, history", outputs: "CN, MCI, or AD" },
    { name: "Diagnosis Basic", description: "Basic diagnostic model", inputs: "Symptoms, vitals", outputs: "CN, MCI, or AD" },
    { name: "Diagnosis Extended", description: "Advanced diagnostic model", inputs: "Extended clinical data", outputs: "CN, MCI, or AD" },
    { name: "2yr Prognosis Basic", description: "Basic prognosis model", inputs: "Clinical features", outputs: "2-year prognosis" },
    { name: "2yr Prognosis Extended", description: "Advanced prognosis model", inputs: "Clinical features, biomarkers, image data", outputs: "2-year prognosis" },
  ];

  const renderTable = (title: string, data: Module[]) => (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {title === "Neurology (Alzheimer's)" && (
        <p className="mb-4 text-gray-700 max-w-4xl">
          These modules support risk screening, diagnostic assessment, and prognosis of Alzheimer’s disease. 
          <br />
          They are developed using ADNI data and machine learning models, including Random Forest&nbsp;and&nbsp;XGBoost.
          <br />
          <span className="text-sm">
            CN: cognitively normal · MCI: mild cognitive impairment · AD: Alzheimer’s disease
          </span>
        </p>
      )}

      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Module</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Inputs</th>
            <th className="border p-2">Outputs</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name}>
              <td className="border p-2 font-medium">{row.name}</td>
              <td className="border p-2">{row.description}</td>
              <td className="border p-2">{row.inputs}</td>
              <td className="border p-2">{row.outputs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="mt-8 text-4xl font-bold mb-10 text-center">Clinical Modules</h1>
      {renderTable("Cardiology", cardiology)}
      {renderTable("Neurology (Alzheimer's)", neurology)}

      <div className="flex flex-col items-center mt-12 space-y-4">
        <Link
          href="/pricing"
          className="bg-green-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-500"
        >
          Get Started
        </Link>
        <Link href="/login" className="text-gray-500 hover:underline text-lg">
          Log In if you have an account
        </Link>
      </div>
    </div>
  );
}