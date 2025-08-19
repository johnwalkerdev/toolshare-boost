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
import { useToast } from "@/hooks/use-toast";
import { LifeBuoy, Loader2 } from "lucide-react";
import { getTickets as getSupabaseTickets, updateTicket, addTicketNote, Ticket } from "@/lib/supabase-admin";

type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

const AdminTickets = () => {
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | TicketStatus>("all");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await getSupabaseTickets();
      setTickets(data);
    } catch (error) {
      console.error('Error loading tickets:', error);
      toast({
        title: "Error loading tickets",
        description: "Failed to load support tickets",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTickets(); }, []);

  const stats = useMemo(() => {
    const all = tickets.length;
    const open = tickets.filter(t=>t.status==='Open').length;
    const progress = tickets.filter(t=>t.status==='In Progress').length;
    const solved = tickets.filter(t=>t.status==='Resolved').length;
    return { all, open, progress, solved };
  }, [tickets]);

  const list = useMemo(() => {
    return tickets
      .filter(t => 
        t.subject.toLowerCase().includes(q.toLowerCase()) || 
        t.customer_email.toLowerCase().includes(q.toLowerCase()) || 
        t.ticket_number.toLowerCase().includes(q.toLowerCase())
      )
      .filter(t => status === 'all' ? true : t.status === status);
  }, [tickets, q, status]);

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
            <Button variant="outline" onClick={loadTickets}>Atualizar</Button>
          </div>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket #</TableHead>
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
                    <TableCell className="font-mono text-xs">{t.ticket_number}</TableCell>
                    <TableCell>{t.subject}</TableCell>
                    <TableCell>
                      <div className="font-medium">{t.customer_name}</div>
                      <div className="text-xs text-muted-foreground">{t.customer_email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={t.priority==='Urgent'?'bg-destructive/20 text-destructive': t.priority==='High'?'bg-primary/20 text-primary':'bg-muted/60 text-foreground'}>{t.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={t.status==='Open'?'bg-primary/20 text-primary': t.status==='In Progress'?'bg-accent/20 text-foreground': 'bg-muted/60 text-foreground'}>{t.status}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{new Date(t.updated_at).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">Detalhes</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Ticket {t.ticket_number}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 text-sm">
                            <div><span className="text-muted-foreground">Assunto:</span> {t.subject}</div>
                            <div><span className="text-muted-foreground">Cliente:</span> {t.customer_name} ({t.customer_email})</div>
                            <div><span className="text-muted-foreground">Mensagem:</span> {t.message}</div>
                            {t.notes && t.notes.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-muted-foreground">Histórico:</span>
                                <div className="max-h-32 overflow-y-auto space-y-1">
                                  {t.notes.map((note: any, i: number) => (
                                    <div key={i} className="text-xs p-2 bg-muted rounded">
                                      <div className="font-medium">{note.author} - {new Date(note.at).toLocaleString()}</div>
                                      <div>{note.message}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="space-y-2">
                              <span className="text-muted-foreground">Adicionar nota</span>
                              <Textarea id={`note-${t.id}`} placeholder="Resposta ou nota interna" />
                              <div className="flex gap-2">
                                <Select defaultValue={t.status} onValueChange={async (v: TicketStatus)=>{
                                  try {
                                    await updateTicket(t.id, { status: v });
                                    loadTickets();
                                    toast({ title: "Status atualizado", description: "Status do ticket foi alterado." });
                                  } catch (error) {
                                    console.error('Error updating ticket:', error);
                                    toast({ title: "Erro", description: "Falha ao atualizar status", variant: "destructive" });
                                  }
                                }}>
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
                                <Button onClick={async ()=>{
                                  const el = document.getElementById(`note-${t.id}`) as HTMLTextAreaElement | null;
                                  const msg = el?.value?.trim() || "";
                                  if(!msg) return;
                                  
                                  try {
                                    await addTicketNote(t.id, { author: "admin:Agent", message: msg });
                                    el!.value = "";
                                    toast({ title: "Nota adicionada", description: "A nota foi salva com sucesso." });
                                    loadTickets();
                                  } catch (error) {
                                    console.error('Error adding note:', error);
                                    toast({ title: "Erro", description: "Falha ao adicionar nota", variant: "destructive" });
                                  }
                                }}>Salvar</Button>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={loadTickets}>Fechar</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>
    </AdminShell>
  );
};

export default AdminTickets;
