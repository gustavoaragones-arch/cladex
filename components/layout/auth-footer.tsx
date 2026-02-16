import Link from "next/link";

export function AuthFooter() {
  return (
    <footer className="border-t border-border py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-center">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center">
          <Link href="/legal/terms" className="hover:text-foreground">Terms of Service</Link>
          <Link href="/legal/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="/legal/disclaimer" className="hover:text-foreground">Not Broker Disclaimer</Link>
        </div>
        <p className="text-xs text-muted-foreground max-w-xl">
          Cladex provides structured transaction workflow tools. We are not a real estate broker,
          attorney, escrow provider, or financial advisor.
        </p>
      </div>
    </footer>
  );
}
