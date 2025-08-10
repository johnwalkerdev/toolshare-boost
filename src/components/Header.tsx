import { Button } from "@/components/ui/button";
import { Menu, Shield, User } from "lucide-react";
import toolshareLogo from "@/assets/toolshare-logo.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={toolshareLogo} alt="ToolShare" className="h-8 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#ferramentas" className="text-muted-foreground hover:text-primary transition-colors">
            Ferramentas
          </a>
          <a href="#planos" className="text-muted-foreground hover:text-primary transition-colors">
            Planos
          </a>
          <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors">
            Como funciona
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <User className="mr-2 h-4 w-4" />
            Entrar
          </Button>
          <Button variant="premium" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Começar agora
          </Button>
          
          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};