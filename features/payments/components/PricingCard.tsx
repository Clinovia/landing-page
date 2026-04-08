"use client";

import Link from "next/link";
import { Plan } from "../types";
import { AUTH_ROUTES } from "@/config/routes";

export function PricingCard({ plan }: { plan: Plan }) {
  const isFree = plan.price === 0;
  const isCustom = plan.price === null;

  return (
    <div
      className={`rounded-xl border p-6 flex flex-col gap-4 
      ${plan.highlighted ? "border-blue-500 border-2" : "border-border"}`}
    >
      {plan.highlighted && (
        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-md self-start">
          Most popular
        </span>
      )}

      <div>
        <h3 className="font-medium text-lg">{plan.name}</h3>
        {isCustom ? (
          <p className="text-2xl font-medium mt-1">Custom</p>
        ) : (
          <p className="text-2xl font-medium mt-1">
            {isFree ? "Free" : `$${plan.price}/mo`}
          </p>
        )}
        {plan.assessmentsPerMonth && (
          <p className="text-sm text-muted-foreground">
            {plan.assessmentsPerMonth.toLocaleString()} assessments/mo
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-2 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="text-sm text-muted-foreground flex gap-2">
            <span className="text-blue-500 mt-0.5">✓</span> {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isFree ? (
        <Link
          href={AUTH_ROUTES.SIGNUP}
          className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 text-center block text-sm font-medium"
        >
          Get Started
        </Link>
      ) : isCustom ? (
        <Link
          href="/contact"
          className="w-full px-4 py-2 rounded-md border text-center block text-sm"
        >
          Contact Sales
        </Link>
      ) : (
        <Link
          href={`${AUTH_ROUTES.SIGNUP}?plan=${plan.id}`}
          className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 text-center block text-sm font-medium"
        >
          Subscribe
        </Link>
      )}

      <p className="text-xs text-muted-foreground text-center">
        For research use only. Not for clinical decision-making.
      </p>
    </div>
  );
}