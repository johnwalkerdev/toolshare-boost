import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Plus } from "lucide-react";
import { useState } from "react";

const AdminTools = () => {
  const [cat, setCat] = useState<string>("all");
  const tools = [
    { name: "Canva Pro", category: "design", status: "Active" },
    { name: "ChatGPT", category: "ia", status: "Active" },
    { name: "Semrush", category: "marketing", status: "Paused" },
  ].filter(t => cat==='all' || t.category===cat);

  return (
    <AdminShell title="Admin - Tools">
      <Helmet>
        <title>Admin Tools | ToolShare</title>
        <meta name="description" content="Manage shared tools, categories and availability in ToolShare." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/tools"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Package className="h-7 w-7 text-primary" /> Tools
          </h1>
          <Button><Plus className="h-4 w-4 mr-2" /> New tool</Button>
        </header>

        <Card className="p-4 mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="ia">IA & Automação</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="produtividade">Produtividade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">{tools.length} items</span>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Card key={t.name} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{t.category}</p>
                </div>
                <Badge className={t.status==='Active' ? 'bg-primary/20 text-primary' : 'bg-muted/60 text-foreground'}>
                  {t.status}
                </Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">Open</Button>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AdminShell>
  );
};

export default AdminTools;
