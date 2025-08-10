import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ToolsSection } from "@/components/ToolsSection";
import { PricingPlans } from "@/components/PricingPlans";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ToolsSection />
      <HowItWorks />
      <PricingPlans />
      <Footer />
    </div>
  );
};

export default Index;
