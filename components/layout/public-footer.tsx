import Link from "next/link";

const links = {
  Product: [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/legal/terms", label: "Terms of Service" },
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/disclaimer", label: "Not Broker Disclaimer" },
    { href: "/states", label: "State Info" },
  ],
} as const;

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Product</p>
            <ul className="space-y-2">
              {links.Product.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Company</p>
            <ul className="space-y-2">
              {links.Company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Legal</p>
            <ul className="space-y-2">
              {links.Legal.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href="/" className="text-lg font-semibold text-foreground">
              Cladex
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Structured transaction workflow for real estate. Not a broker.
            </p>
          </div>
        </div>
        <p className="mt-8 pt-8 border-t border-border text-xs text-muted-foreground">
          Cladex provides structured transaction workflow tools. We are not a real estate broker,
          attorney, escrow provider, or financial advisor.
        </p>
      </div>
    </footer>
  );
}
