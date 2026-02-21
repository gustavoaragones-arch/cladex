import { PageHeader } from "@/components/dashboard/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function BillingPage() {
  const plans = [
    { name: "Toolkit", price: 299, desc: "Core workflow tools" },
    { name: "Premium", price: 499, desc: "Full transaction support", current: true },
    { name: "Concierge", price: 999, desc: "White-glove service" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <PageHeader
          title="Billing"
          description="Manage your plan and payment history."
        />
        <p className="mt-2 text-xs text-muted-foreground max-w-xl">
          Cladex charges flat fees for workflow access. We do not receive commission from property
          sales.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Current plan</CardTitle>
            <CardDescription>Your active subscription.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Premium</p>
                  <p className="text-sm text-muted-foreground">
                    Full transaction support
                  </p>
                </div>
                <p className="text-lg font-semibold tabular-nums text-foreground">
                  $499
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Payment status</CardTitle>
            <CardDescription>Latest payment information.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 p-4">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-foreground">Active</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">
                Next billing: Mar 15, 2025
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Plans</CardTitle>
          <CardDescription>Upgrade or change your plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-lg border p-4 ${
                  p.current
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  {p.current && (
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xl font-semibold tabular-nums text-foreground">
                  ${p.price}
                </p>
                <Button
                  variant={p.current ? "outline" : "default"}
                  size="sm"
                  className="mt-3 w-full"
                  disabled={p.current}
                >
                  {p.current ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Current plan
                    </>
                  ) : (
                    "Upgrade"
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Transaction history</CardTitle>
          <CardDescription>Past payments and invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium text-foreground">Date</th>
                  <th className="py-3 pr-4 font-medium text-foreground">Description</th>
                  <th className="py-3 font-medium text-foreground text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground">Feb 15, 2025</td>
                  <td className="py-3 pr-4">Premium plan</td>
                  <td className="py-3 text-right tabular-nums">$499.00</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground">Jan 15, 2025</td>
                  <td className="py-3 pr-4">Premium plan</td>
                  <td className="py-3 text-right tabular-nums">$499.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
