export type PlanTier = 'starter' | 'basic' | 'professional' | 'enterprise';

export interface Plan {
  id: PlanTier;
  name: string;
  price: number | null;
  assessmentsPerMonth: number | null;
  stripePriceId: string | null;
  features: string[];
  highlighted?: boolean;
  ruo: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    assessmentsPerMonth: 100,
    stripePriceId: null,
    ruo: true,
    features: [
      'Alzheimer screening',
      'Basic diagnosis',
      'ASCVD + BP category',
      'JSON output only',
      'Single user',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    assessmentsPerMonth: 300,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
    ruo: true,
    features: [
      'Everything in Starter',
      'Extended diagnosis',
      'CSV & PDF export',
      'Priority email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 299,
    assessmentsPerMonth: 1500,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
    highlighted: true,
    ruo: true,
    features: [
      'Everything in Basic',
      '2yr prognosis models',
      'CHA₂DS₂-VASc',
      'Batch processing',
      'PDF reports + storage',
      'Multiple users (shared quota)',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 799,
    assessmentsPerMonth: 5000,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!,
    ruo: true,
    features: [
      'Everything in Professional',
      'ECG interpretation',
      'Auto-assessments pipeline',
      'Custom model registry',
      'HIPAA BAA available',
      'SLA + priority support',
    ],
  },
];