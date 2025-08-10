import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";

const DEFAULT_PHONE = "5599999999999"; // TODO: substituir pelo número oficial

const Contact = () => {
  const message = encodeURIComponent("Olá! Quero saber mais sobre o ToolShare.");
  const wa = `https://wa.me/${DEFAULT_PHONE}?text=${message}`;

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ToolShare - Contato</title>
        <meta name="description" content="Fale conosco pelo WhatsApp ou e-mail. Atendimento rápido e humano." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/contato'} />
      </Helmet>

      <section className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Fale conosco</h1>
        <p className="text-muted-foreground mb-8">Estamos aqui para ajudar. Escolha o canal preferido.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <div className="card-premium p-8 h-full flex flex-col items-center">
              <MessageCircle className="h-8 w-8 text-primary mb-3" />
              <h2 className="text-xl font-semibold mb-2">WhatsApp</h2>
              <p className="text-sm text-muted-foreground">Atendimento rápido via WhatsApp</p>
            </div>
          </a>
          <a href="mailto:contato@toolshare.app">
            <div className="card-premium p-8 h-full flex flex-col items-center">
              <Mail className="h-8 w-8 text-primary mb-3" />
              <h2 className="text-xl font-semibold mb-2">E‑mail</h2>
              <p className="text-sm text-muted-foreground">contato@toolshare.app</p>
            </div>
          </a>
        </div>

        <div className="mt-10 text-sm text-muted-foreground">
          Preferir falar agora? Clique no botão verde no canto inferior direito.
        </div>

        <div className="mt-8">
          <Button variant="outline" asChild>
            <a href="/">Voltar à página inicial</a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Contact;