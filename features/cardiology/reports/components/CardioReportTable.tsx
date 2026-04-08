"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/apiClient";
import type { CardioReport } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.clinovia.ai";

type Props = {
  reports: CardioReport[];
  loading?: boolean;
};

export default function CardioReportTable({ reports, loading }: Props) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (reportId: string) => {
    try {
      setError(null);
      setDownloadingId(reportId);

      const response = await apiRequest<Response>({
        path: `${BASE_URL}/api/v1/reports/${reportId}/pdf`,
        method: "GET",
        rawResponse: true,
      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${reportId}.pdf`;
      a.click();
      console.log("DOWNLOAD CLICKED");

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed:", err);
      setError("Failed to download PDF. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-gray-500 border rounded-lg">
        Loading reports...
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="p-4 text-gray-500 border rounded-lg">
        No reports found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {reports.map((report) => {
        const reportId = report.id;
        const isDownloading = downloadingId === reportId;

        return (
          <div
            key={reportId}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <p className="font-medium">Report ID: {reportId}</p>
            </div>

            <button
              type="button"
              onClick={() => handleDownload(reportId)}
              disabled={isDownloading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition ${
                isDownloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isDownloading ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        );
      })}
    </div>
  );
}