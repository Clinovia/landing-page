export function useSubscription() {
  const refreshSubscription = async () => {
    const res = await fetch("/api/billing/subscription");
    return res.json();
  };

  return { refreshSubscription };
}