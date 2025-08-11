import { Button } from "@/components/ui/button";
import { Mail, Twitter, Github, Shield, Heart } from "lucide-react";
import toolshareLogo from "@/assets/toolshare-logo.svg";

export const Footer = () => {
  const links = {
    produto: [
      { name: "Ferramentas", href: "#ferramentas" },
      { name: "Planos", href: "#planos" },
      { name: "Como funciona", href: "#como-funciona" },
      { name: "FAQ", href: "#faq" }
    ],
    empresa: [
      { name: "Sobre", href: "/sobre" },
      { name: "Suporte", href: "/suporte" },
      { name: "Contato", href: "/contato" }
    ],
    legal: [
      { name: "Privacidade", href: "/privacidade" },
      { name: "Termos", href: "/termos" },
      { name: "Suporte", href: "/contato" }
    ]
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={toolshareLogo} alt="ToolShare" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              A plataforma de ferramentas premium mais confiável do Brasil. Seu portfólio de ferramentas em um só lugar.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              {links.produto.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.empresa.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 ToolShare. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>no Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};