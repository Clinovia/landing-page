"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Topbar from "@/components/layout/Topbar";

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

  if (!session) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Topbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}