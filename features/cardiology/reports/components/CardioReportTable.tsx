import React from "react";
import { CardioReport } from "../types";

interface CardioReportTableProps {
  reports: CardioReport[];
  loading: boolean;
}

export const CardioReportTable: React.FC<CardioReportTableProps> = ({ reports, loading }) => {
  if (loading) return <p>Loading reports...</p>;
  if (!reports.length) return <p>No reports found.</p>;

  return (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border px-2 py-1">Patient ID</th>
          <th className="border px-2 py-1">Test Date</th>
          <th className="border px-2 py-1">ASCVD Risk</th>
          <th className="border px-2 py-1">BP Category</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r) => (
          <tr key={r.id}>
            <td className="border px-2 py-1">{r.patientId}</td>
            <td className="border px-2 py-1">{r.testDate}</td>
            <td className="border px-2 py-1">{r.ascvdRisk ?? "-"}</td>
            <td className="border px-2 py-1">{r.bpCategory ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
