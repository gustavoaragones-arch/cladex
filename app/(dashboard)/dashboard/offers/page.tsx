import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { OffersTable } from "./offers-table";

export default async function OffersPage() {
  await requireUser();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: transactions } = await supabase
    .from("transactions")
    .select("id, properties(address)")
    .eq("user_id", user.id);

  const txIds = (transactions ?? []).map((t) => t.id);
  const { data: offersData } =
    txIds.length > 0
      ? await supabase
          .from("offers")
          .select("id, transaction_id, price, financing_type, down_payment_percent, risk_score")
          .in("transaction_id", txIds)
          .order("transaction_id")
          .order("price", { ascending: false })
      : { data: null };
  const offers = offersData ?? [];

  const txMap = new Map(
    (transactions ?? []).map((t) => {
      const props = t.properties as unknown;
      const address =
        Array.isArray(props) && props[0] && typeof props[0] === "object" && "address" in props[0]
          ? (props[0] as { address: string }).address
          : "—";
      return [t.id, address];
    })
  );

  const rows = offers.map((o, idx) => ({
    id: o.id,
    transactionId: o.transaction_id,
    address: txMap.get(o.transaction_id) ?? "—",
    price: Number(o.price),
    financing: o.financing_type ?? "—",
    downPaymentPercent: Number(o.down_payment_percent),
    riskScore: o.risk_score ?? 0,
    rank: idx + 1,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Offers</h1>
        <p className="mt-1 text-muted-foreground">
          Compare and manage offers across your transactions.
        </p>
      </div>
      <OffersTable offers={rows} />
    </div>
  );
}
