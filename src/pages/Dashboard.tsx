import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Chrome, Shield, Zap } from "lucide-react";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ToolShare - Painel do Usuário</title>
        <meta name="description" content="Gerencie suas ferramentas, perfis de navegador e assinatura no ToolShare." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/dashboard'} />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Meu painel</h1>
        <p className="text-muted-foreground mb-8">Acompanhe sua assinatura, ferramentas e perfis.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-premium p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Minhas Ferramentas</h2>
              <Button variant="outline" size="sm">Ver todas</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Canva Pro", "Goot AI", "ChatGPT Plus"].map((tool) => (
                <div key={tool} className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{tool}</span>
                    <Badge className="bg-primary/20 text-primary">Ativo</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Chrome className="mr-2 h-4 w-4" /> Abrir perfil
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-premium p-6">
            <h2 className="text-xl font-semibold mb-4">Assinatura</h2>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="font-medium">Plano: Team (trimestral)</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Próxima renovação em 28/10/2025</p>
            <div className="flex gap-2">
              <Button variant="premium" className="flex-1"><Shield className="mr-2 h-4 w-4" /> Gerenciar</Button>
              <Button variant="outline" className="flex-1"><Zap className="mr-2 h-4 w-4" /> Upgrade</Button>
            </div>
          </Card>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Perfis de Navegador</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Design - BR", "Marketing - US", "IA - EU"].map((profile) => (
              <Card key={profile} className="card-premium p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{profile}</span>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">IP Fixo</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Última sessão: 2 min atrás</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Abrir Chrome</Button>
                  <Button variant="outline" size="sm" className="flex-1">Editar</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;