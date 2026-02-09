import React from "react";
import { BatchJob } from "../types";

interface BatchProcessingStatusProps {
  jobs: BatchJob[];
  onRefresh: () => void;
}

export const BatchProcessingStatus: React.FC<BatchProcessingStatusProps> = ({ jobs, onRefresh }) => {
  return (
    <div className="space-y-2 mt-4">
      <h2 className="text-xl font-semibold">Batch Jobs</h2>
      <button
        onClick={onRefresh}
        className="bg-gray-200 px-2 py-1 rounded text-sm"
      >
        Refresh
      </button>
      <ul className="list-disc pl-5">
        {jobs.length === 0 && <li>No batch jobs yet</li>}
        {jobs.map((job) => (
          <li key={job.id}>
            Job {job.id} — Status: <span className="font-bold">{job.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
