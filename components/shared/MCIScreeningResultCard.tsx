// frontend/components/shared/MCIScreeningResultCard.tsx

"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

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
  /** Optional subtitle shown under the title. */
  subtitle?: string;
  /** Primary at-a-glance fields, stacked in one box. */
  primary?: Field[];
  /** Primary at-a-glance fields, rendered as separate side-by-side boxes. */
  primaryBoxes?: Field[];
  /** One-line plain-language explanation shown under the primary section. */
  note?: string;
  /** Secondary/audit fields, hidden behind a "Model details" toggle. */
  details?: Field[];
  /**
   * @deprecated Use `primary` / `primaryBoxes` / `details` instead. Kept
   * for backward compatibility with other callers of this shared
   * component that haven't migrated to the hierarchy yet.
   */
  fields?: Field[];
  features?: string[];
  modelName?: string;
  /** Direct URL to the PDF, as returned by the API. Preferred over reportId. */
  pdfUrl?: string | null;
  /**
   * @deprecated Previously used to construct the PDF URL client-side by
   * guessing bucket/path. Pass `pdfUrl` from the API response instead —
   * constructing storage URLs on the frontend caused silent 404s whenever
   * the guessed path didn't match the real bucket/key.
   */
  reportId?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

/* -------------------------------------
 * Constants
 * ----------------------------------- */

/* -------------------------------------
 * Field row (used in stacked box / details list)
 * ----------------------------------- */

function FieldRow({ f, emphasized }: { f: Field; emphasized?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{f.label}</span>
      <span
        className={`font-medium ${
          f.highlight || emphasized ? "font-semibold" : ""
        } ${f.color || "text-foreground"}`}
      >
        {f.value ?? "N/A"}
      </span>
    </div>
  );
}

/* -------------------------------------
 * Standalone box (used for primaryBoxes)
 * ----------------------------------- */

function FieldBox({ f }: { f: Field }) {
  return (
    <div className="flex-1 rounded-lg bg-muted/50 p-4">
      <p className="text-sm text-muted-foreground mb-1">{f.label}</p>
      <p className={`text-xl font-semibold ${f.color || "text-foreground"}`}>
        {f.value ?? "N/A"}
      </p>
    </div>
  );
}

/* -------------------------------------
 * Component
 * ----------------------------------- */

export default function ClinicalResultCard({
  title,
  subtitle,
  primary,
  primaryBoxes,
  note,
  details,
  fields = [],
  features,
  modelName,
  pdfUrl,
  reportId,
  footer,
  children,
}: ClinicalResultCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // pdfUrl from the API is authoritative. reportId-based construction is
  // no longer supported (see deprecation note above) — it produced 404s
  // whenever the guessed bucket/path didn't match reality.
  const resolvedPdfUrl = pdfUrl ?? null;

  /* -------------------------------------
   * Actions
   * ----------------------------------- */

  const handleView = () => {
    if (!resolvedPdfUrl) return;
    window.open(resolvedPdfUrl, "_blank");
  };

  const handleDownload = async () => {
    if (!resolvedPdfUrl) return;

    try {
      setIsDownloading(true);

      const res = await fetch(resolvedPdfUrl!);
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

  const hasHierarchy =
    (primary && primary.length > 0) ||
    (primaryBoxes && primaryBoxes.length > 0) ||
    (details && details.length > 0);

  return (
    <div className="p-5 border rounded-xl bg-white shadow-sm space-y-4">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Primary section - separate side-by-side boxes */}
      {primaryBoxes && primaryBoxes.length > 0 && (
        <div className="flex gap-3">
          {primaryBoxes.map((f, i) => (
            <FieldBox key={i} f={f} />
          ))}
        </div>
      )}

      {/* Primary section - stacked single box (alternative layout) */}
      {primary && primary.length > 0 && (
        <div className="rounded-lg bg-muted/50 p-4 space-y-2">
          {primary.map((f, i) => (
            <FieldRow key={i} f={f} emphasized />
          ))}
        </div>
      )}

      {/* Plain-language note under primary section */}
      {note && (
        <p className="text-sm text-muted-foreground leading-relaxed">{note}</p>
      )}

      {/* Legacy flat fields - only rendered if the new hierarchy isn't used */}
      {!hasHierarchy && fields.length > 0 && (
        <div className="space-y-2">
          {fields.map((f, i) => (
            <FieldRow key={i} f={f} />
          ))}
        </div>
      )}

      {/* Custom Content (IMPORTANT) */}
      {children && <div className="space-y-3">{children}</div>}

      {/* Collapsible model/audit details */}
      {details && details.length > 0 && (
        <div className="border-t pt-3">
          <button
            type="button"
            onClick={() => setDetailsOpen((o) => !o)}
            aria-expanded={detailsOpen}
            className="w-full flex items-center justify-between text-sm font-medium text-foreground"
          >
            <span>Model details</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                detailsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {detailsOpen && (
            <div className="mt-3 space-y-2">
              {details.map((f, i) => (
                <FieldRow key={i} f={f} />
              ))}
              <p className="flex items-start gap-1.5 text-xs text-muted-foreground pt-1">
                <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                Supporting model detail for audit purposes - not a substitute
                for clinical judgment.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Key Insights</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {features.slice(0, 3).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Meta */}
      {modelName && (
        <p className="text-xs text-muted-foreground">Model: {modelName}</p>
      )}

      {/* Actions */}
      {resolvedPdfUrl && (
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
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      )}

      {/* Footer (for actions like reset, navigation, etc.) */}
      {footer && <div className="pt-2">{footer}</div>}
    </div>
  );
}