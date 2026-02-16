export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-foreground">Not Broker Disclaimer</h1>

        <div className="mt-6 rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
          <p className="font-medium text-foreground">
            Cladex is NOT a real estate broker. Cladex does NOT provide legal advice. Cladex
            does NOT hold escrow. Cladex does NOT act as a financial advisor.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Cladex provides structured transaction workflow tools. We are software. We do not
            represent buyers or sellers, negotiate on your behalf, or guarantee outcomes.
          </p>
        </div>

        <div className="mt-8 space-y-4 text-muted-foreground text-sm">
          <p>
            Cladex provides checklists, stage progression, risk tracking, and document
            organization for real estate transactions. Our software guides you through a
            structured workflow. It does not replace professional advice.
          </p>
          <p>
            You should work with a licensed attorney for legal matters, a licensed escrow
            or title company for funds and recording, and—if you choose—a licensed real
            estate agent for representation in specific services.
          </p>
          <p>
            By using Cladex, you acknowledge that you understand we are not a broker,
            attorney, escrow provider, or financial advisor, and that you are responsible
            for your own transaction decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
