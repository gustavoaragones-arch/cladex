import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          About Cladex
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Cladex is infrastructure software for real estate transactions. We provide structure,
          visibility, and predictability—so buyers and sellers can close confidently.
        </p>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-foreground">Why structure matters</h2>
          <p className="mt-3 text-muted-foreground">
            Real estate transactions are complex. Dozens of steps, deadlines, documents, and
            handoffs. Without structure, things fall through the cracks. Cladex enforces a
            clear progression: intake, listing, offers, under contract, due diligence, closing.
            Each stage has defined tasks. Nothing is skipped. You always know where you are
            and what comes next.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Why workflow reduces risk</h2>
          <p className="mt-3 text-muted-foreground">
            Risk in real estate often comes from gaps: missing documents, overdue tasks,
            unresolved contingencies. Our Risk Radar surfaces these gaps before they become
            problems. Checklists ensure nothing is forgotten. Stage progression prevents
            moving forward prematurely. Structure creates accountability—to yourself and to
            your attorney, title company, and lender.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Why transparency matters</h2>
          <p className="mt-3 text-muted-foreground">
            Hidden fees, opaque processes, and surprise costs erode trust. Cladex is
            transparent: flat fee per transaction, no commission, no percentage of sale price.
            You see every stage, every task, every document. Audit trails log changes. You
            retain control and visibility throughout.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">What we are</h2>
          <p className="mt-3 text-muted-foreground">
            We are workflow software. We are not a broker, attorney, escrow provider, or
            financial advisor. We do not represent you, give legal advice, hold funds, or
            negotiate on your behalf. We provide the infrastructure—structure, checklists,
            risk tracking, document organization—so you can work effectively with the
            professionals you choose.
          </p>
        </section>

        <div className="mt-12">
          <Link href="/signup">
            <Button>Start Your Transaction</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
