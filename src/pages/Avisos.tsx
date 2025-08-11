import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import ClientShell from "@/components/ClientShell";
import { Badge } from "@/components/ui/badge";

const Avisos = () => {
  const avisos = [
    { id: "1", title: "Bem-vindo ao ToolShare", body: "Novas ferramentas adicionadas esta semana.", date: "Hoje" },
  ];

  return (
    <ClientShell title="Avisos">
      <Helmet>
        <title>ToolShare - Avisos</title>
        <meta name="description" content="Avisos e comunicados importantes do ToolShare." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/avisos'} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4">
          {avisos.length === 0 ? (
            <Card className="card-premium p-6 text-center text-muted-foreground">Sem avisos no momento.</Card>
          ) : (
            avisos.map((a) => (
              <Card key={a.id} className="card-premium p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <Badge className="bg-primary/20 text-primary">{a.date}</Badge>
                </div>
                <p className="text-muted-foreground">{a.body}</p>
              </Card>
            ))
          )}
        </div>
      </section>
    </ClientShell>
  );
};

export default Avisos;
