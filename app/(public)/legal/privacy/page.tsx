import { Container } from "@components/Container";

export const metadata = {
  title: "Privacy Policy — Cladex",
  description:
    "Privacy Policy for the Cladex platform operated by Albor Digital LLC.",
};

export default function PrivacyPage() {
  return (
    <Container>
      <div className="px-4 max-w-3xl mx-auto py-20 md:py-32">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2">
          LEGAL
        </p>
        <h1 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Effective Date: March 2025 · Operated by Albor Digital LLC
        </p>

        <div className="mt-12 space-y-10 text-zinc-600">
          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8 first:mt-0">
              1. Information We Collect
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              We collect information you provide when creating an account (email address, name), property and transaction data you enter into the platform, documents you upload, and usage data generated through your interaction with the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              2. How We Use Your Information
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              We use collected information to provide and improve platform services, generate AI-powered transaction insights, send transaction-related notifications and reminders, and ensure platform security and fraud prevention.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              3. AI Processing Disclosure
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              Property information and transaction data may be processed by automated systems to generate transaction insights and risk indicators. AI-generated outputs are informational only and do not constitute professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              4. Data Sharing
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              Cladex does not sell personal data. We may share data with third-party service providers who assist in platform operations, subject to confidentiality agreements. We may disclose data if required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              5. Data Security
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              Cladex applies encryption in transit and at rest, role-based access controls, secure cloud infrastructure, and breach response procedures to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              6. Data Retention
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              7. Your Rights
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data. Contact us at legal@cladex.io to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              8. Cookies
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              Cladex uses cookies and similar technologies to maintain session state and improve platform functionality. You may disable cookies in your browser settings, though some platform features may be affected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              9. Changes to This Policy
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              We may update this Privacy Policy periodically. Continued use of the platform after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display tracking-tight text-zinc-900 mt-8">
              10. Contact
            </h2>
            <p className="mt-4 text-lg tracking-tight text-zinc-600 leading-relaxed">
              Privacy inquiries: legal@cladex.io
            </p>
          </section>
        </div>

        <div className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-8">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
          </p>
        </div>
      </div>
    </Container>
  );
}
