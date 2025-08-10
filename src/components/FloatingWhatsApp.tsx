import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  phone?: string; // E.164 without + (ex: 5511999999999)
  message?: string;
}

export const FloatingWhatsApp = ({
  phone = "5599999999999",
  message = "Olá! Quero saber mais sobre o ToolShare.",
}: FloatingWhatsAppProps) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default FloatingWhatsApp;