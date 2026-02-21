import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { CheckCircle2, Shield, FileCheck, Layers } from "lucide-react";

const TIERS = [
  { name: "Toolkit", price: 299 },
  { name: "Premium", price: 499, highlighted: true },
  { name: "Concierge", price: 999 },
];

const FAQS = [
  {
    q: "Is this legal?",
    a: "Yes. Cladex provides structured workflow software. You work with licensed professionals (attorney, title, escrow) for legal and transactional requirements. We structure the process; we do not replace it.",
  },
  {
    q: "Do I still need an attorney?",
    a: "Yes. We recommend attorney review at key stages. Cladex keeps you organized for your attorney; we do not provide legal advice.",
  },
  {
    q: "Is this replacing my agent?",
    a: "Cladex is workflow software, not a broker. You choose who to work with. Some users work with agents for specific services; others self-direct with attorney and title support.",
  },
  {
    q: "How does pricing work?",
    a: "Flat fee per transaction. No commission. $299 to $999 depending on tier. You pay once at the start of your transaction.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                Close confidently. Keep your equity.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Structured transaction workflow software for buyers and sellers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup">
                  <Button size="lg">Start Your Transaction</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline">See How It Works</Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block rounded-lg border border-border bg-muted/30 p-6 text-sm">
              <p className="font-medium text-foreground mb-4">Stage progression</p>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Pricing
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Offers
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Closing
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Framing */}
        <section className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <h2 className="text-xl font-semibold text-foreground">
              The friction is not savings. It is uncertainty.
            </h2>
            <ul className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl">
              <li className="text-muted-foreground">Large commission costs</li>
              <li className="text-muted-foreground">Complex documentation</li>
              <li className="text-muted-foreground">Deadline pressure</li>
              <li className="text-muted-foreground">Fear of mistakes</li>
            </ul>
            <p className="mt-6 max-w-xl text-sm text-muted-foreground">
              Measured. Data-informed. Not aggressive.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <h2 className="text-xl font-semibold text-foreground">Structured execution.</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-3xl">
              <div className="flex gap-4">
                <Layers className="h-8 w-8 shrink-0 text-muted-foreground" />
                <div>
                  <h3 className="font-medium text-foreground">Guided Stage Progression</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Move through intake, listing, offers, under contract, due diligence, and closing.
                    No skipped steps. Clear next actions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <FileCheck className="h-8 w-8 shrink-0 text-muted-foreground" />
                <div>
                  <h3 className="font-medium text-foreground">Offer Risk Comparison</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Compare offers side by side with risk-adjusted scoring. Financing, contingencies,
                    and closing terms at a glance.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="h-8 w-8 shrink-0 text-muted-foreground" />
                <div>
                  <h3 className="font-medium text-foreground">Risk Radar Monitoring</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    See what needs attention: missing documents, overdue tasks, unresolved flags.
                    Address risk before it becomes a problem.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-8 w-8 shrink-0 text-muted-foreground" />
                <div>
                  <h3 className="font-medium text-foreground">Professional Review Integration</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Document-ready workflows. Clear stage status for your attorney, title company,
                    and lender. We organize; you decide when to involve professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <h2 className="text-xl font-semibold text-foreground">How it works</h2>
            <ol className="mt-6 space-y-4 max-w-xl">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">1</span>
                <span className="text-muted-foreground">Create your transaction</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">2</span>
                <span className="text-muted-foreground">Follow structured stages</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">3</span>
                <span className="text-muted-foreground">Compare offers with risk scoring</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">4</span>
                <span className="text-muted-foreground">Coordinate inspections and documentation</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">5</span>
                <span className="text-muted-foreground">Close deliberately</span>
              </li>
            </ol>
            <Link href="/how-it-works" className="mt-6 inline-block">
              <Button variant="outline">See the full workflow</Button>
            </Link>
          </div>
        </section>

        {/* Trust */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <h2 className="text-xl font-semibold text-foreground">Software, not brokerage.</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Cladex is workflow software. We are not a broker, legal advisor, or escrow holder.
              We provide structured execution tools. Regulatory insulation.
            </p>
            <ul className="mt-6 space-y-2 max-w-xl text-sm text-muted-foreground">
              <li>— Not a broker</li>
              <li>— Not a legal advisor</li>
              <li>— Not escrow</li>
              <li>— Workflow only</li>
            </ul>
          </div>
        </section>

        {/* Pricing Snapshot */}
        <section className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <h2 className="text-xl font-semibold text-foreground">Pricing</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Flat fee per transaction. No commission.
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-lg border p-6 flex flex-col ${
                    tier.highlighted ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  <h3 className="font-medium text-foreground">{tier.name}</h3>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
                    ${tier.price}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">per transaction</p>
                  <Link href="/signup" className="mt-6 block">
                    <Button variant={tier.highlighted ? "default" : "outline"} className="w-full">
                      Get {tier.name}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/pricing" className="mt-6 inline-block text-sm text-primary hover:underline">
              View full pricing details
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
            <dl className="mt-8 space-y-6 max-w-2xl">
              {FAQS.map((faq) => (
                <div key={faq.q}>
                  <dt className="font-medium text-foreground">{faq.q}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <h2 className="text-xl font-semibold text-foreground max-w-xl">
              Structured clarity for one of life&apos;s largest financial decisions.
            </h2>
            <div className="mt-8">
              <Link href="/signup">
                <Button size="lg">Start Your Transaction</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
