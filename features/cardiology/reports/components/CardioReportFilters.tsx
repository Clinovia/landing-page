"use client";

export interface CardioReportFiltersProps {
  filters: Record<string, any>;
  onChange: (filters: Record<string, any>) => void;
}

export function CardioReportFilters({
  filters,
  onChange,
}: CardioReportFiltersProps) {
  return (
    <div className="space-x-2 mb-4">
      <input
        type="text"
        placeholder="Patient ID"
        value={filters.patientId ?? ""}
        onChange={(e) =>
          onChange({ ...filters, patientId: e.target.value })
        }
        className="border p-2 rounded"
      />
      <button
        type="button"
        onClick={() => onChange({})}
        className="bg-gray-200 px-2 py-1 rounded"
      >
        Clear
      </button>
    </div>
  );
}
