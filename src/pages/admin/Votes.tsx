import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

const AdminVotes = () => {
  const suggestions = [
    { id: "1", title: "Integração com Zapier", detail: "Automatizar fluxos com Zapier.", votes: 42, status: "planned" },
    { id: "2", title: "Melhorias no dashboard", detail: "Widgets customizáveis.", votes: 31, status: "in-progress" },
    { id: "3", title: "App mobile", detail: "Versão iOS/Android.", votes: 76, status: "open" },
  ] as const;

  const statusColor = (s: string) =>
    s === "in-progress" ? "bg-primary/20 text-primary" : s === "planned" ? "bg-muted/60 text-foreground" : "bg-accent/40 text-foreground";

  return (
    <AdminShell title="Admin - Voting">
      <Helmet>
        <title>Admin Voting | ToolShare</title>
        <meta name="description" content="View and manage feature voting and suggestions." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/votes"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <ThumbsUp className="h-7 w-7 text-primary" /> Voting
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((s) => (
            <Card key={s.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                </div>
                <Badge className={statusColor(s.status)}>{s.status}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.votes} votos</span>
                <Button size="sm" variant="outline">Ver</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AdminShell>
  );
};

export default AdminVotes;
