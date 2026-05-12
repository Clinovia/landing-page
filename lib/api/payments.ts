export async function createCheckoutSession(plan: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan }),
  });

  if (!res.ok) {
    throw new Error("Failed to create checkout session");
  }

  return res.json();
}