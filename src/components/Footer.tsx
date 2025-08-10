import { Button } from "@/components/ui/button";
import { Mail, Twitter, Github, Shield, Heart } from "lucide-react";
import toolshareLogo from "@/assets/toolshare-logo.png";

export const Footer = () => {
  const links = {
    produto: [
      { name: "Ferramentas", href: "#ferramentas" },
      { name: "Planos", href: "#planos" },
      { name: "Como funciona", href: "#como-funciona" },
      { name: "FAQ", href: "#" }
    ],
    empresa: [
      { name: "Sobre", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Carreiras", href: "#" },
      { name: "Contato", href: "#" }
    ],
    legal: [
      { name: "Privacidade", href: "#" },
      { name: "Termos", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Suporte", href: "#" }
    ]
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={toolshareLogo} alt="ToolShare" className="h-8 w-auto mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              A plataforma de group buy mais confiável do Brasil. 
              Acesse ferramentas premium com IP fixo e navegador dedicado.
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

        {/* Security badge */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm">Pagamentos seguros via Monetizze</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full hidden md:block" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">🔒 SSL 256-bit</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full hidden md:block" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">✅ Uptime 99.9%</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 ToolShare. Todos os direitos reservados.
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