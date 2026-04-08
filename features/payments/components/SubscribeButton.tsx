"use client";

import { Button } from "@/components/ui/button";
import { useCheckout } from "../hooks/useCheckout";
import type { Plan } from "@/features/payments/types";

export function SubscribeButton({ plan }: { plan: Plan }) {
  const { startCheckout, loading } = useCheckout();

  const isFree = plan.price === 0;
  const isDisabled = !plan.id || loading;

  // -----------------------------------
  // Free plan → signup
  // -----------------------------------
  if (isFree) {
    return (
      <Button variant="outline" asChild>
        <a href="/signup">Get started free</a>
      </Button>
    );
  }

  // -----------------------------------
  // Paid plans → Stripe checkout
  // -----------------------------------
  const handleCheckout = () => {
    if (!plan.id) {
      console.error("❌ Missing plan id");
      return;
    }

    // 🔥 Send plan (NOT priceId)
    startCheckout(plan.id);
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isDisabled}
    >
      {loading ? "Redirecting..." : `Subscribe`}
    </Button>
  );
}