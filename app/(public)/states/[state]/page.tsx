import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

const US_STATES = [
  "al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga",
  "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md",
  "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj",
  "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc",
  "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy", "dc",
];

const STATE_NAMES: Record<string, string> = {
  al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas", ca: "California",
  co: "Colorado", ct: "Connecticut", de: "Delaware", fl: "Florida", ga: "Georgia",
  hi: "Hawaii", id: "Idaho", il: "Illinois", in: "Indiana", ia: "Iowa",
  ks: "Kansas", ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland",
  ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi",
  mo: "Missouri", mt: "Montana", ne: "Nebraska", nv: "Nevada", nh: "New Hampshire",
  nj: "New Jersey", nm: "New Mexico", ny: "New York", nc: "North Carolina",
  nd: "North Dakota", oh: "Ohio", ok: "Oklahoma", or: "Oregon", pa: "Pennsylvania",
  ri: "Rhode Island", sc: "South Carolina", sd: "South Dakota", tn: "Tennessee",
  tx: "Texas", ut: "Utah", vt: "Vermont", va: "Virginia", wa: "Washington",
  wv: "West Virginia", wi: "Wisconsin", wy: "Wyoming", dc: "District of Columbia",
};

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const stateLower = state.toLowerCase();
  if (!US_STATES.includes(stateLower)) notFound();

  const stateName = STATE_NAMES[stateLower] ?? state;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          {stateName}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Structured transaction management. State-specific content is for informational
          purposes only. Cladex does not replace licensed professionals.
        </p>

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-foreground">Closing process overview</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              State-specific closing procedures vary. This section will describe general
              process flow for {stateName}. Cladex provides structured workflow tools; we
              do not provide legal or escrow services.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground">Attorney involvement</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              In some states, attorney review is customary or required. Cladex recommends
              professional review prior to contract execution. We do not replace licensed
              attorneys.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground">Disclosure norms</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Disclosure requirements vary by state. This section will outline common
              disclosure norms for {stateName}. Consult a licensed professional for
              specific obligations.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h2 className="text-base font-medium text-foreground">Professional review</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Cladex recommends professional review at key stages. We structure the
              process so you know when to involve your attorney, title company, or
              other licensed professionals. We do not provide legal advice.
            </p>
          </div>
        </section>

        <div className="mt-8 space-y-4">
          <Link href="/how-it-works">
            <Button variant="outline">See how Cladex works</Button>
          </Link>
          <Link href="/legal/disclaimer" className="block text-sm text-muted-foreground hover:text-foreground">
            Not Broker Disclaimer
          </Link>
        </div>
      </div>
    </div>
  );
}
