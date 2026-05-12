"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSubscription } from "@/features/payments/hooks/useSubscription";

export default function SuccessPage() {
  const router = useRouter();
  const { refreshSubscription } = useSubscription();

  useEffect(() => {
    const finish = async () => {
      try {
        await refreshSubscription();
      } catch (err) {
        console.error("Failed to refresh subscription:", err);
      } finally {
        router.push("/protected");
      }
    };

    finish();
  }, [refreshSubscription, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">
        Payment successful 🎉 Redirecting...
      </p>
    </div>
  );
}