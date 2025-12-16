// app/protected/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Inner component that uses useAuth
function AuthGuard({ children }: { children: ReactNode }) {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      const currentPath = window.location.pathname + window.location.search;
      router.replace(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  if (!session) {
    return null; // or loading spinner
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

// Outer layout that provides context
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}