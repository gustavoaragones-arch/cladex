import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            Cladex
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-xl font-semibold text-foreground">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          This page is a placeholder. Replace with your privacy policy.
        </p>
      </main>
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/legal/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/legal/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/legal/disclaimer" className="hover:text-foreground">
            Not Broker Disclaimer
          </Link>
        </div>
      </footer>
    </div>
  );
}
