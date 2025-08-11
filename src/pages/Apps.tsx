import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import ClientShell from "@/components/ClientShell";

const Apps = () => {
  const apps = ["Canva Pro", "Goot AI", "ChatGPT Plus", "Notion", "Figma"];
  return (
    <ClientShell title="Apps">
      <Helmet>
        <title>ToolShare - Apps</title>
        <meta name="description" content="Acesse todos os aplicativos disponíveis na sua assinatura." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/apps'} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {apps.map((tool) => (
            <Card key={tool} className="card-premium p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{tool}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Chrome className="mr-2 h-4 w-4" /> Abrir App
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </ClientShell>
  );
};

export default Apps;
