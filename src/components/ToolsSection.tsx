import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Zap, 
  BarChart3, 
  Mail, 
  FileText, 
  Camera,
  ExternalLink,
  Users,
  Star
} from "lucide-react";

export const ToolsSection = () => {
  const categories = [
    {
      name: "Design",
      icon: Palette,
      color: "text-blue-400",
      tools: [
        { name: "Canva Pro", users: "2.4k", rating: 4.9, featured: true },
        { name: "Figma Team", users: "1.8k", rating: 4.8, featured: false },
        { name: "Adobe Creative", users: "1.2k", rating: 4.7, featured: false }
      ]
    },
    {
      name: "IA & Automação",
      icon: Zap,
      color: "text-primary",
      tools: [
        { name: "Goot AI", users: "3.1k", rating: 4.9, featured: true },
        { name: "ChatGPT Plus", users: "4.2k", rating: 4.8, featured: true },
        { name: "Midjourney", users: "2.7k", rating: 4.9, featured: false }
      ]
    },
    {
      name: "Marketing",
      icon: BarChart3,
      color: "text-orange-400",
      tools: [
        { name: "SEMrush", users: "1.5k", rating: 4.6, featured: false },
        { name: "Ahrefs", users: "1.3k", rating: 4.7, featured: false },
        { name: "Hotjar", users: "0.9k", rating: 4.5, featured: false }
      ]
    },
    {
      name: "Produtividade",
      icon: FileText,
      color: "text-purple-400",
      tools: [
        { name: "Notion Pro", users: "2.1k", rating: 4.8, featured: false },
        { name: "Slack Pro", users: "1.7k", rating: 4.6, featured: false },
        { name: "Zoom Pro", users: "2.3k", rating: 4.7, featured: false }
      ]
    }
  ];

  return (
    <section id="ferramentas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 border-primary/20 bg-primary/10 text-primary">
            Ferramentas disponíveis
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mais de 20 ferramentas premium
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acesse as melhores ferramentas do mercado por uma fração do preço
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {categories.map((category) => (
            <Card key={category.name} className="card-premium p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>

              <div className="space-y-3">
                {category.tools.map((tool) => (
                  <div key={tool.name} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{tool.name}</span>
                        {tool.featured && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary text-xs px-1 py-0">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {tool.users}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          {tool.rating}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Acesso direto - sem AdsPower */}
        <Card className="card-premium p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 border-primary/20 bg-primary/10 text-primary">
                Experiência simplificada
              </Badge>
              <h3 className="text-2xl font-bold mb-4">
                Acesso direto, sem AdsPower
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Tudo funciona diretamente na nossa plataforma. Sem extensões, sem complexidade: clique, acesse e produza.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">Acesso sem AdsPower — tudo diretamente na nossa ferramenta</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">20 ferramentas premium com abertura instantânea</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">CRM incluso para organizar clientes e projetos</span>
                </li>
              </ul>
              <Button variant="premium">
                <ExternalLink className="mr-2 h-4 w-4" /> Ver apps
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <span className="text-[10px] text-muted-foreground">FERRAMENTAS</span>
                <div className="font-medium">Canva Pro</div>
                <div className="text-xs text-muted-foreground">Design gráfico</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <span className="text-[10px] text-muted-foreground">IA TEXTO</span>
                <div className="font-medium">ChatGPT Plus</div>
                <div className="text-xs text-muted-foreground">Geração de conteúdo</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <span className="text-[10px] text-muted-foreground">BANCOS VISUAIS</span>
                <div className="font-medium">Envato Elements</div>
                <div className="text-xs text-muted-foreground">Assets ilimitados</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <span className="text-[10px] text-muted-foreground">VÍDEO</span>
                <div className="font-medium">CapCut Pro</div>
                <div className="text-xs text-muted-foreground">Edição avançada</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};