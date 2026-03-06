import { Container } from "@components/Container";

export const metadata = {
  title: "Platform Disclaimer — Cladex",
  description:
    "Cladex platform disclaimer. Not a broker, attorney, escrow provider, or financial advisor.",
};

export default function DisclaimerPage() {
  return (
    <Container>
      <div className="px-4 max-w-3xl mx-auto py-20 md:py-32">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2">
          LEGAL
        </p>
        <h1 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Platform Disclaimer
        </h1>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-8">
          <p className="text-lg tracking-tight text-zinc-700 leading-relaxed font-medium">
            Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor. Nothing in your use of this platform creates a brokerage, fiduciary, or agency relationship.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            Informational Only
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            All scores, risk indicators, workflow suggestions, and content produced by Cladex are informational only. They do not constitute legal counsel, financial advice, or brokerage services.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            No Guarantee of Outcomes
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            Cladex does not guarantee successful closing, accurate property valuations, financing approval, or legal compliance. Users assume full responsibility for all transaction decisions.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            Document Handling
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            Cladex provides document organization and storage tools only. Cladex does not review, verify, or approve any uploaded documents. Users are responsible for ensuring documents comply with applicable real estate laws.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            Limitation of Liability
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            To the maximum extent permitted by law, Cladex shall not be liable for failed property transactions, contract disputes, real estate market losses, incorrect property data, AI-generated insights, or third-party professional services. Total liability is limited to the fees paid to the platform.
          </p>
        </section>

        <div className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-8">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
          </p>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          legal@cladex.io
        </p>
      </div>
    </Container>
  );
}
