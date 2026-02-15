import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            Cladex
          </Link>
          <Link href="/dashboard">
            <Button>Start Transaction</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        <section className="max-w-2xl">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Transaction workflow for real estate
          </h1>
          <p className="mt-2 text-muted-foreground">
            Structured, legally-safe tools for buyers and sellers. We are not a
            broker, attorney, escrow provider, or financial advisor.
          </p>
        </section>
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
