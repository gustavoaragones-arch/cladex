import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: txList } = user
    ? await supabase
        .from("transactions")
        .select("id, stage, status, properties(address)")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(5)
    : { data: [] };
  const transactions = txList ?? [];

  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex flex-1 flex-col min-w-0 lg:pl-0">
        <DashboardTopbar transactions={transactions} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
