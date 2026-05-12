"use client";

import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export function AuthGate({ children }: { children: ReactNode }) {
  const { isLoading } = useAuth();

  // 🔒 Block rendering until auth is ready
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}