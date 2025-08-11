import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Package, Plus } from "lucide-react";
import { useState } from "react";

const AdminTools = () => {
  const [cat, setCat] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>(["design", "ia", "marketing", "produtividade"]);
  const [newCat, setNewCat] = useState<string>("");
  const { toast } = useToast();
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
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"><Plus className="h-4 w-4 mr-2" /> New category</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create category</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Label htmlFor="new-category">Name</Label>
                  <Input id="new-category" placeholder="e.g. SEO" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
                </div>
                <DialogFooter>
                  <Button onClick={() => {
                    const v = newCat.trim().toLowerCase();
                    if (!v) return;
                    if (categories.includes(v)) {
                      toast({ title: "Category exists", description: "Choose a different name." });
                      return;
                    }
                    setCategories((prev) => [...prev, v]);
                    setNewCat("");
                    toast({ title: "Category created", description: `${v} added.` });
                  }}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button><Plus className="h-4 w-4 mr-2" /> New tool</Button>
          </div>
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
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                ))}
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
