import Link from "next/link";
import { Container } from "@components/Container";
import Button from "@components/Button";

export const metadata = {
  title: "How It Works — Cladex",
  description:
    "How Cladex guides buyers and sellers through every stage of a real estate transaction.",
};

const steps = [
  {
    number: "01",
    title: "Create a Transaction Workspace",
    description:
      "Start by creating a real estate transaction workspace for your deal. Each workspace organizes offer details, documents and disclosures, transaction timeline, participants, and inspection milestones. No more scattered documents or missed emails.",
  },
  {
    number: "02",
    title: "Upload and Organize Documents",
    description:
      "Real estate deals involve dozens of documents. Upload and manage purchase agreements, property disclosures, inspection reports, financing documents, and closing paperwork — all in a secure, structured system.",
  },
  {
    number: "03",
    title: "AI Analyzes the Transaction",
    description:
      "Cladex uses AI to help users better understand complex transaction data. The platform summarizes documents, highlights key clauses, identifies potential transaction risks, and detects missing workflow steps. AI insights are decision-support tools, not decision makers.",
  },
  {
    number: "04",
    title: "Track the Deal Timeline",
    description:
      "Every real estate deal has critical deadlines. Cladex automatically tracks offer submission, inspection periods, financing approvals, contingency deadlines, and closing dates. Alerts and reminders keep the transaction on schedule.",
  },
  {
    number: "05",
    title: "Collaborate with Stakeholders",
    description:
      "Real estate transactions involve many participants. Cladex allows secure collaboration with buyers, sellers, attorneys, inspectors, lenders, and advisors — each with access to only what they need.",
  },
  {
    number: "06",
    title: "Monitor Transaction Risk",
    description:
      "Cladex provides risk indicators that help users identify potential issues before they impact the deal — missing disclosures, incomplete documentation, timeline conflicts, and potential legal review areas.",
  },
  {
    number: "07",
    title: "Close with Confidence",
    description:
      "As the transaction approaches closing, Cladex ensures all required steps are complete. Verify document readiness, compliance steps, and timeline completion — reducing delays and surprises at closing.",
  },
];

export default function HowItWorksPage() {
  return (
    <Container>
      <div className="px-4">
        {/* SECTION 1 — HERO */}
        <div className="relative z-10 max-w-7xl mx-auto mt-32">
          <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium text-center mb-4">
            HOW IT WORKS
          </p>
          <h1 className="font-semibold text-4xl sm:text-7xl text-center max-w-5xl mx-auto text-zinc-800 leading-tight tracking-tight">
            From First Offer to Closing — Structured.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl tracking-tight text-zinc-600 text-center leading-normal">
            Cladex organizes every stage of your real estate transaction into a clear, guided workflow. Seven steps. Every deadline tracked. Every document organized. Every risk visible.
          </p>
        </div>

        {/* SECTION 2 — STEPS */}
        <div className="px-4 py-20 md:py-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-10 md:gap-16">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="shadow-lg px-8 py-12 rounded-xl border flex flex-col"
              >
                <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2">
                  {step.number}
                </p>
                <h2 className="text-zinc-900 text-2xl font-display tracking-tight">
                  {step.title}
                </h2>
                <p className="text-sm text-zinc-600 mt-6 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3 — WHY IT MATTERS */}
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none py-20 md:py-40 px-4">
          <h2 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Why Real Estate Transactions Need Better Software
          </h2>
          <p className="mt-6 text-lg tracking-tight text-zinc-600">
            Buying or selling property is one of the most complex financial processes people experience. Traditional transaction management relies heavily on email threads, document attachments, spreadsheets, and manual checklists. Cladex replaces these fragmented systems with modern real estate transaction software designed for the digital era.
          </p>
        </div>

        {/* SECTION 4 — CTA */}
        <div className="relative rounded-2xl bg-vulcan-700 mx-4 mb-20 mt-20 text-gray-100 max-w-6xl lg:mx-auto min-h-96 h-full overflow-hidden pb-4">
          <div className="lg:grid lg:grid-cols-1 gap-10 p-2 md:p-8 relative z-20">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-bold my-4 text-center">
                Ready to Manage Your Transaction?
              </h2>
              <p className="my-4 text-base text-gray-300 md:text-lg tracking-wide font-light text-center max-w-lg mx-auto">
                Start your first Cladex workspace in under a minute.
              </p>
              <div className="flex justify-center">
                <Button as="button" variant="large" className="rounded-2xl py-2">
                  <Link href="/signup">Start Your Transaction</Link>
                </Button>
              </div>
              <p className="text-xs text-gray-400 text-center max-w-lg mx-auto mt-4">
                Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
