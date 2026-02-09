"use client";

import { useState } from "react";

export interface BatchUploadFormProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export function BatchUploadForm({
  onUpload,
  loading,
}: BatchUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || loading) return;
    onUpload(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="border p-2 rounded"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !file}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading…" : "Upload Batch"}
      </button>
    </form>
  );
}
