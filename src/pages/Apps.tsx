import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Chrome, ExternalLink } from "lucide-react";
import ClientShell from "@/components/ClientShell";

const Apps = () => {
  const apps = [
    { name: "Canva Pro", category: "FERRAMENTAS", description: "Versão premium do Canva com recursos gráficos e modelos.", logo: "" },
    { name: "CapCut Pro", category: "VÍDEO", description: "Editor de vídeo com recursos avançados e efeitos criativos.", logo: "" },
    { name: "ChatGPT Plus", category: "IA TEXTO", description: "Geração de textos e assistente conversacional.", logo: "" },
    { name: "Envato Elements", category: "BANCOS VISUAIS", description: "Biblioteca de imagens, vídeos e fontes.", logo: "" },
    { name: "Figma Team", category: "DESIGN", description: "Colaboração em design e prototipagem.", logo: "" },
    { name: "Notion Pro", category: "PRODUTIVIDADE", description: "Organização, docs e tarefas em um só lugar.", logo: "" },
    { name: "Goot AI", category: "IA TEXTO", description: "Automação e conteúdo com IA.", logo: "" },
    { name: "SEMrush", category: "MARKETING", description: "SEO, PPC e análise de concorrentes.", logo: "" },
    { name: "Ahrefs", category: "MARKETING", description: "Pesquisa de palavras-chave e backlinks.", logo: "" },
    { name: "Slack Pro", category: "PRODUTIVIDADE", description: "Comunicação em equipe com integrações.", logo: "" },
    { name: "Zoom Pro", category: "PRODUTIVIDADE", description: "Reuniões com recursos premium.", logo: "" },
    { name: "Midjourney", category: "IA IMAGENS", description: "Geração de imagens com IA.", logo: "" },
  ];
  return (
    <ClientShell title="Apps">
      <Helmet>
        <title>ToolShare - Apps</title>
        <meta name="description" content="Seu portfólio com 20 ferramentas premium em um só lugar. Acesso direto, sem AdsPower." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/apps'} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {apps.map((tool) => (
            <Card key={tool.name} className="card-premium p-4">
              <div className="mb-3 text-[10px] uppercase tracking-wide text-muted-foreground">{tool.category}</div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium">{tool.name}</div>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
                <Badge className="bg-primary/20 text-primary">Ativo</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Chrome className="mr-2 h-4 w-4" /> Abrir App
                </Button>
                <Button variant="ghost" size="icon" aria-label="Detalhes">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </ClientShell>
  );
};

export default Apps;
