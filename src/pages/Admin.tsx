import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Package, Globe, Wrench, DollarSign, TrendingDown, TrendingUp, Repeat, Activity, Percent } from "lucide-react";
import AdminShell from "@/components/AdminShell";

const Admin = () => {
  const [clienteFiltro, setClienteFiltro] = useState<'all'|'paying'|'canceled'|'trial'>('all');
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ARR</p>
                <h3 className="text-2xl font-bold">R$ 507.600</h3>
              </div>
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ARPU</p>
                <h3 className="text-2xl font-bold">R$ 50,25</h3>
              </div>
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">LTV</p>
                <h3 className="text-2xl font-bold">R$ 1.208</h3>
              </div>
              <Repeat className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">NRR</p>
                <h3 className="text-2xl font-bold">108%</h3>
              </div>
              <Percent className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Retenção (30d)</p>
                <h3 className="text-2xl font-bold">94%</h3>
              </div>
              <Repeat className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">DAU/MAU</p>
                <h3 className="text-2xl font-bold">22%</h3>
              </div>
              <Activity className="h-6 w-6 text-primary" />
            </div>
          </Card>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gross Sales (MTD)</p>
                <h3 className="text-2xl font-bold">R$ 120.450</h3>
              </div>
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Revenue (MTD)</p>
                <h3 className="text-2xl font-bold">R$ 112.980</h3>
              </div>
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Chargebacks (30d)</p>
                <h3 className="text-2xl font-bold">9</h3>
              </div>
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
          </Card>
          <Card className="card-premium p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Refunds (30d)</p>
                <h3 className="text-2xl font-bold">21</h3>
              </div>
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
          </Card>
        </div>

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

      </section>
    </AdminShell>
  );
};

export default Admin;