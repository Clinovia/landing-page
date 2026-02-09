"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

export interface BatchUploadFormProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export function BatchUploadForm({
  onUpload,
  loading,
}: BatchUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || loading) return;
    onUpload(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="file"
        onChange={handleFileChange}
        className="border rounded p-2 w-full"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Uploading…" : "Upload Batch"}
      </button>
    </form>
  );
}
