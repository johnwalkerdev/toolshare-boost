import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Package, Plus } from "lucide-react";
import { useState } from "react";

const AdminTools = () => {
  const [cat, setCat] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>(["design", "ia", "marketing", "produtividade"]);
  const [newCat, setNewCat] = useState<string>("");
  const [tools, setTools] = useState<{ name: string; category: string; status: string }[]>([
    { name: "Canva Pro", category: "design", status: "Active" },
    { name: "ChatGPT", category: "ia", status: "Active" },
    { name: "Semrush", category: "marketing", status: "Paused" },
  ]);
  const [toolName, setToolName] = useState("");
  const [toolCat, setToolCat] = useState<string | undefined>(undefined);
  const [toolDesc, setToolDesc] = useState("");
  const [toolImg, setToolImg] = useState("");
  const [toolProxy, setToolProxy] = useState("");
  const { toast } = useToast();
  const filtered = tools.filter((t) => cat === 'all' || t.category === cat);
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
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-2" /> New tool</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create tool</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tool-name">Name</Label>
                    <Input id="tool-name" placeholder="e.g. Canva Pro" value={toolName} onChange={(e) => setToolName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="tool-category">Category</Label>
                    <Select value={toolCat} onValueChange={setToolCat}>
                      <SelectTrigger id="tool-category">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="tool-desc">Description</Label>
                    <Textarea id="tool-desc" placeholder="Short description for the tool" value={toolDesc} onChange={(e) => setToolDesc(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="tool-img">Image (URL)</Label>
                    <Input id="tool-img" placeholder="https://.../logo.png" value={toolImg} onChange={(e) => setToolImg(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="tool-proxy">Proxy</Label>
                    <Input id="tool-proxy" placeholder="proxy://region/proxy-id" value={toolProxy} onChange={(e) => setToolProxy(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => {
                    const name = toolName.trim();
                    const category = (toolCat || '').trim();
                    if (!name || !category) {
                      toast({ title: "Missing data", description: "Name and category are required." });
                      return;
                    }
                    setTools((prev) => [...prev, { name, category, status: "Active" }]);
                    setToolName("");
                    setToolCat(undefined);
                    setToolDesc("");
                    setToolImg("");
                    setToolProxy("");
                    toast({ title: "Tool created", description: `${name} added.` });
                  }}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
          <span className="text-sm text-muted-foreground">{filtered.length} items</span>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((t) => (
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
