"use client";

import { useState } from "react";

type Field = {
  label: string;
  value: string | number | undefined | null;
  highlight?: boolean;
  color?: string;
};

type ClinicalResultCardProps = {
  title: string;
  fields: Field[];
  features?: string[];
  modelName?: string;
  reportId?: string;
  onReset?: () => void;
};

const BASE_STORAGE_URL =
  "https://cprwuuuvwaqttztaklam.supabase.co/storage/v1/object/public/reports";

export default function ClinicalResultCard({
  title,
  fields,
  features,
  modelName,
  reportId,
}: ClinicalResultCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const pdfUrl = reportId ? `${BASE_STORAGE_URL}/${reportId}.pdf` : null;

  const handleView = () => {
    if (!pdfUrl) return;
    window.open(pdfUrl, "_blank");
  };

  const handleDownload = async () => {
    if (!pdfUrl) return;
    try {
      setIsDownloading(true);
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Failed to fetch PDF");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `report-${reportId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-50 mt-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <div className="space-y-1">
        {fields.map((f, i) => (
          <p key={i}>
            <strong>{f.label}:</strong>{" "}
            <span className={`${f.highlight ? "font-bold" : ""} ${f.color || "text-gray-900"}`}>
              {f.value ?? "N/A"}
            </span>
          </p>
        ))}
      </div>

      {features && features.length > 0 && (
        <div className="mt-2">
          <strong>Key Insights:</strong>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
            {features.slice(0, 3).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {modelName && (
        <p className="text-sm text-gray-500 mt-2">Model: {modelName}</p>
      )}

      {pdfUrl && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleView}
            disabled={isDownloading}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          >
            View PDF
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {isDownloading ? "Downloading…" : "Download PDF"}
          </button>
        </div>
      )}
    </div>
  );
}