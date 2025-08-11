import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClientShell from "@/components/ClientShell";

const CRM = () => {
  return (
    <ClientShell title="CRM">
      <Helmet>
        <title>ToolShare - CRM</title>
        <meta name="description" content="Gerencie seus clientes com o CRM integrado do ToolShare." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/crm'} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['A Fazer', 'Em Progresso', 'Concluído'].map((col) => (
            <Card key={col} className="card-premium p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">{col}</h2>
                <Button variant="outline" size="sm">+ Adicionar</Button>
              </div>
              <div className="space-y-3">
                {[1,2].map((i) => (
                  <div key={i} className="rounded-lg border border-border bg-secondary/30 p-3">
                    <p className="font-medium">Lead #{i}</p>
                    <p className="text-sm text-muted-foreground">Tarefa/Nota do cliente aqui</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </ClientShell>
  );
};

export default CRM;
