"use client";

import React from "react";
import { CardioReportTable, CardioReportFilters, useCardioReports } from "@/features/cardiology/reports";

const CardioReportsPage = () => {
  const { reports, loading, error, filters, setFilters } = useCardioReports();

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Cardiology Reports</h1>

      <CardioReportFilters filters={filters} onChange={setFilters} />

      {error && <p className="text-red-500">{error}</p>}

      <CardioReportTable reports={reports} loading={loading} />
    </section>
  );
};

export default CardioReportsPage;
