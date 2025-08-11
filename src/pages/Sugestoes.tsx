import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ClientShell from "@/components/ClientShell";

interface Suggestion {
  id: string;
  title: string;
  detail?: string;
  votes: number;
  status: 'new' | 'planned' | 'in-progress' | 'done';
}

const Sugestoes = () => {
  const [items, setItems] = useState<Suggestion[]>([
    { id: '1', title: 'Integração com Canva', detail: 'Acesso rápido e single sign-on', votes: 42, status: 'planned' },
    { id: '2', title: 'Mais ferramentas de IA', detail: 'Modelos de geração de imagem', votes: 35, status: 'in-progress' },
    { id: '3', title: 'App mobile', detail: 'Acesso via iOS e Android', votes: 18, status: 'new' },
  ]);

  const upvote = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i));
  };

  return (
    <ClientShell title="Sugestões">
      <Helmet>
        <title>ToolShare - Sugestões e Votação</title>
        <meta name="description" content="Sugira ideias e vote nas próximas melhorias do ToolShare." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/sugestoes'} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4">
          {items.map(item => (
            <Card key={item.id} className="card-premium p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  {item.detail && <p className="text-muted-foreground text-sm">{item.detail}</p>}
                </div>
                <div className="text-center">
                  <Button variant="outline" size="sm" onClick={() => upvote(item.id)} className="mb-1 hover-scale">
                    +1 Votar
                  </Button>
                  <div className="text-xs text-muted-foreground">{item.votes} votos</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Para votos reais e submissões, conecte o Supabase na integração nativa do Lovable.</p>
      </section>
    </ClientShell>
  );
};

export default Sugestoes;
