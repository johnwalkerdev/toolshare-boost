import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Megaphone } from "lucide-react";

const AdminAnnouncements = () => {
  return (
    <AdminShell title="Admin - Announcements">
      <Helmet>
        <title>Admin Announcements | ToolShare</title>
        <meta name="description" content="Create and manage announcements to broadcast updates to ToolShare users." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/announcements"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Megaphone className="h-7 w-7 text-primary" /> Announcements
          </h1>
          <p className="text-muted-foreground">Broadcast messages to all users.</p>
        </header>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="e.g. Scheduled maintenance" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={4} placeholder="Write your message here" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline">Preview</Button>
            <Button>Publish</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">To push notifications, connect Supabase in Lovable's native integration.</p>
        </Card>
      </section>
    </AdminShell>
  );
};

export default AdminAnnouncements;
