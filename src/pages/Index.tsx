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
        <title>ToolShare - Ferramentas Premium em um só lugar</title>
        <meta name="description" content="Seu portfólio de 20 ferramentas premium em um só lugar. Economia até 90% e CRM incluso." />
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
