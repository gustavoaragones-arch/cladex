import { Container } from "@components/Container";

export const metadata = {
  title: "Trust & Safety — Cladex",
  description:
    "Cladex Trust Center — platform governance, AI principles, security, and data protection.",
};

const trustCards = [
  {
    title: "Platform Governance",
    description:
      "Cladex is a technology platform operated by Albor Digital LLC. It provides workflow and analytical tools for real estate transactions. Cladex does not act as a broker, legal advisor, or financial institution.",
  },
  {
    title: "Responsible AI",
    description:
      "AI assists users but does not make decisions. Users are informed when AI-generated insights are used. All transaction decisions remain the responsibility of users. AI outputs are informational only.",
  },
  {
    title: "Privacy & Data Protection",
    description:
      "Cladex follows privacy-by-design principles including encryption in transit and at rest, role-based access controls, secure cloud infrastructure, and breach response procedures.",
  },
  {
    title: "Security Infrastructure",
    description:
      "Platform security includes encrypted communications (TLS), secure cloud hosting, access controls for staff, and monitoring for unauthorized access.",
  },
  {
    title: "Data Governance",
    description:
      "Strict controls for data handling: minimal data collection, limited internal access, secure storage, and full user data rights including access and deletion.",
  },
  {
    title: "Platform Safety",
    description:
      "Cladex enforces platform safety policies including fraud detection, misuse monitoring, and user reporting mechanisms. Accounts violating policies may be suspended or removed.",
  },
];

export default function TrustPage() {
  return (
    <Container>
      <div className="px-4 max-w-5xl mx-auto py-20 md:py-32">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2">
          TRUST CENTER
        </p>
        <h1 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Trust & Safety
        </h1>
        <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
          Cladex is committed to responsible technology, data protection, and transparent AI practices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-10 my-16">
          {trustCards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start shadow-lg px-8 py-12 rounded-xl border"
            >
              <h2 className="text-zinc-900 text-2xl font-display tracking-tight">
                {card.title}
              </h2>
              <p className="text-sm text-zinc-600 mt-6 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            Regulatory Awareness
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            Real estate regulations vary across jurisdictions. Cladex is designed as software infrastructure to assist with transaction organization, not as a regulated brokerage or advisory service. Users are responsible for ensuring their use of the platform complies with applicable laws in their jurisdiction.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
            Onboarding Consent
          </h2>
          <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
            At account creation, users confirm they have read the Terms of Service and Privacy Policy, consent to automated AI processing of transaction data, and understand that Cladex does not act as their real estate broker or attorney.
          </p>
        </section>

        <div className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-8">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
          </p>
        </div>
        <p className="mt-6 text-sm text-zinc-500 space-y-1">
          <span className="block">Legal inquiries: legal@cladex.io</span>
          <span className="block">Security inquiries: security@cladex.io</span>
        </p>
      </div>
    </Container>
  );
}
