// frontend-mci/components/shared/ClinicalResultCard.tsx

"use client";

import { useState } from "react";

/* -------------------------------------
 * Types
 * ----------------------------------- */

type Field = {
  label: string;
  value: string | number | null | undefined;
  highlight?: boolean;
  color?: string;
};

type ClinicalResultCardProps = {
  title: string;
  fields?: Field[];
  features?: string[];
  modelName?: string;
  reportId?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

/* -------------------------------------
 * Constants
 * ----------------------------------- */

const BASE_STORAGE_URL =
  "https://cprwuuuvwaqttztaklam.supabase.co/storage/v1/object/public/reports";

/* -------------------------------------
 * Component
 * ----------------------------------- */

export default function ClinicalResultCard({
  title,
  fields = [],
  features,
  modelName,
  reportId,
  footer,
  children,
}: ClinicalResultCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const pdfUrl = reportId
    ? `${BASE_STORAGE_URL}/${reportId}.pdf`
    : null;

  /* -------------------------------------
   * Actions
   * ----------------------------------- */

  const handleView = () => {
    if (!pdfUrl) return;
    window.open(pdfUrl, "_blank");
  };

  const handleDownload = async () => {
    if (!pdfUrl) return;

    try {
      setIsDownloading(true);

      const res = await fetch(pdfUrl);
      if (!res.ok) throw new Error("Failed to fetch PDF");

      const blob = await res.blob();
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

  /* -------------------------------------
   * Render
   * ----------------------------------- */

  return (
    <div className="p-5 border rounded-xl bg-white shadow-sm space-y-4">
      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground">
        {title}
      </h3>

      {/* Fields */}
      {fields.length > 0 && (
        <div className="space-y-2">
          {fields.map((f, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {f.label}
              </span>
              <span
                className={`font-medium ${
                  f.highlight ? "font-semibold" : ""
                } ${f.color || "text-foreground"}`}
              >
                {f.value ?? "N/A"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Custom Content (IMPORTANT) */}
      {children && <div className="space-y-3">{children}</div>}

      {/* Features */}
      {features && features.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Key Insights
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {features.slice(0, 3).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Meta */}
      {modelName && (
        <p className="text-xs text-muted-foreground">
          Model: {modelName}
        </p>
      )}

      {/* Actions */}
      {pdfUrl && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleView}
            disabled={isDownloading}
            className="px-3 py-2 text-sm border rounded-md hover:bg-muted transition disabled:opacity-50"
          >
            View PDF
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-3 py-2 text-sm bg-primary text-white rounded-md hover:opacity-90 transition disabled:opacity-50"
          >
            {isDownloading ? "Downloading…" : "Download PDF"}
          </button>
        </div>
      )}

      {/* Footer (for actions like reset, navigation, etc.) */}
      {footer && <div className="pt-2">{footer}</div>}
    </div>
  );
}