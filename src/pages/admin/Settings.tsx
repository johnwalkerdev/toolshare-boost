import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const AdminSettings = () => {
  return (
    <AdminShell title="Admin - Settings">
      <Helmet>
        <title>Admin Settings | ToolShare</title>
        <meta name="description" content="Configure ToolShare admin preferences and platform options." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/settings"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary" /> Settings
          </h1>
          <p className="text-muted-foreground">General preferences for administrators.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Security</h2>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="2fa">Require 2FA</Label>
                <p className="text-sm text-muted-foreground">All admins must enable two-factor authentication.</p>
              </div>
              <Switch id="2fa" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sessions">Restrict sessions</Label>
                <p className="text-sm text-muted-foreground">Limit concurrent admin sessions per account.</p>
              </div>
              <Switch id="sessions" />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email">Email alerts</Label>
                <p className="text-sm text-muted-foreground">Receive an email when critical events occur.</p>
              </div>
              <Switch id="email" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="slack">Slack integration</Label>
                <p className="text-sm text-muted-foreground">Send alerts to your Slack workspace.</p>
              </div>
              <Switch id="slack" />
            </div>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline">Save changes</Button>
        </div>
      </section>
    </AdminShell>
  );
};

export default AdminSettings;
