import { PLANS } from '@/features/payments/types';
import { PricingCard } from '@/features/payments/components/PricingCard';

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium text-center mb-3">Pricing</h1>
      <p className="text-center text-muted-foreground mb-2">
        All plans are for research use only (RUO).
      </p>
      <p className="text-center text-sm text-muted-foreground mb-12">
        Not intended for clinical diagnosis or treatment decisions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map(plan => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>

      {/* RUO acknowledgment banner */}
      <div className="mt-12 border rounded-lg p-4 text-sm text-muted-foreground text-center">
        By subscribing, you confirm that this tool will be used for research 
        purposes only and not to inform individual clinical decisions.
      </div>
    </div>
  );
}