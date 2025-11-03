// components/ui/button.tsx
"use client";

import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  primary = true,
  className = "",
  ...props
}) => {
  const baseClasses = "px-6 py-3 rounded-lg shadow transition";
  const primaryClasses = "bg-indigo-600 text-white hover:bg-indigo-700";
  const secondaryClasses = "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50";

  return (
    <button
      className={`${baseClasses} ${
        primary ? primaryClasses : secondaryClasses
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
