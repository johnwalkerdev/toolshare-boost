import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const FAQ = () => {
  const faqs = [
    { q: "Como recebo acesso às ferramentas?", a: "Após a confirmação do pagamento, você recebe um e-mail com instruções e links de acesso." },
    { q: "Posso cancelar quando quiser?", a: "Sim. Você pode cancelar a qualquer momento e manterá o acesso até o final do ciclo." },
    { q: "Quais planos existem?", a: "Mensal, Trimestral (mais popular) e Semestral, com descontos progressivos." },
    { q: "O CRM está incluso?", a: "Sim! Nossos clientes têm acesso ao CRM como bônus para organizar clientes e tarefas." },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 border-primary/20 bg-primary/10 text-primary">Perguntas frequentes</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
