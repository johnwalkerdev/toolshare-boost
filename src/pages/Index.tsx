import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ToolsSection } from "@/components/ToolsSection";
import { PricingPlans } from "@/components/PricingPlans";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ToolShare - Group Buy de Ferramentas Premium</title>
        <meta name="description" content="Acesse ferramentas premium pagando muito menos. Group buy com IP fixo e navegador dedicado por perfil. Planos mensal, trimestral e semestral via Monetizze." />
        <link rel="canonical" href={(typeof window !== 'undefined' ? window.location.origin : '') + '/'} />
      </Helmet>
      <Header />
      <Hero />
      <ToolsSection />
      <HowItWorks />
      <PricingPlans />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
