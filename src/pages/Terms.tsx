import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ToolShare - Termos de Uso</title>
        <meta name="description" content="Leia os termos e condições para uso da plataforma ToolShare." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/termos'} />
      </Helmet>

      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Termos de Uso</h1>
        <p className="text-muted-foreground mb-6">Última atualização: 10/08/2025</p>
        <div className="space-y-6 text-base leading-relaxed">
          <h2 className="text-xl font-semibold">1. Aceitação</h2>
          <p>Ao usar a ToolShare, você concorda com estes termos.</p>
          <h2 className="text-xl font-semibold">2. Assinaturas</h2>
          <p>Assinaturas são processadas pela Monetizze. Cancelamentos e reembolsos seguem as políticas do ciclo contratado.</p>
          <h2 className="text-xl font-semibold">3. Uso adequado</h2>
          <p>É proibido compartilhar acessos não autorizados e burlar limites de sessões ou perfis.</p>
          <h2 className="text-xl font-semibold">4. Limitação de responsabilidade</h2>
          <p>Não nos responsabilizamos por indisponibilidades de serviços de terceiros.</p>
        </div>
      </section>
    </main>
  );
};

export default Terms;