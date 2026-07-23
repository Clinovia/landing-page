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
      '24-month progression risk estimate (Clinical Edition)',
      'Age, sex, MMSE, RAVLT Immediate Recall inputs',
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
      'MRI-Enhanced Edition (hippocampus, entorhinal cortex, middle temporal gyrus, whole brain, ventricles)',
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
      'Batch processing',
      'Structured PDF reports + storage',
      'Multiple users, role-based access (admin / clinician / viewer)',
      'Shared quota across institution',
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
      'External validation data-sharing option',
      'Custom model registry',
      'HIPAA BAA available',
      'SLA + priority support',
    ],
  },
];