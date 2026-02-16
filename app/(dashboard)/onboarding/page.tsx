import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { OnboardingFlow } from "./onboarding-flow";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: transactions } = await supabase
    .from("transactions")
    .select("id")
    .eq("user_id", user.id)
    .limit(1);

  if (transactions && transactions.length > 0) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-14 items-center px-4">
          <a href="/" className="text-lg font-semibold text-foreground">
            Cladex
          </a>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <OnboardingFlow />
        </div>
      </main>
    </div>
  );
}
