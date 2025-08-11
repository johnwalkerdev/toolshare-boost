import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Users, Settings2, Package, Globe, Plus, Wrench, Megaphone, DollarSign, TrendingDown } from "lucide-react";
import AdminShell from "@/components/AdminShell";

const Admin = () => {
  const [clienteFiltro, setClienteFiltro] = useState<'all'|'paying'|'canceled'|'trial'>('all');
  const [categoria, setCategoria] = useState<string>('');
  return (
    <AdminShell title="Admin">
      <Helmet>
        <title>ToolShare - Admin</title>
        <meta name="description" content="Manage users, plans, tools, proxies and integrations on ToolShare." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/admin'} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Administration</h1>
        <p className="text-muted-foreground mb-8">Control panel and advanced settings.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Users</p>
                <h3 className="text-2xl font-bold">1.284</h3>
              </div>
              <Users className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <h3 className="text-2xl font-bold">842</h3>
              </div>
              <Package className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tools</p>
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
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">MRR</p>
                <h3 className="text-2xl font-bold">R$ 42.300</h3>
              </div>
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Churn (30d)</p>
                <h3 className="text-2xl font-bold">2.1%</h3>
              </div>
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
          </Card>
        </div>

        {/* Create Tool */}
        <Card className="card-premium p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Create tool</h2>
            <Badge className="bg-primary/20 text-primary">New</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Name</Label>
              <Input id="nome" placeholder="e.g. Canva Pro" />
            </div>
            <div>
              <Label htmlFor="categoria">Category</Label>
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
              <Label htmlFor="descricao">Description</Label>
              <Textarea id="descricao" placeholder="Short description for the tool" />
            </div>
            <div>
              <Label htmlFor="imagem">Image (URL)</Label>
              <Input id="imagem" placeholder="https://.../logo.png" />
            </div>
            <div>
              <Label htmlFor="proxy">Proxy</Label>
              <Input id="proxy" placeholder="proxy://region/proxy-id" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="premium"><Plus className="mr-2 h-4 w-4" /> Create</Button>
          </div>
        </Card>

        {/* Customers - filters & metrics */}
        <Card className="card-premium p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Customers</h2>
            <div className="flex gap-2">
              {(['all','paying','canceled','trial'] as const).map((f) => (
                <Button key={f} variant={clienteFiltro===f? 'premium':'outline'} size="sm" onClick={() => setClienteFiltro(f)}>
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="p-4"><p className="text-sm text-muted-foreground">Sales today</p><h3 className="text-2xl font-bold">27</h3></Card>
            <Card className="p-4"><p className="text-sm text-muted-foreground">Churn (30d)</p><h3 className="text-2xl font-bold">2.1%</h3></Card>
            <Card className="p-4"><p className="text-sm text-muted-foreground">MRR</p><h3 className="text-2xl font-bold">R$ 42.300</h3></Card>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-3">Name</th>
                  <th>Status</th>
                  <th>Plan</th>
                  <th>Email</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: 'Ana Santos', plano: 'Quarterly', status: 'Paying', email: 'ana@exemplo.com' },
                  { nome: 'João Lima', plano: 'Monthly', status: 'Canceled', email: 'joao@exemplo.com' },
                  { nome: 'Corp XYZ', plano: 'Semiannual', status: 'Paying', email: 'it@xyz.com' },
                ].filter(u => clienteFiltro==='all' || u.status.toLowerCase()===clienteFiltro).map((u) => (
                  <tr key={u.email} className="border-b border-border/50">
                    <td className="py-3">{u.nome}</td>
                    <td>
                      <Badge className={u.status === 'Paying' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}>{u.status}</Badge>
                    </td>
                    <td>{u.plano}</td>
                    <td className="truncate max-w-[160px]">{u.email}</td>
                    <td className="text-right">
                      <Button variant="outline" size="sm">Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Announcements */}
        <Card className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Announcements (broadcast)</h2>
            <Megaphone className="h-5 w-5 text-primary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="tituloAviso">Title</Label>
              <Input id="tituloAviso" placeholder="e.g. Scheduled maintenance" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="mensagemAviso">Message</Label>
              <Textarea id="mensagemAviso" placeholder="Announcement details for all users" rows={3} />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">Publish</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">To broadcast to all users and push notifications, connect Supabase via Lovable's native integration.</p>
        </Card>
      </section>
    </AdminShell>
  );
};

export default Admin;