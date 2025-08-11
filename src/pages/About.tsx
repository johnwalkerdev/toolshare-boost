import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ToolShare - Sobre</title>
        <meta name="description" content="Conheça a ToolShare, a plataforma de ferramentas premium em um só lugar." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/sobre'} />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre a ToolShare</h1>
        <p className="text-muted-foreground max-w-3xl">
          A plataforma de ferramentas premium mais confiável do Brasil. Reunimos as principais ferramentas do mercado em um só lugar, com excelente custo-benefício e foco em experiência.
        </p>
      </section>
    </main>
  );
};

export default About;
