import Link from "next/link";
import { Container } from "@components/Container";
import Button from "@components/Button";
import { AboutHeroSection } from "@components/about/AboutHeroSection";
import { AboutSolutionSection } from "@components/about/AboutSolutionSection";

export const metadata = {
  title: "About — Cladex",
  description:
    "Cladex is a modern real estate transaction management platform built by Albor Digital LLC.",
};

export default function AboutPage() {
  return (
    <Container>
      <div className="px-4">
        {/* SECTION 1 — HERO */}
        <AboutHeroSection />

        {/* SECTION 2 — THE PROBLEM */}
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none py-20 md:py-40 px-4">
          <h2 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            The Problem: Real Estate Transactions Are Complex
          </h2>
          <p className="mt-6 text-lg tracking-tight text-zinc-600 max-w-xl mx-auto">
            Real estate deals involve many moving parts: contracts, disclosures, inspections, financing, timelines, and coordination among buyers, sellers, agents, and advisors.
          </p>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 max-w-xl mx-auto">
            Many deals still run on scattered emails, spreadsheets, and disconnected tools. That fragmentation leads to delays, missed deadlines, and costly mistakes. Cladex was built to fix that.
          </p>
        </div>

        {/* SECTION 3 — THE SOLUTION */}
        <AboutSolutionSection />

        {/* SECTION 4 — WHO IT'S FOR */}
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none pt-12 pb-8 md:pt-16 md:pb-12 px-4">
          <h2 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Built for the Modern Real Estate Market
          </h2>
          <ul className="mt-10 text-left max-w-xl mx-auto space-y-4 text-lg tracking-tight text-zinc-600">
            <li>
              <strong className="text-zinc-900">Property Buyers</strong> — Organize documents, timelines, and negotiations during home purchases.
            </li>
            <li>
              <strong className="text-zinc-900">Real Estate Investors</strong> — Track deal performance, transaction risks, and acquisition workflows.
            </li>
            <li>
              <strong className="text-zinc-900">Property Sellers</strong> — Manage offers, documentation, and closing steps efficiently.
            </li>
            <li>
              <strong className="text-zinc-900">Real Estate Professionals</strong> — Collaborate with clients and partners across the transaction process.
            </li>
          </ul>
        </div>

        {/* SECTION 5 — AI POSITIONING */}
        <div className="px-4 pt-8 pb-20 md:pt-12 md:pb-40">
          <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-12">
            <h2 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl">
              AI That Assists — Not Replaces — Professionals
            </h2>
            <p className="mt-6 text-lg tracking-tight text-zinc-600">
              Cladex integrates artificial intelligence to help users better understand transaction data. AI may assist with summarizing real estate documents, identifying potential transaction risks, generating negotiation insights, and highlighting missing steps in deal workflows.
            </p>
            <p className="mt-6 text-lg tracking-tight text-zinc-600">
              Cladex AI tools are designed to provide decision-support insights, while users remain responsible for all real estate decisions. Cladex does not act as a broker, legal advisor, or financial institution.
            </p>
          </div>
        </div>

        {/* SECTION 6 — CTA */}
        <div className="relative rounded-2xl bg-vulcan-700 mx-4 mb-20 mt-20 text-gray-100 max-w-6xl lg:mx-auto min-h-96 h-full overflow-hidden pb-4">
          <div className="lg:grid lg:grid-cols-1 gap-10 p-2 md:p-8 relative z-20">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-bold my-4 text-center">
                Start Your First Transaction
              </h2>
              <p className="my-4 text-base text-gray-300 md:text-lg tracking-wide font-light text-center max-w-lg mx-auto">
                Creating your first workspace takes less than a minute. Start organizing your real estate deals today.
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
