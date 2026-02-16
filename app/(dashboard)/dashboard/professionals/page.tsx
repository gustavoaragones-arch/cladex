import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { TrustNotice } from "@/components/dashboard/trust-notice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Scale, FileCheck } from "lucide-react";

export default function ProfessionalsPage() {
  const categories = [
    {
      title: "Attorney directory",
      description: "Real estate attorneys for contract review and closing.",
      icon: Scale,
    },
    {
      title: "Title companies",
      description: "Title search, insurance, and escrow services.",
      icon: FileCheck,
    },
    {
      title: "Flat-fee MLS partners",
      description: "List on MLS without traditional commission structures.",
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <PageHeader
          title="Professionals"
          description="Connect with attorneys, title companies, and MLS partners."
        />
        <TrustNotice message="broker" className="mt-2" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.title}>
            <CardHeader className="pb-2">
              <cat.icon className="mb-2 h-8 w-8 text-muted-foreground" />
              <CardTitle className="text-base font-medium">{cat.title}</CardTitle>
              <CardDescription>{cat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="#">
                <Button variant="outline" size="sm" className="w-full">
                  Schedule consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm font-medium text-foreground">
            Marketplace coming soon
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Professional directory and scheduling will be available in a future release.
          </p>
          <Button variant="outline" size="sm" className="mt-4" disabled>
            Schedule consultation (placeholder)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
