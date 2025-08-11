import { Helmet } from "react-helmet-async";
import ClientShell from "@/components/ClientShell";

const Support = () => {
  return (
    <ClientShell title="Suporte">
      <Helmet>
        <title>ToolShare - Suporte</title>
        <meta name="description" content="Precisa de ajuda? Fale com nosso suporte pelo WhatsApp." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/suporte'} />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Suporte</h1>
        <p className="text-muted-foreground mb-6">Estamos prontos para te ajudar no WhatsApp.</p>
        <a
          className="text-primary underline"
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir conversa no WhatsApp
        </a>
      </section>
    </ClientShell>
  );
};

export default Support;
