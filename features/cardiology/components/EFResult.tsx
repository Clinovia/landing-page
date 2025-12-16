import { EchonetEFInput, EchonetEFOutput } from "@/features/cardiology/types";

interface Props {
  input?: EchonetEFInput; // optional now
  interpretation: EchonetEFOutput;
  onReset: () => void;
}

export default function EFResult({ input, interpretation, onReset }: Props) {
  // Extract file name if input is provided
  let fileName: string | null = null;

  if (input) {
    // If input is FormData, try to get the file
    if (input instanceof FormData) {
      const file = input.get("video") as File | null;
      fileName = file?.name ?? null;
    } else if ("video_file" in input && input.video_file instanceof File) {
      fileName = input.video_file.name;
    }
  }

  return (
    <div className="border p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Ejection Fraction Result</h2>

      {fileName && (
        <p>
          <strong>Uploaded file:</strong> {fileName}
        </p>
      )}

      <div className="space-y-2">
        {interpretation.ef_percent !== undefined && (
          <p>
            <strong>Ejection Fraction:</strong> {interpretation.ef_percent}%
          </p>
        )}

        <p>
          <strong>Category:</strong> {interpretation.category}
        </p>

        <p className="text-gray-600 text-sm">
          Model: {interpretation.model_name} (v{interpretation.model_version})
        </p>
      </div>

      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      >
        Reset
      </button>
    </div>
  );
}
