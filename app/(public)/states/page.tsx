import Link from "next/link";
import { Button } from "@/components/ui/button";

const STATES = [
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

export default function StatesIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          State information
        </h1>
        <p className="mt-4 text-muted-foreground">
          Cladex provides structured transaction management. State-specific content is
          informational only. We do not replace licensed professionals.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          In some states, attorney review is customary or required. Cladex recommends
          professional review prior to contract execution.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-2xl">
        {STATES.map((code) => (
          <Link
            key={code}
            href={`/states/${code}`}
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            {STATE_NAMES[code] ?? code.toUpperCase()}
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/">
          <Button variant="outline">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
