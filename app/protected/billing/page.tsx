"use client";

import { useAuth } from "@/context/AuthContext";
import { PLANS } from "@/features/payments/types";
import { useCheckout } from "@/features/payments/hooks/useCheckout";

const OVERAGE_RATES: Record<string, string> = {
  starter: "N/A",
  basic: "$0.45/assessment",
  professional: "$0.18/assessment",
};

export default function BillingPage() {
  const {
    user,
    plan,
    isPaid,
    assessmentsUsed,
    assessmentsLimit,
    nextBillingDate,
  } = useAuth();

  const planDetails = PLANS.find((p) => p.id === plan);

  const userSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const formattedBillingDate = nextBillingDate
    ? new Date(nextBillingDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const assessmentsLeft = Math.max(0, assessmentsLimit - assessmentsUsed);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-2xl font-semibold">Billing & Subscription</h1>

      {/* Account Info */}
      <section className="border rounded-xl p-6 space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Account
        </h2>
        <Row label="Name" value={user?.user_metadata?.full_name ?? "—"} />
        <Row label="Email" value={user?.email ?? "—"} />
        <Row label="Member since" value={userSince} />
      </section>

      {/* Subscription Info */}
      <section className="border rounded-xl p-6 space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Subscription
        </h2>
        <Row
          label="Current plan"
          value={<span className="capitalize font-medium">{plan}</span>}
        />
        <Row
          label="Assessments used"
          value={`${assessmentsUsed.toLocaleString()} / ${assessmentsLimit.toLocaleString()}`}
        />
        <Row
          label="Assessments remaining"
          value={assessmentsLeft.toLocaleString()}
        />
        <Row
          label="Monthly charge"
          value={
            planDetails?.price === 0
              ? "Free"
              : planDetails?.price
              ? `$${planDetails.price}/mo`
              : "Custom"
          }
        />
        <Row label="Overage rate" value={OVERAGE_RATES[plan] ?? "—"} />
        {isPaid && (
          <Row label="Next billing date" value={formattedBillingDate} />
        )}
      </section>

      {/* Upgrade CTA */}
      {plan === "starter" && (
        <section className="border rounded-xl p-6 space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Upgrade
          </h2>
          <p className="text-sm text-muted-foreground">
            Unlock extended diagnosis, prognosis models, batch processing, and more.
            Basic includes up to 500 assessments/mo. Professional includes up to 5,000 assessments/mo.
          </p>
          <div className="flex gap-3 pt-1">
            <UpgradeButton plan="basic" label="Upgrade to Basic — $199/mo" />
            <UpgradeButton plan="professional" label="Upgrade to Professional — $799/mo" />
          </div>
        </section>
      )}

      {plan === "basic" && (
        <section className="border rounded-xl p-6 space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Upgrade
          </h2>
          <p className="text-sm text-muted-foreground">
            Unlock 2-year prognosis models, batch processing, PDF reports, and multi-user support.
            Professional includes up to 5,000 assessments/mo.
          </p>
          <div className="pt-1">
            <UpgradeButton plan="professional" label="Upgrade to Professional — $799/mo" />
          </div>
        </section>
      )}
    </div>
  );
}

// ------------------------------------
// Helpers
// ------------------------------------

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function UpgradeButton({ plan, label }: { plan: string; label: string }) {
  const { startCheckout, loading } = useCheckout();

  return (
    <button
      onClick={() => startCheckout(plan)}
      disabled={loading}
      className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}