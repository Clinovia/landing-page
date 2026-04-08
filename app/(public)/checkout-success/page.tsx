"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SuccessPage() {
  const router = useRouter();
  const { refreshSubscription } = useAuth();

  useEffect(() => {
    const finish = async () => {
      try {
        await refreshSubscription?.();
      } finally {
        router.push("/protected");
      }
    };
    finish();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Payment successful 🎉 Redirecting...</p>
    </div>
  );
}