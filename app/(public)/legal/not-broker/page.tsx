import { Container } from "@components/Container";

export const metadata = {
  title: "Not a Broker — Cladex Platform Disclaimer",
  description:
    "Cladex is a technology platform. We are not a real estate broker, attorney, escrow provider, or financial advisor.",
};

export default function NotBrokerPage() {
  return (
    <Container>
      <div className="px-4 max-w-3xl mx-auto py-20 md:py-32">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2">
          LEGAL
        </p>
        <h1 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Not a Real Estate Broker
        </h1>
        <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
          Cladex is a software platform developed by Albor Digital LLC that provides tools for organizing and analyzing real estate transactions.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-8">
          <p className="text-lg tracking-tight text-zinc-700 leading-relaxed font-medium">
            Cladex is a technology platform that provides structured workflow tools to assist users in organizing real estate transactions. Cladex is not a real estate broker, agent, attorney, escrow provider, title company, or financial advisor. Users remain solely responsible for all transaction decisions and compliance with applicable real estate laws.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            What Cladex Does
          </h2>
          <ul className="mt-4 space-y-2 text-lg tracking-tight text-zinc-600 leading-relaxed list-disc list-inside">
            <li>Workflow tools for managing transactions</li>
            <li>Document organization tools</li>
            <li>AI-powered transaction insights</li>
            <li>Collaboration features for real estate participants</li>
            <li>Risk indicators and transaction checklists</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            What Cladex Does NOT Do
          </h2>
          <ul className="mt-4 space-y-2 text-lg tracking-tight text-zinc-600 leading-relaxed list-disc list-inside">
            <li>Represent buyers or sellers</li>
            <li>Negotiate real estate transactions</li>
            <li>List properties on MLS</li>
            <li>Hold escrow funds</li>
            <li>Provide legal advice</li>
            <li>Provide tax or financial advice</li>
            <li>Charge commission on property sales</li>
            <li>Create fiduciary or agency relationships</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            No Agency or Fiduciary Relationship
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            Use of the Platform does not create any brokerage relationship, fiduciary duty, agency relationship, or attorney-client relationship between Cladex and any user.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            User Responsibility
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            Real estate transactions involve legal and financial obligations. Users are responsible for reviewing contracts, complying with real estate regulations, and consulting licensed professionals when appropriate. Cladex provides software tools only.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            Professional Referrals
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            Cladex may provide referrals to third-party professionals including attorneys, inspectors, and title companies. These professionals operate independently and are not employees or agents of Cladex. Cladex does not guarantee their services or outcomes.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            Transaction Risk
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            Real estate transactions involve significant financial and legal risks. Cladex does not guarantee successful closing, transaction timing, property value accuracy, financing approval, or legal compliance. Users assume full responsibility for decisions made using the platform.
          </p>
        </section>

        <div className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-8">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
          </p>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Questions: legal@cladex.io
        </p>
      </div>
    </Container>
  );
}
