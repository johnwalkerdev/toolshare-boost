import { Helmet } from "react-helmet-async";
import ClientShell from "@/components/ClientShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { addTicket, TicketPriority } from "@/lib/tickets";

const Support = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Normal");
  const [lastId, setLastId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const s = subject.trim();
    const m = message.trim();
    if (!n || !em || !s || !m) {
      toast({ title: "Campos obrigatórios", description: "Preencha nome, e-mail, assunto e mensagem.", variant: "destructive" });
      return;
    }
    const t = addTicket({ name: n, email: em, subject: s, message: m, priority });
    setLastId(t.id);
    setName(""); setEmail(""); setSubject(""); setMessage(""); setPriority("Normal");
    toast({ title: "Ticket criado", description: `Seu protocolo é ${t.id}.` });
  };

  return (
    <ClientShell title="Suporte e Tickets">
      <Helmet>
        <title>ToolShare - Suporte e Tickets</title>
        <meta name="description" content="Abra tickets de suporte e acompanhe o atendimento." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/suporte'} />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Suporte</h1>
        <p className="text-muted-foreground mb-6">Abra um ticket ou fale conosco no WhatsApp.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-premium p-6 lg:col-span-2">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm">Nome</label>
                <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Seu nome" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm">E-mail</label>
                <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="voce@exemplo.com" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="subject" className="text-sm">Assunto</label>
                <Input id="subject" value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Ex.: Problema com login" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="text-sm">Mensagem</label>
                <Textarea id="message" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Descreva seu problema com detalhes" />
              </div>
              <div>
                <label className="text-sm">Prioridade</label>
                <Select value={priority} onValueChange={(v)=>setPriority(v as TicketPriority)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Baixa</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="High">Alta</SelectItem>
                    <SelectItem value="Urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit">Enviar ticket</Button>
              </div>
              {lastId && (
                <div className="md:col-span-2 text-sm text-muted-foreground">Protocolo: <span className="font-semibold text-foreground">{lastId}</span></div>
              )}
            </form>
          </Card>

          <Card className="card-premium p-6">
            <h3 className="font-semibold mb-2">Atendimento via WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-4">Para casos urgentes, fale conosco diretamente.</p>
            <a className="btn-premium inline-block text-center" href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              Abrir WhatsApp
            </a>
          </Card>
        </div>
      </section>
    </ClientShell>
  );
};

export default Support;
