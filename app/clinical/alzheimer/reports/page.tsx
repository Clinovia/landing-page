"use client";

import React from "react";
import { AlzheimerReportTable, AlzheimerReportFilters, useAlzheimerReports } from "@/features/alzheimer/reports";

const AlzheimerReportsPage = () => {
  const { reports, loading, error, filters, setFilters } = useAlzheimerReports();

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Alzheimer Reports</h1>

      <AlzheimerReportFilters filters={filters} onChange={setFilters} />

      {error && <p className="text-red-500">{error}</p>}

      <AlzheimerReportTable reports={reports} loading={loading} />
    </section>
  );
};

export default AlzheimerReportsPage;
