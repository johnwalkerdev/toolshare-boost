import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { LifeBuoy } from "lucide-react";
import { Ticket, TicketStatus, getTickets, updateTicketStatus, addTicketNote } from "@/lib/tickets";

const AdminTickets = () => {
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | TicketStatus>("all");
  const [rows, setRows] = useState<Ticket[]>([]);

  const refresh = () => setRows(getTickets());
  useEffect(() => { refresh(); }, []);

  const stats = useMemo(() => {
    const all = rows.length;
    const open = rows.filter(t=>t.status==='Open').length;
    const progress = rows.filter(t=>t.status==='In Progress').length;
    const solved = rows.filter(t=>t.status==='Resolved').length;
    return { all, open, progress, solved };
  }, [rows]);

  const list = useMemo(() => {
    return rows
      .filter(t => t.subject.toLowerCase().includes(q.toLowerCase()) || t.email.toLowerCase().includes(q.toLowerCase()) || t.id.toLowerCase().includes(q.toLowerCase()))
      .filter(t => status === 'all' ? true : t.status === status);
  }, [rows, q, status]);

  return (
    <AdminShell title="Admin - Tickets">
      <Helmet>
        <title>Admin Tickets | ToolShare</title>
        <meta name="description" content="Acompanhe e gerencie tickets de suporte." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/tickets"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <LifeBuoy className="h-7 w-7 text-primary" /> Tickets
          </h1>
          <p className="text-muted-foreground">Central de suporte (mock).</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="card-premium p-4"><p className="text-sm text-muted-foreground">Total</p><h3 className="text-2xl font-bold">{stats.all}</h3></Card>
          <Card className="card-premium p-4"><p className="text-sm text-muted-foreground">Abertos</p><h3 className="text-2xl font-bold">{stats.open}</h3></Card>
          <Card className="card-premium p-4"><p className="text-sm text-muted-foreground">Em Progresso</p><h3 className="text-2xl font-bold">{stats.progress}</h3></Card>
          <Card className="card-premium p-4"><p className="text-sm text-muted-foreground">Resolvidos</p><h3 className="text-2xl font-bold">{stats.solved}</h3></Card>
        </div>

        <Card className="p-4 mb-6 flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por ID, e-mail ou assunto" />
          </div>
          <div className="flex gap-2">
            <Select value={status} onValueChange={(v)=>setStatus(v as any)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={refresh}>Atualizar</Button>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Atualizado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((t)=> (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>{t.subject}</TableCell>
                  <TableCell>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={t.priority==='Urgent'?'bg-destructive/20 text-destructive': t.priority==='High'?'bg-primary/20 text-primary':'bg-muted/60 text-foreground'}>{t.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={t.status==='Open'?'bg-primary/20 text-primary': t.status==='In Progress'?'bg-accent/20 text-foreground': 'bg-muted/60 text-foreground'}>{t.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs">{new Date(t.updatedAt).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">Detalhes</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ticket {t.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 text-sm">
                          <div><span className="text-muted-foreground">Assunto:</span> {t.subject}</div>
                          <div><span className="text-muted-foreground">Cliente:</span> {t.name} ({t.email})</div>
                          <div><span className="text-muted-foreground">Mensagem:</span> {t.message}</div>
                          <div className="space-y-2">
                            <span className="text-muted-foreground">Adicionar nota</span>
                            <Textarea id={`note-${t.id}`} placeholder="Resposta interna (mock)" />
                            <div className="flex gap-2">
                              <Select defaultValue={t.status} onValueChange={(v)=>updateTicketStatus(t.id, v as TicketStatus)}>
                                <SelectTrigger className="w-44">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Open">Open</SelectItem>
                                  <SelectItem value="In Progress">In Progress</SelectItem>
                                  <SelectItem value="Resolved">Resolved</SelectItem>
                                  <SelectItem value="Closed">Closed</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button onClick={()=>{
                                const el = document.getElementById(`note-${t.id}`) as HTMLTextAreaElement | null;
                                const msg = el?.value?.trim() || "";
                                if(!msg) return;
                                addTicketNote(t.id, { at: new Date().toISOString(), author: "admin:Agent", message: msg });
                                el!.value = "";
                                toast({ title: "Nota adicionada", description: "A alteração foi salva (mock)." });
                                refresh();
                              }}>Salvar</Button>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={()=>{ refresh(); }}>Fechar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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

export default AdminTickets;
