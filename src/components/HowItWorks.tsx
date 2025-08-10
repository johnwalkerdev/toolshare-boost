import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Key, Monitor } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Escolha o plano",
      description: "Selecione entre mensal, trimestral ou semestral com descontos progressivos",
      icon: CreditCard,
      color: "text-primary"
    },
    {
      number: "2", 
      title: "Pague pela Monetizze",
      description: "Checkout seguro e acesso imediato após confirmação do pagamento",
      icon: Key,
      color: "text-accent"
    },
    {
      number: "3",
      title: "Abra o Chrome dedicado",
      description: "Use as ferramentas com IP fixo e perfis isolados como no AdsPower",
      icon: Monitor,
      color: "text-primary"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 border-primary/20 bg-primary/10 text-primary">
            Processo simples
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como funciona
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em 3 passos simples você já está usando suas ferramentas favoritas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="card-premium text-center p-8 h-full">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-6">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <step.icon className={`h-12 w-12 mx-auto ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                  <div className="w-2 h-2 bg-accent rounded-full absolute -right-1 -top-0.75"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};