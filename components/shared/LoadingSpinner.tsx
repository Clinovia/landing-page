"use client";

type LoadingSpinnerProps = {
  size?: number;
  className?: string;
  centered?: boolean;
};

export default function LoadingSpinner({
  size = 24,
  className = "",
  centered = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-black ${className}`}
      style={{ width: size, height: size }}
    />
  );

  if (centered) {
    return (
      <div className="flex justify-center items-center py-8">
        {spinner}
      </div>
    );
  }

  return spinner;
}