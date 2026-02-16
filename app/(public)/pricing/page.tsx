import Link from "next/link";
import { Button } from "@/components/ui/button";

const tiers = [
  { name: "Toolkit", price: 299, period: "per transaction", description: "Structured workflow for one transaction.", features: ["Guided workflow", "Offer comparison", "Risk radar", "Document center"], cta: "Get Toolkit", highlighted: false },
  { name: "Premium", price: 499, period: "per transaction", description: "Everything in Toolkit, plus guidance and automation.", features: ["Everything in Toolkit", "Negotiation support", "Guided review", "Deadline automation"], cta: "Get Premium", highlighted: true },
  { name: "Concierge", price: 999, period: "per transaction", description: "Full-service support for complex transactions.", features: ["Everything in Premium", "Priority support", "Attorney referral coordination", "Dedicated onboarding"], cta: "Get Concierge", highlighted: false },
];

const faqs = [
  { q: "Is this a commission?", a: "No. Cladex charges a flat fee per transaction. We do not take a percentage of your sale price." },
  { q: "When do I pay?", a: "You select your tier when starting a transaction. Payment is collected at the start of the workflow." },
  { q: "Can I switch tiers mid-transaction?", a: "Upgrades are available. Contact support for details." },
  { q: "What if my transaction does not close?", a: "Our refund policy is outlined in the Terms of Service." },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">Pricing</h1>
        <p className="mt-4 text-muted-foreground">Flat fee per transaction. No commission. No percentage of sale price.</p>
      </div>

      <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier.name} className={`rounded-lg border p-6 flex flex-col ${tier.highlighted ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
            <h2 className="text-lg font-semibold text-foreground">{tier.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
            <p className="mt-4">
              <span className="text-2xl font-semibold text-foreground">${tier.price}</span>
              <span className="ml-1 text-sm text-muted-foreground">{tier.period}</span>
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="mt-6 block">
              <Button variant={tier.highlighted ? "default" : "outline"} className="w-full">{tier.cta}</Button>
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-16 max-w-2xl">
        <h2 className="text-lg font-semibold text-foreground">No commission model</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Traditional agents charge 5–6% of sale price. On a $500K home, that is $25K–30K. Cladex charges a flat fee—$299 to $999—regardless of sale price. You keep the rest.
        </p>
      </section>

      <section className="mt-12 max-w-2xl">
        <h2 className="text-lg font-semibold text-foreground">Disclaimers</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cladex is structured workflow software. We are not a broker, attorney, escrow provider, or financial advisor. Guided review is informational only.
        </p>
      </section>

      <section className="mt-16 max-w-2xl">
        <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="font-medium text-foreground">{faq.q}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-12">
        <Link href="/signup">
          <Button size="lg">Start Your Transaction</Button>
        </Link>
      </div>
    </div>
  );
}
