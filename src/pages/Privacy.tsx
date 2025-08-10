import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ToolShare - Política de Privacidade</title>
        <meta name="description" content="Saiba como a ToolShare coleta, usa e protege seus dados pessoais." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/privacidade'} />
      </Helmet>

      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-6">Última atualização: 10/08/2025</p>
        <div className="space-y-6 text-base leading-relaxed">
          <p>
            Valorizamos sua privacidade. Esta política explica quais dados coletamos, como utilizamos
            e com quem compartilhamos. Utilizamos cookies para melhorar sua experiência e
            cumprir requisitos de segurança.
          </p>
          <h2 className="text-xl font-semibold">Dados coletados</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Informações de conta (nome, e-mail)</li>
            <li>Dados de uso (acessos, sessões, IP efetivo)</li>
            <li>Informações de pagamento processadas por terceiros (Monetizze)</li>
          </ul>
          <h2 className="text-xl font-semibold">Seus direitos</h2>
          <p>Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento.</p>
          <h2 className="text-xl font-semibold">Contato</h2>
          <p>Para dúvidas sobre privacidade, entre em contato via WhatsApp na página de Contato.</p>
        </div>
      </section>
    </main>
  );
};

export default Privacy;