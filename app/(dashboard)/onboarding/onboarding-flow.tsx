"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completeOnboarding } from "./actions";

const ROLES = [
  { value: "seller", label: "Selling" },
  { value: "buyer", label: "Buying" },
  { value: "both", label: "Both" },
] as const;

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<string>("");
  const [property, setProperty] = useState({
    address: "",
    estimated_value: "",
    mortgage_balance: "",
    state: "",
    hoa: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estimatedValue = parseFloat(property.estimated_value) || 0;
  const commissionMin = estimatedValue * 0.05;
  const commissionMax = estimatedValue * 0.06;

  function handleStep1Next() {
    if (!role) return;
    setStep(2);
  }

  function handleStep2Next() {
    if (!property.address.trim()) return;
    setStep(3);
  }

  async function handleCreate() {
    setError(null);
    setLoading(true);
    const result = await completeOnboarding({
      role: role as "buyer" | "seller" | "both",
      address: property.address.trim(),
      estimated_value: estimatedValue || null,
      mortgage_balance: property.mortgage_balance ? parseFloat(property.mortgage_balance) : null,
      state: property.state.trim() || null,
      hoa: property.hoa,
    });
    setLoading(false);
    if (result.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Get started</h1>
        <p className="mt-1 text-sm text-muted-foreground">Step {step} of 3</p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-foreground">What type of transaction are you managing?</h2>
          <div className="space-y-2">
            {ROLES.map((r) => (
              <label
                key={r.value}
                className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer ${
                  role === r.value ? "border-primary bg-primary/5" : "border-border hover:bg-accent/50"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={r.value}
                  checked={role === r.value}
                  onChange={() => setRole(r.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-foreground">{r.label}</span>
              </label>
            ))}
          </div>
          <Button onClick={handleStep1Next} disabled={!role} className="w-full">
            Next
          </Button>
        </div>
      )}

      {step === 2 && (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleStep2Next();
          }}
        >
          <h2 className="text-sm font-medium text-foreground">Property details</h2>
          <div className="space-y-3">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={property.address}
                onChange={(e) => setProperty((p) => ({ ...p, address: e.target.value }))}
                placeholder="123 Main St, City, ST"
                required
              />
            </div>
            <div>
              <Label htmlFor="estimated_value">Estimated value</Label>
              <Input
                id="estimated_value"
                type="number"
                value={property.estimated_value}
                onChange={(e) => setProperty((p) => ({ ...p, estimated_value: e.target.value }))}
                placeholder="500000"
              />
            </div>
            <div>
              <Label htmlFor="mortgage_balance">Mortgage balance</Label>
              <Input
                id="mortgage_balance"
                type="number"
                value={property.mortgage_balance}
                onChange={(e) => setProperty((p) => ({ ...p, mortgage_balance: e.target.value }))}
                placeholder="300000"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={property.state}
                onChange={(e) => setProperty((p) => ({ ...p, state: e.target.value }))}
                placeholder="CA"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={property.hoa}
                onChange={(e) => setProperty((p) => ({ ...p, hoa: e.target.checked }))}
              />
              <span className="text-sm text-foreground">HOA</span>
            </label>
          </div>
          {estimatedValue > 0 && (
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-1 text-sm">
              <p className="text-muted-foreground">
                Estimated traditional commission range:{" "}
                <span className="font-medium text-foreground">
                  ${commissionMin.toLocaleString()} – ${commissionMax.toLocaleString()}
                </span>
              </p>
              <p className="text-muted-foreground">
                Structured toolkit cost:{" "}
                <span className="font-medium text-foreground">$299 – $999</span>
              </p>
            </div>
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button type="submit" disabled={!property.address.trim()} className="flex-1">
              Next
            </Button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Your Structured Plan Is Ready</h2>
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3 text-sm">
            <p><span className="text-muted-foreground">Role:</span> {ROLES.find((r) => r.value === role)?.label}</p>
            <p><span className="text-muted-foreground">Property:</span> {property.address}</p>
            {estimatedValue > 0 && (
              <>
                <p>
                  <span className="text-muted-foreground">Traditional commission range:</span>{" "}
                  <span className="font-medium text-foreground">
                    ${commissionMin.toLocaleString()} – ${commissionMax.toLocaleString()}
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">Structured toolkit:</span>{" "}
                  <span className="font-medium text-foreground">$299 – $999</span>
                </p>
              </>
            )}
          </div>
          <div className="rounded-lg border border-border p-4 space-y-3 text-sm">
            <p className="font-medium text-foreground">What you get</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>— Stage roadmap with structured progression</li>
              <li>— Risk protection features and visibility</li>
              <li>— Attorney review reminder before key steps</li>
            </ul>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
              Back
            </Button>
            <Button onClick={handleCreate} disabled={loading} className="flex-1">
              {loading ? "Creating…" : "Create Transaction"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
