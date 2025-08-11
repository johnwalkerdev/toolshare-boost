import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Chrome, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-card py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 border-primary/20 bg-primary/10 text-primary">
            <Zap className="mr-2 h-3 w-3" />
            Economia até 90%
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Acesse ferramentas{" "}
            <span className="text-gradient">premium</span>{" "}
            pagando muito menos
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Seu portfólio de ferramentas em um só lugar. Organize, acesse e gere resultados com o nosso CRM bônus incluso.
          </p>

          {/* Features bullets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="h-2 w-2 bg-primary rounded-full" />
              <span>💰 Economia real: até 90% mais barato</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="h-2 w-2 bg-primary rounded-full" />
              <span>🧩 Todos os apps em um só lugar</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="h-2 w-2 bg-primary rounded-full" />
              <span>📈 CRM bônus para gerenciar clientes</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="h-2 w-2 bg-primary rounded-full" />
              <span>🔒 Acesso simples e seguro</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="premium" size="lg" className="text-lg px-8 py-4">
              <Shield className="mr-2 h-5 w-5" />
              Quero acessar agora
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Chrome className="mr-2 h-5 w-5" />
              Ver demonstração
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 p-6 rounded-xl bg-card/50 border border-border max-w-2xl mx-auto">
            <p className="text-muted-foreground italic mb-2">
              "Em minutos, minha equipe tinha Canva Pro e Goot rodando no mesmo IP. 
              Custou uma fração do preço."
            </p>
            <p className="text-sm font-semibold text-primary">— Ana S., Marketing Digital</p>
          </div>
        </div>
      </div>
    </section>
  );
};