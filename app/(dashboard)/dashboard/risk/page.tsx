import { PageHeader } from "@/components/dashboard/page-header";
import { TrustNotice } from "@/components/dashboard/trust-notice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RiskRadarPage() {
  return (
    <div className="space-y-6">
      <div>
        <PageHeader
          title="Risk Radar"
          description="View transaction risk, flags, and recommended next steps."
        />
        <p className="mt-2 text-xs text-muted-foreground max-w-xl">
          Risk indicators are generated algorithmically based on available inputs. Always confirm
          with licensed professionals where required.
        </p>
        <TrustNotice className="mt-2" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Overall risk score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tabular-nums text-foreground">
                42
              </span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Lower is better. Based on flags, documents, and task completion.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Risk flags</CardTitle>
            <CardDescription>Active issues affecting this transaction.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/20 text-xs font-medium text-amber-700 dark:text-amber-400">
                  M
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Missing inspection response
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Due diligence stage requires documented inspection response.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted text-xs font-medium text-muted-foreground">
                  L
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    2 overdue tasks
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Complete tasks to reduce risk.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Explanations</CardTitle>
            <CardDescription>How risk factors are evaluated.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Missing contract in Under Contract stage</li>
              <li>• Missing inspection docs in Due Diligence</li>
              <li>• Overdue tasks increase risk</li>
              <li>• Unresolved high-severity flags</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Recommendations</CardTitle>
            <CardDescription>Suggested next steps.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-2 pl-4 text-sm text-foreground">
              <li>Upload inspection response document</li>
              <li>Complete overdue tasks in Tasks</li>
              <li>Review and resolve risk flags</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
