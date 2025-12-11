import { EchonetEFInput, EchonetEFOutput } from "@/features/cardiology/types";

interface Props {
  input: EchonetEFInput;
  interpretation: EchonetEFOutput;
  onReset: () => void;
}

export default function EFResult({ input, interpretation, onReset }: Props) {
  return (
    <div className="border p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Ejection Fraction Result</h2>

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
