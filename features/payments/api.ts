import { supabase } from "@/lib/supabaseClient";

export async function createCheckoutSession(plan: string) {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/create-checkout-session`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ plan }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create checkout session");
  }

  return res.json();
}