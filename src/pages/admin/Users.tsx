import { Helmet } from "react-helmet-async";
import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users as UsersIcon, Search } from "lucide-react";

const AdminUsers = () => {
  const [q, setQ] = useState("");
  const users = [
    { name: "Ana Santos", email: "ana@exemplo.com", plan: "Quarterly", status: "Paying" },
    { name: "João Lima", email: "joao@exemplo.com", plan: "Monthly", status: "Canceled" },
    { name: "Corp XYZ", email: "it@xyz.com", plan: "Semiannual", status: "Paying" },
  ].filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));

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

        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name or email" className="pl-9" />
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
