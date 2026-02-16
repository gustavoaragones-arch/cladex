import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            How Cladex works
          </h1>
          <p className="mt-4 text-muted-foreground">
            A structured, step-by-step workflow for real estate transactions. No broker. No
            commission. No guesswork.
          </p>
        </div>

        {/* Step-by-step workflow */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-lg font-semibold text-foreground">Step-by-step workflow</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every transaction follows a clear progression. You move forward only when you’re ready.
          </p>
          <ol className="mt-8 space-y-6 max-w-2xl">
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground">1</span>
              <div>
                <h3 className="font-medium text-foreground">Intake</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add your property details, estimated value, mortgage balance, and role (buyer,
                  seller, or both). Complete ownership verification.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground">2</span>
              <div>
                <h3 className="font-medium text-foreground">Listing</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Set listing price, prepare disclosures, upload photos. We guide you through
                  seller-specific requirements.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground">3</span>
              <div>
                <h3 className="font-medium text-foreground">Offers</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Compare offers side by side. Document financing type, contingencies, closing
                  timeline, and risk score. No skipping stages.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground">4</span>
              <div>
                <h3 className="font-medium text-foreground">Under contract</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Execute purchase agreement, open escrow, schedule inspections. Checklists keep
                  you on track.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground">5</span>
              <div>
                <h3 className="font-medium text-foreground">Due diligence</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete inspections, review appraisal, address contingencies. Risk Radar surfaces
                  missing documents and overdue tasks.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground">6</span>
              <div>
                <h3 className="font-medium text-foreground">Closing</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Final walkthrough, closing disclosure review, recording. Transfer keys and
                  disburse funds.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Stage progression */}
        <section className="mt-12 md:mt-16 border-t border-border pt-12">
          <h2 className="text-lg font-semibold text-foreground">Stage progression</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Stages advance forward only. No skipping, no regressing. Each stage unlocks
            stage-specific tasks and checklists. You control when to move on—we ensure you
            don’t miss steps.
          </p>
        </section>

        {/* Risk tracking */}
        <section className="mt-12 md:mt-16 border-t border-border pt-12">
          <h2 className="text-lg font-semibold text-foreground">Risk tracking</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Risk Radar monitors: missing documents (e.g., contract in contract stage, inspection
            in due diligence), overdue tasks, and unresolved risk flags. Higher risk = higher
            score. You see what needs attention before it becomes a problem.
          </p>
        </section>

        {/* Professional integrations */}
        <section className="mt-12 md:mt-16 border-t border-border pt-12">
          <h2 className="text-lg font-semibold text-foreground">Professional integrations</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Cladex keeps you organized for your attorney, title company, and lender. Export-ready
            documents, clear stage status, and audit trails. We don’t replace professionals—we
            make working with them smoother.
          </p>
        </section>

        {/* What Cladex does NOT do */}
        <section className="mt-12 md:mt-16 border-t border-border pt-12">
          <h2 className="text-lg font-semibold text-foreground">What Cladex does not do</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground max-w-2xl">
            <li>We are <strong className="text-foreground">not a broker</strong>. We do not represent buyers or sellers.</li>
            <li>We do <strong className="text-foreground">not provide legal advice</strong>. Work with your attorney.</li>
            <li>We do <strong className="text-foreground">not hold escrow</strong>. Escrow is handled by licensed escrow companies.</li>
            <li>We do <strong className="text-foreground">not negotiate</strong> on your behalf.</li>
            <li>We do <strong className="text-foreground">not guarantee</strong> outcomes. We provide structure and visibility.</li>
          </ul>
        </section>

        <div className="mt-12 md:mt-16">
          <Link href="/signup">
            <Button size="lg">Start Your Transaction</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
