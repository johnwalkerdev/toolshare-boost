import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Apps from "./pages/Apps";
import CRM from "./pages/CRM";
import Assinatura from "./pages/Assinatura";
import About from "./pages/About";
import Support from "./pages/Support";
import Avisos from "./pages/Avisos";
import Sugestoes from "./pages/Sugestoes";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import AdminUsers from "./pages/admin/Users";
import AdminTools from "./pages/admin/Tools";
import AdminAnnouncements from "./pages/admin/Announcements";
import AdminSettings from "./pages/admin/Settings";
import AdminVotes from "./pages/admin/Votes";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/apps" element={<Apps />} />
            <Route path="/avisos" element={<Avisos />} />
            <Route path="/sugestoes" element={<Sugestoes />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/assinatura" element={<Assinatura />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/suporte" element={<Support />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/tools" element={<AdminTools />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
            <Route path="/admin/votes" element={<AdminVotes />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/contato" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingWhatsApp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
