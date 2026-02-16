import { requireUser } from "@/lib/auth";

export default async function DashboardAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();
  return <>{children}</>;
}
