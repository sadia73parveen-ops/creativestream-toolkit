import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Faq, faqJsonLd, type FaqItem } from "@/components/site/Faq";
import { PLANS } from "@/lib/plans";

const FAQ: FaqItem[] = [
  {
    q: "Can I use MediaDrop without paying?",
    a: "Yes. The free plan includes every tool plus free AI generations each day. Image compressing and resizing are always unlimited because they run in your browser.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Paid plans are month-to-month with no lock-in, and annual billing can be cancelled at the end of the term.",
  },
  {
    q: "What happens when I hit my daily limit?",
    a: "AI tools pause until the next day and you'll see an upgrade prompt. Image tools keep working normally.",
  },
  {
    q: "Do you offer API access?",
    a: "API access is included on the Business plan so you can wire MediaDrop generations into your own publishing workflow.",
  },
];

const COMPARISON = [
  { feature: "Daily AI generations", free: "5", pro: "Unlimited", business: "Unlimited" },
  { feature: "Image compressor & resizer", free: true, pro: true, business: true },
  { feature: "Generation history", free: false, pro: true, business: true },
  { feature: "Ad-free experience", free: false, pro: true, business: true },
  { feature: "Batch processing", free: false, pro: true, business: true },
  { feature: "Priority AI processing", free: false, pro: false, business: true },
  { feature: "Team access", free: false, pro: false, business: true },
  { feature: "API access", free: false, pro: false, business: true },
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — MediaDrop Creator Toolkit" },
      {
        name: "description",
        content:
          "Simple MediaDrop pricing: Free forever, Pro at $7/month for higher AI limits and history, Business at $19/month with API access and priority processing.",
      },
      { property: "og:title", content: "Pricing — MediaDrop Creator Toolkit" },
      {
        property: "og:description",
        content: "Free, Pro ($7/mo) and Business ($19/mo) plans for creators and content teams.",
      },
      { property: "og:url", content: "/pricing" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ)) }],
  }),
  component: Pricing,
});

const Cell = ({ value }: { value: string | boolean }) =>
  typeof value === "string" ? (
    <span className="text-sm">{value}</span>
  ) : value ? (
    <Check className="mx-auto size-4 text-primary" aria-label="Included" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-foreground" aria-label="Not included" />
  );

function Pricing() {
  const [annual, setAnnual] = useState(false);

  // Checkout is intentionally not wired up yet — this is where Stripe will plug in.
  const startCheckout = (planName: string) =>
    toast.info(`${planName} checkout isn't live yet — payments will be enabled soon.`);

  const priceFor = (price: string) => {
    const value = Number(price.replace("$", ""));
    if (!value) return { amount: "$0", note: "forever" };
    return annual
      ? { amount: `$${Math.round(value * 10)}`, note: "per year · 2 months free" }
      : { amount: `$${value}`, note: "per month" };
  };

  return (
    <main>
      <section className="hero-aura border-b border-border/60">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-balance text-4xl font-bold sm:text-5xl">
            Pricing that scales with your <span className="gradient-text">channel</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Start free, upgrade when your publishing schedule speeds up. No hidden fees.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Label htmlFor="billing" className={annual ? "text-muted-foreground" : ""}>
              Monthly
            </Label>
            <Switch id="billing" checked={annual} onCheckedChange={setAnnual} />
            <Label htmlFor="billing" className={annual ? "" : "text-muted-foreground"}>
              Annual
            </Label>
            <Badge variant="secondary">Save 2 months</Badge>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const price = priceFor(plan.price);
          return (
            <article
              key={plan.id}
              className={`surface-card relative flex flex-col p-8 ${
                plan.highlighted ? "border-primary/60 glow" : ""
              }`}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-8">Most popular</Badge>
              )}
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
              <p className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-extrabold">{price.amount}</span>
                <span className="pb-1 text-sm text-muted-foreground">{price.note}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              {plan.id === "free" ? (
                <Button variant="secondary" className="mt-8" asChild>
                  <Link to="/">{plan.cta}</Link>
                </Button>
              ) : (
                <Button
                  className="mt-8"
                  variant={plan.highlighted ? "default" : "secondary"}
                  onClick={() => startCheckout(plan.name)}
                >
                  {plan.cta}
                </Button>
              )}
            </article>
          );
        })}
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-6">
        <h2 className="text-2xl font-bold">Compare plans</h2>
        <div className="surface-card mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <caption className="sr-only">MediaDrop plan feature comparison</caption>
            <thead>
              <tr className="border-b border-border/70 text-sm">
                <th scope="col" className="p-4 font-semibold">
                  Feature
                </th>
                <th scope="col" className="p-4 text-center font-semibold">
                  Free
                </th>
                <th scope="col" className="p-4 text-center font-semibold">
                  Pro
                </th>
                <th scope="col" className="p-4 text-center font-semibold">
                  Business
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-border/50 last:border-0">
                  <th scope="row" className="p-4 text-sm font-normal text-muted-foreground">
                    {row.feature}
                  </th>
                  <td className="p-4 text-center">
                    <Cell value={row.free} />
                  </td>
                  <td className="p-4 text-center">
                    <Cell value={row.pro} />
                  </td>
                  <td className="p-4 text-center">
                    <Cell value={row.business} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Faq items={FAQ} title="Pricing FAQ" />
    </main>
  );
}
