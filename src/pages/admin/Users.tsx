import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users as UsersIcon, Search } from "lucide-react";

const AdminUsers = () => {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<'all'|'paying'|'canceled'|'trial'>('all');
  const [plan, setPlan] = useState<'all'|'Monthly'|'Quarterly'|'Semiannual'|'Annual'>('all');

  const rawUsers = [
    { name: "Ana Santos", email: "ana@exemplo.com", plan: "Quarterly" as const, status: "Paying" as const },
    { name: "João Lima", email: "joao@exemplo.com", plan: "Monthly" as const, status: "Canceled" as const },
    { name: "Corp XYZ", email: "it@xyz.com", plan: "Semiannual" as const, status: "Paying" as const },
    { name: "Maria Teste", email: "maria@teste.com", plan: "Monthly" as const, status: "Trial" as const },
  ];

  const totals = useMemo(() => {
    const paying = rawUsers.filter(u => u.status === 'Paying').length;
    const trial = rawUsers.filter(u => u.status === 'Trial').length;
    const canceled = rawUsers.filter(u => u.status === 'Canceled').length;
    return { total: rawUsers.length, paying, trial, canceled };
  }, [rawUsers]);

  const users = useMemo(() => {
    return rawUsers
      .filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))
      .filter(u => status === 'all' ? true : u.status.toLowerCase() === status)
      .filter(u => plan === 'all' ? true : u.plan === plan);
  }, [rawUsers, q, status, plan]);

  return (
    <AdminShell title="Admin - Users">
      <Helmet>
        <title>Admin Users | ToolShare</title>
        <meta name="description" content="Manage ToolShare users: search, filter and perform actions." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/users"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <UsersIcon className="h-7 w-7 text-primary" /> Users
          </h1>
          <p className="text-muted-foreground">Search and manage your user base.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4"><p className="text-sm text-muted-foreground">Total users</p><h3 className="text-2xl font-bold">{totals.total}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Paying</p><h3 className="text-2xl font-bold">{totals.paying}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Trials</p><h3 className="text-2xl font-bold">{totals.trial}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Canceled</p><h3 className="text-2xl font-bold">{totals.canceled}</h3></Card>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name or email" className="pl-9" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={status} onValueChange={(v: typeof status) => setStatus(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="paying">Paying</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={plan} onValueChange={(v: typeof plan) => setPlan(v)}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All plans</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Semiannual">Semiannual</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button size="sm">Invite</Button>
            </div>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell className="truncate max-w-[220px]">{u.email}</TableCell>
                  <TableCell>{u.plan}</TableCell>
                  <TableCell>
                    <Badge className={u.status === 'Paying' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Manage</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </AdminShell>
  );
};

export default AdminUsers;
