import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Users, Building, Crown } from "lucide-react";

export const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'trimestral' | 'semestral'>('trimestral');

  const cycles = [
    { key: 'mensal' as const, label: 'Mensal', discount: 0 },
    { key: 'trimestral' as const, label: 'Trimestral', discount: 15 },
    { key: 'semestral' as const, label: 'Semestral', discount: 25 }
  ];

  const plans = [
    {
      name: 'Básico',
      icon: Zap,
      description: 'Perfeito para freelancers',
      price: { mensal: 37, trimestral: 95, semestral: 167 },
      originalPrice: { mensal: 37, trimestral: 111, semestral: 222 },
      features: [
        'Acesso a 20 ferramentas premium',
        'CRM básico incluso',
        'Suporte por email'
      ],
      popular: false,
      buttonText: 'Começar agora'
    },
    {
      name: 'Profissional',
      icon: Users,
      description: 'Ideal para pequenas equipes',
      price: { mensal: 97, trimestral: 247, semestral: 437 },
      originalPrice: { mensal: 97, trimestral: 291, semestral: 582 },
      features: [
        'Todas as ferramentas premium',
        'CRM avançado com automações',
        'Múltiplos usuários',
        'Suporte prioritário'
      ],
      popular: true,
      buttonText: 'Mais popular'
    },
    {
      name: 'Business',
      icon: Building,
      description: 'Para empresas em crescimento',
      price: { mensal: 199, trimestral: 537, semestral: 999 },
      originalPrice: { mensal: 199, trimestral: 597, semestral: 1194 },
      features: [
        'Ferramentas ilimitadas',
        'Failover de proxy',
        'Analytics avançado',
        'Suporte 24/7'
      ],
      popular: false,
      buttonText: 'Escalar agora'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      description: 'Solução corporativa completa',
      price: { mensal: 499, trimestral: 1347, semestral: 2499 },
      originalPrice: { mensal: 499, trimestral: 1497, semestral: 2994 },
      features: [
        'Todas as ferramentas',
        'Rotação de proxy',
        'Pools regionais',
        'Gerente dedicado'
      ],
      popular: false,
      buttonText: 'Contatar vendas'
    }
  ];

  const extras = [
    '20 Ferramentas Premium',
    'Suporte',
    'CRM Incluso',
    'Newsletter sobre inteligência artificial',
    'Fluxos Gratuitos de N8N para seu negócio',
    'Acesso sem AdsPower — tudo diretamente na nossa ferramenta',
  ];

  const getDiscountLabel = (cycle: typeof billingCycle) => {
    const discount = cycles.find(c => c.key === cycle)?.discount || 0;
    return discount > 0 ? `Economize ${discount}%` : '';
  };

  return (
    <section id="planos" className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 border-primary/20 bg-primary/10 text-primary">
            Planos e preços
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha seu plano
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Descontos progressivos para ciclos mais longos. Sem taxas de setup.
          </p>

          {/* Billing cycle toggle */}
          <div className="inline-flex items-center bg-card border border-border rounded-xl p-1 gap-1">
            {cycles.map((cycle) => (
              <button
                key={cycle.key}
                onClick={() => setBillingCycle(cycle.key)}
                className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  billingCycle === cycle.key
                    ? 'bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/60'
                    : 'text-muted-foreground hover:text-foreground'
                } ${cycle.key === 'trimestral' ? 'ring-1 ring-primary/40' : ''}`}
              >
                {cycle.label}
                {cycle.discount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-1 py-0"
                  >
                    -{cycle.discount}%
                  </Badge>
                )}
              </button>
            ))}
          </div>
          <div className="mt-3 text-sm text-primary font-medium">Recomendado: melhor custo-benefício</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={plan.name} className="relative">
              <Card className={`card-premium h-full p-8 ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Mais popular
                  </Badge>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <plan.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-4xl font-bold">R$ {plan.price[billingCycle]}</span>
                      <span className="text-muted-foreground">
                        /{billingCycle === 'mensal' ? 'mês' : billingCycle}
                      </span>
                    </div>
                    {billingCycle !== 'mensal' && (
                      <div className="text-sm text-muted-foreground">
                        <span className="line-through">R$ {plan.originalPrice[billingCycle]}</span>
                        <span className="text-primary font-medium ml-2">
                          {getDiscountLabel(billingCycle)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                {([...plan.features, ...extras]).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant={plan.popular ? "premium" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            🔄 Renovação automática • ❌ Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
};