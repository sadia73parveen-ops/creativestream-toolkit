export type PlanId = "free" | "pro" | "business";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  dailyGenerations: number;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Everything you need to test the waters.",
    dailyGenerations: 10,
    features: [
      "10 AI generations per day",
      "All basic creator tools",
      "Unlimited image compressing & resizing",
      "No credit card required",
    ],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$7",
    cadence: "per month",
    tagline: "For creators publishing every week.",
    dailyGenerations: 300,
    features: [
      "300 AI generations per day",
      "Ad-free experience",
      "Generation history",
      "Premium tone & platform presets",
      "Priority email support",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    price: "$19",
    cadence: "per month",
    tagline: "For agencies and content teams.",
    dailyGenerations: 2000,
    features: [
      "2,000 AI generations per day",
      "API access",
      "Priority processing queue",
      "Team seats (coming soon)",
      "Everything in Pro",
    ],
    cta: "Talk to us",
  },
];

/** Server-side daily caps keyed by plan. Free is enforced per IP today. */
export const PLAN_LIMITS: Record<PlanId, { perDay: number; perMinute: number }> = {
  free: { perDay: 10, perMinute: 5 },
  pro: { perDay: 300, perMinute: 20 },
  business: { perDay: 2000, perMinute: 60 },
};
