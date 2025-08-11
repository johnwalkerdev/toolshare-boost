import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, ExternalLink, Palette, Bot, Megaphone, CheckSquare } from "lucide-react";
import ClientShell from "@/components/ClientShell";

const Apps = () => {
  const categories = [
    { key: 'design', label: 'Design' },
    { key: 'ia', label: 'IA & Automação' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'produtividade', label: 'Produtividade' },
  ] as const;

  const categoryMeta = {
    design: { icon: Palette, label: 'Design' },
    ia: { icon: Bot, label: 'IA & Automação' },
    marketing: { icon: Megaphone, label: 'Marketing' },
    produtividade: { icon: CheckSquare, label: 'Produtividade' }
  } as const;

  const apps = [
    { name: "Canva Pro", category: "design", description: "Versão premium do Canva com recursos gráficos e modelos.", logo: "" },
    { name: "CapCut Pro", category: "design", description: "Editor de vídeo com recursos avançados e efeitos criativos.", logo: "" },
    { name: "ChatGPT Plus", category: "ia", description: "Geração de textos e assistente conversacional.", logo: "" },
    { name: "Envato Elements", category: "design", description: "Biblioteca de imagens, vídeos e fontes.", logo: "" },
    { name: "Figma Team", category: "design", description: "Colaboração em design e prototipagem.", logo: "" },
    { name: "Notion Pro", category: "produtividade", description: "Organização, docs e tarefas em um só lugar.", logo: "" },
    { name: "Goot AI", category: "ia", description: "Automação e conteúdo com IA.", logo: "" },
    { name: "SEMrush", category: "marketing", description: "SEO, PPC e análise de concorrentes.", logo: "" },
    { name: "Ahrefs", category: "marketing", description: "Pesquisa de palavras-chave e backlinks.", logo: "" },
    { name: "Slack Pro", category: "produtividade", description: "Comunicação em equipe com integrações.", logo: "" },
    { name: "Zoom Pro", category: "produtividade", description: "Reuniões com recursos premium.", logo: "" },
    { name: "Midjourney", category: "ia", description: "Geração de imagens com IA.", logo: "" },
  ];
  return (
    <ClientShell title="Apps">
      <Helmet>
        <title>ToolShare - Apps</title>
        <meta name="description" content="Seu portfólio com 20 ferramentas premium em um só lugar. Acesso direto, sem AdsPower." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/apps'} />
      </Helmet>

      <section className="container mx-auto px-4 py-6">
        {categories.map((cat) => {
          const list = apps.filter((a) => a.category === cat.key);
          if (!list.length) return null;
          return (
            <div key={cat.key} className="mb-8">
              <h2 id={`cat-${cat.key}`} className="flex items-center gap-2 text-sm font-semibold tracking-wider text-foreground uppercase mb-3">
                {(() => { const Icon = categoryMeta[cat.key].icon; return <Icon className="h-4 w-4 text-primary" />; })()}
                {categoryMeta[cat.key].label}
                <span className="ml-2 h-px bg-border flex-1" />
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {list.map((tool) => (
                  <Card key={tool.name} className="card-premium p-3">
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-medium text-sm">{tool.name}</div>
                      <Badge className="bg-primary/15 text-primary text-[10px]">Ativo</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 min-h-[32px]">{tool.description}</p>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="h-8 px-2 text-xs flex-1 justify-between">
                        <span className="flex items-center"><Globe className="mr-1 h-3 w-3" /> Abrir</span>
                        <ExternalLink className="h-3 w-3 opacity-80" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </ClientShell>
  );
};

export default Apps;
