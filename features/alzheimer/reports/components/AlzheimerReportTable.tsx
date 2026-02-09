import React from "react";
import { AlzheimerReport } from "../types";

interface AlzheimerReportTableProps {
  reports: AlzheimerReport[];
  loading: boolean;
}

export const AlzheimerReportTable: React.FC<AlzheimerReportTableProps> = ({ reports, loading }) => {
  if (loading) return <p>Loading reports...</p>;
  if (!reports.length) return <p>No reports found.</p>;

  return (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border px-2 py-1">Patient ID</th>
          <th className="border px-2 py-1">Test Date</th>
          <th className="border px-2 py-1">Risk Score</th>
          <th className="border px-2 py-1">Diagnosis</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r) => (
          <tr key={r.id}>
            <td className="border px-2 py-1">{r.patientId}</td>
            <td className="border px-2 py-1">{r.testDate}</td>
            <td className="border px-2 py-1">{r.riskScore}</td>
            <td className="border px-2 py-1">{r.diagnosis}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
