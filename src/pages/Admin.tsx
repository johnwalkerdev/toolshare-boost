import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Settings2, Package, Globe, Plus, Wrench } from "lucide-react";

const Admin = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ToolShare - Admin</title>
        <meta name="description" content="Gerencie usuários, planos, ferramentas, proxies e integrações no ToolShare." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/admin'} />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Administração</h1>
        <p className="text-muted-foreground mb-8">Painel de controle e configurações avançadas.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usuários</p>
                <h3 className="text-2xl font-bold">1.284</h3>
              </div>
              <Users className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Planos Ativos</p>
                <h3 className="text-2xl font-bold">842</h3>
              </div>
              <Package className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ferramentas</p>
                <h3 className="text-2xl font-bold">57</h3>
              </div>
              <Wrench className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Proxies OK</p>
                <h3 className="text-2xl font-bold">96%</h3>
              </div>
              <Globe className="h-6 w-6 text-primary" />
            </div>
          </Card>
        </div>

        <Card className="card-premium p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Usuários</h2>
            <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Novo</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-3">Nome</th>
                  <th>Plano</th>
                  <th>Status</th>
                  <th>Email</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: 'Ana Santos', plano: 'Team', status: 'Ativo', email: 'ana@exemplo.com' },
                  { nome: 'João Lima', plano: 'Starter', status: 'Ativo', email: 'joao@exemplo.com' },
                  { nome: 'Corp XYZ', plano: 'Business', status: 'Pendente', email: 'it@xyz.com' },
                ].map((u) => (
                  <tr key={u.email} className="border-b border-border/50">
                    <td className="py-3">{u.nome}</td>
                    <td>{u.plano}</td>
                    <td>
                      <Badge className={u.status === 'Ativo' ? 'bg-primary/20 text-primary' : ''}>{u.status}</Badge>
                    </td>
                    <td className="truncate max-w-[160px]">{u.email}</td>
                    <td className="text-right">
                      <Button variant="outline" size="sm">Gerenciar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Configurações</h2>
            <Button variant="premium" size="sm"><Settings2 className="mr-2 h-4 w-4" /> Abrir</Button>
          </div>
          <p className="text-sm text-muted-foreground">Gerencie planos, ferramentas, proxies e integrações (Monetizze).</p>
        </Card>
      </section>
    </main>
  );
};

export default Admin;