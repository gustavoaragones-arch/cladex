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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <PageHeader
          title="Settings"
          description="Manage your account and preferences."
        />
        <TrustNotice message="legal" className="mt-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Profile</CardTitle>
          <CardDescription>Basic account information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                defaultValue="placeholder@example.com"
                disabled
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                defaultValue="Placeholder"
                disabled
                className="bg-muted/50"
              />
            </div>
          </div>
          <Button variant="outline" size="sm" disabled>
            Save changes (placeholder)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Security</CardTitle>
          <CardDescription>Password and authentication.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Change password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled
              className="bg-muted/50"
            />
          </div>
          <Button variant="outline" size="sm" disabled>
            Update password (placeholder)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Notifications</CardTitle>
          <CardDescription>Email and in-app notification preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked disabled className="rounded border-input" />
              <span className="text-sm text-foreground">Task reminders</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked disabled className="rounded border-input" />
              <span className="text-sm text-foreground">Stage updates</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" disabled className="rounded border-input" />
              <span className="text-sm text-foreground">Marketing emails</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Data export</CardTitle>
          <CardDescription>Download your transaction data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" disabled>
            Export data (placeholder)
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-base font-medium text-destructive">
            Delete account
          </CardTitle>
          <CardDescription>
            Permanently remove your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="sm" disabled>
            Delete account (placeholder)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
