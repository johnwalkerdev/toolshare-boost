import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ClientShell from "@/components/ClientShell";

interface Lead {
  id: string;
  title: string;
  note?: string;
  priority: 'Baixa' | 'Média' | 'Alta';
}

const CRM = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [columns, setColumns] = useState<Record<string, Lead[]>>({
    "A Fazer": [
      { id: "1", title: "Novo lead — Landing", note: "Entrou via formulário", priority: 'Média' },
      { id: "2", title: "Proposta — Ana S.", note: "Enviar PDF consolidado", priority: 'Alta' },
    ],
    "Em Progresso": [
      { id: "3", title: "Onboarding — Time X", note: "Treinamento 14h", priority: 'Média' },
    ],
    "Concluído": [
      { id: "4", title: "Fechamento — Plano Team", note: "Upgrade trimestral", priority: 'Baixa' },
    ],
  });

  const addLead = () => {
    if (!title.trim()) return;
    setColumns((prev) => ({
      ...prev,
      "A Fazer": [{ id: Date.now().toString(), title, note, priority: 'Média' }, ...prev["A Fazer"]],
    }));
    setTitle("");
    setNote("");
    setOpen(false);
  };

  const moveLead = (from: string, to: string, id: string) => {
    if (from === to) return;
    setColumns((prev) => {
      const lead = prev[from].find((l) => l.id === id);
      if (!lead) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((l) => l.id !== id),
        [to]: [lead, ...prev[to]],
      };
    });
  };

  const totals = useMemo(() => ({
    total: Object.values(columns).reduce((acc, arr) => acc + arr.length, 0),
  }), [columns]);

  return (
    <ClientShell title="CRM">
      <Helmet>
        <title>ToolShare - CRM</title>
        <meta name="description" content="Gerencie seus clientes com um CRM de alto impacto, rápido e simples." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/crm'} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Pipeline</h2>
            <p className="text-muted-foreground text-sm">{totals.total} itens</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="premium">+ Novo lead</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea placeholder="Nota" value={note} onChange={(e) => setNote(e.target.value)} />
                <Button onClick={addLead}>Adicionar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(columns).map((col) => (
            <Card key={col} className="card-premium p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{col}</h3>
                <Badge className="bg-primary/20 text-primary">{columns[col].length}</Badge>
              </div>
              <div className="space-y-3">
                {columns[col].map((lead) => (
                  <div key={lead.id} className="rounded-lg border border-border bg-secondary/30 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{lead.title}</p>
                      <select
                        className="text-xs bg-transparent border border-border rounded-md px-2 py-1"
                        onChange={(e) => moveLead(col, e.target.value, lead.id)}
                        defaultValue={col}
                      >
                        {Object.keys(columns).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    {lead.note && (
                      <p className="text-sm text-muted-foreground">{lead.note}</p>
                    )}
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">Prioridade: {lead.priority}</Badge>
                    </div>
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
