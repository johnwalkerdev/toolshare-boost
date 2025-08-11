import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Zap } from "lucide-react";
import ClientShell from "@/components/ClientShell";

const Assinatura = () => {
  return (
    <ClientShell title="Assinatura">
      <Helmet>
        <title>ToolShare - Assinatura</title>
        <meta name="description" content="Gerencie sua assinatura do ToolShare." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/assinatura'} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <Card className="card-premium p-6 max-w-xl">
          <h2 className="text-xl font-semibold mb-4">Status da Assinatura</h2>
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
      </section>
    </ClientShell>
  );
};

export default Assinatura;
