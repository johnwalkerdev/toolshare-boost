import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Users, Settings2, Package, Globe, Plus, Wrench, Megaphone } from "lucide-react";

const Admin = () => {
  const [clienteFiltro, setClienteFiltro] = useState<'todos'|'pagantes'|'cancelados'|'trial'>('todos');
  const [categoria, setCategoria] = useState<string>('');
  return (
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

        {/* Cadastrar Ferramenta */}
        <Card className="card-premium p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Cadastrar ferramenta</h2>
            <Badge className="bg-primary/20 text-primary">Nova</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Ex.: Canva Pro" />
            </div>
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger id="categoria"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="ia">IA & Automação</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="produtividade">Produtividade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea id="descricao" placeholder="Breve descrição da ferramenta" />
            </div>
            <div>
              <Label htmlFor="imagem">Imagem (URL)</Label>
              <Input id="imagem" placeholder="https://.../logo.png" />
            </div>
            <div>
              <Label htmlFor="proxy">Proxy</Label>
              <Input id="proxy" placeholder="proxy://regiao/proxy-id" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="premium"><Plus className="mr-2 h-4 w-4" /> Cadastrar</Button>
          </div>
        </Card>

        {/* Clientes - filtros e métricas */}
        <Card className="card-premium p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Clientes</h2>
            <div className="flex gap-2">
              {(['todos','pagantes','cancelados','trial'] as const).map((f) => (
                <Button key={f} variant={clienteFiltro===f? 'premium':'outline'} size="sm" onClick={() => setClienteFiltro(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="p-4"><p className="text-sm text-muted-foreground">Vendas do dia</p><h3 className="text-2xl font-bold">27</h3></Card>
            <Card className="p-4"><p className="text-sm text-muted-foreground">Churn (30d)</p><h3 className="text-2xl font-bold">2.1%</h3></Card>
            <Card className="p-4"><p className="text-sm text-muted-foreground">MRR</p><h3 className="text-2xl font-bold">R$ 42.300</h3></Card>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-3">Nome</th>
                  <th>Status</th>
                  <th>Plano</th>
                  <th>Email</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: 'Ana Santos', plano: 'Trimestral', status: 'Pagante', email: 'ana@exemplo.com' },
                  { nome: 'João Lima', plano: 'Mensal', status: 'Cancelado', email: 'joao@exemplo.com' },
                  { nome: 'Corp XYZ', plano: 'Semestral', status: 'Pagante', email: 'it@xyz.com' },
                ].filter(u => clienteFiltro==='todos' || u.status.toLowerCase()===clienteFiltro).map((u) => (
                  <tr key={u.email} className="border-b border-border/50">
                    <td className="py-3">{u.nome}</td>
                    <td>
                      <Badge className={u.status === 'Pagante' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}>{u.status}</Badge>
                    </td>
                    <td>{u.plano}</td>
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

        {/* Avisos */}
        <Card className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Avisos (broadcast)</h2>
            <Megaphone className="h-5 w-5 text-primary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="tituloAviso">Título</Label>
              <Input id="tituloAviso" placeholder="Ex.: Manutenção programada" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="mensagemAviso">Mensagem</Label>
              <Textarea id="mensagemAviso" placeholder="Detalhes do aviso para todos os usuários" rows={3} />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">Publicar aviso</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Para enviar para todos os usuários e gerar notificações, conecte o Supabase na integração nativa do Lovable.</p>
        </Card>
      </section>
    </main>
  );
};

export default Admin;