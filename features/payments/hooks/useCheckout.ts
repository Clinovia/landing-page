"use client";

import { useState } from "react";
import { createCheckoutSession } from "../api";

export function useCheckout() {
  const [loading, setLoading] = useState(false);

  const startCheckout = async (plan: string) => {
    setLoading(true);

    try {
      const { url } = await createCheckoutSession(plan);

      if (!url) {
        throw new Error("No checkout URL returned");
      }

      // 🔥 Redirect to Stripe
      window.location.href = url;

    } catch (err) {
      console.error("❌ Checkout failed:", err);
      setLoading(false);
    }
  };

  return {
    startCheckout,
    loading,
  };
}