import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProxyBrowserLauncher } from "@/components/ProxyBrowserLauncher";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, Play, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { testProxyClientSide } from "@/lib/proxy-test";

type Category = Tables<'categories'>;
type Tool = Tables<'tools'> & {
  category?: Category;
};

type ProxyConfig = {
  type: string;
  verifier: string;
  host: string;
  port: string;
  username: string;
  password: string;
};

const AdminTools = () => {
  const [cat, setCat] = useState<string>("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState<string>("");
  const [toolName, setToolName] = useState("");
  const [toolCat, setToolCat] = useState<string | undefined>(undefined);
  const [toolDesc, setToolDesc] = useState("");
  const [toolImg, setToolImg] = useState("");
  // Proxy fields (optional)
  const [proxyType, setProxyType] = useState("HTTPS");
  const [proxyVerifier, setProxyVerifier] = useState("IP2Location");
  const [proxyHost, setProxyHost] = useState("");
  const [proxyPort, setProxyPort] = useState("");
  const [proxyUser, setProxyUser] = useState("");
  const [proxyPass, setProxyPass] = useState("");
  const [testingProxy, setTestingProxy] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesRes, toolsRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('tools').select('*, category:categories(*)').order('name')
      ]);

      if (categoriesRes.error) throw categoriesRes.error;
      if (toolsRes.error) throw toolsRes.error;

      setCategories(categoriesRes.data || []);
      setTools(toolsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load categories and tools from database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered = tools.filter((t) => cat === 'all' || t.category?.name === cat);

  const openProxyBrowser = (toolId: string, toolName: string) => {
    const proxyUrl = `${window.location.origin}/supabase/functions/v1/proxy-browser?tool=${toolId}&url=https://www.google.com`;
    
    // Open in new window with specific dimensions
    const newWindow = window.open(
      proxyUrl,
      `proxy_${toolId}`,
      'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no'
    );
    
    if (newWindow) {
      newWindow.focus();
      toast({
        title: "Proxy Browser Opened",
        description: `${toolName} opened in new window with proxy configuration`,
      });
    } else {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups for this site to use the proxy browser",
        variant: "destructive"
      });
    }
  };

  const testProxy = async (toolId: string, proxy: ProxyConfig) => {
    setTestingProxy(toolId);
    try {
      const result = await testProxyClientSide(proxy);
      if (result.success) {
        toast({
          title: "Proxy funcionando!",
          description: `IP detectado: ${result.ip}`,
        });
      } else {
        toast({
          title: "Erro no proxy",
          description: result.error || "Falha na conexão",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro no teste",
        description: "Falha ao testar o proxy",
        variant: "destructive"
      });
    } finally {
      setTestingProxy(null);
    }
  };
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
                  <Button onClick={async () => {
                    const v = newCat.trim().toLowerCase();
                    if (!v) return;
                    if (categories.some(c => c.name === v)) {
                      toast({ title: "Category exists", description: "Choose a different name." });
                      return;
                    }

                    try {
                      const { data, error } = await supabase
                        .from('categories')
                        .insert({ name: v })
                        .select()
                        .single();

                      if (error) throw error;

                      setCategories((prev) => [...prev, data]);
                      setNewCat("");
                      toast({ title: "Category created", description: `${v} added.` });
                    } catch (error) {
                      console.error('Error creating category:', error);
                      toast({ 
                        title: "Error", 
                        description: "Failed to create category",
                        variant: "destructive"
                      });
                    }
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
                          <SelectItem key={c.id} value={c.id}>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</SelectItem>
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
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                      <Label>Proxy (opcional)</Label>
                    </div>
                    <div>
                      <Label htmlFor="proxy-type">Tipo proxy</Label>
                      <Select value={proxyType} onValueChange={setProxyType}>
                        <SelectTrigger id="proxy-type">
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HTTPS">HTTPS</SelectItem>
                          <SelectItem value="HTTP">HTTP</SelectItem>
                          <SelectItem value="SOCKS5">SOCKS5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="proxy-verifier">Verificador de IP</Label>
                      <Select value={proxyVerifier} onValueChange={setProxyVerifier}>
                        <SelectTrigger id="proxy-verifier">
                          <SelectValue placeholder="Verificador" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IP2Location">IP2Location</SelectItem>
                          <SelectItem value="ipify">ipify</SelectItem>
                          <SelectItem value="ifconfig.me">ifconfig.me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="proxy-host">Host</Label>
                      <Input id="proxy-host" placeholder="isp.exemplo.com" value={proxyHost} onChange={(e)=>setProxyHost(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="proxy-port">Porta</Label>
                      <Input id="proxy-port" placeholder="8000" value={proxyPort} onChange={(e)=>setProxyPort(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="proxy-user">Usuário</Label>
                      <Input id="proxy-user" placeholder="username" value={proxyUser} onChange={(e)=>setProxyUser(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="proxy-pass">Senha</Label>
                      <Input id="proxy-pass" type="password" placeholder="••••••" value={proxyPass} onChange={(e)=>setProxyPass(e.target.value)} />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={async () => {
                    const name = toolName.trim();
                    const categoryId = (toolCat || '').trim();
                    if (!name || !categoryId) {
                      toast({ title: "Missing data", description: "Name and category are required." });
                      return;
                    }

                    const proxyConfig = proxyHost && proxyPort ? {
                      type: proxyType,
                      verifier: proxyVerifier,
                      host: proxyHost,
                      port: proxyPort,
                      username: proxyUser,
                      password: proxyPass,
                    } : null;

                    try {
                      const { data, error } = await supabase
                        .from('tools')
                        .insert({
                          name,
                          category_id: categoryId,
                          description: toolDesc || null,
                          image_url: toolImg || null,
                          proxy_config: proxyConfig,
                          status: "Active"
                        })
                        .select('*, category:categories(*)')
                        .single();

                      if (error) throw error;

                      setTools((prev) => [...prev, data]);
                      setToolName("");
                      setToolCat(undefined);
                      setToolDesc("");
                      setToolImg("");
                      setProxyHost("");
                      setProxyPort("");
                      setProxyUser("");
                      setProxyPass("");
                      setProxyType("HTTPS");
                      setProxyVerifier("IP2Location");
                      toast({ title: "Tool created", description: `${name} added.` });
                    } catch (error) {
                      console.error('Error creating tool:', error);
                      toast({ 
                        title: "Error", 
                        description: "Failed to create tool",
                        variant: "destructive"
                      });
                    }
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
                  <SelectItem key={c.id} value={c.name}>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">{filtered.length} items</span>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <Card key={t.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{t.category?.name || 'No category'}</p>
                    {t.description && (
                      <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                    )}
                  </div>
                  <Badge className={t.status==='Active' ? 'bg-primary/20 text-primary' : 'bg-muted/60 text-foreground'}>
                    {t.status}
                  </Badge>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        Open Browser
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>🛡️ Proxy Browser - {t.name}</DialogTitle>
                      </DialogHeader>
                      <ProxyBrowserLauncher 
                        toolId={t.id}
                        toolName={t.name}
                        proxyConfig={t.proxy_config}
                      />
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openProxyBrowser(t.id, t.name)}
                  >
                    Quick Open
                  </Button>
                  
                  <Button size="sm" variant="outline">Edit</Button>
                  
                  {t.proxy_config && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => testProxy(t.id, t.proxy_config as ProxyConfig)}
                      disabled={testingProxy === t.id}
                    >
                      {testingProxy === t.id ? (
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                      ) : (
                        <Play className="h-3 w-3 mr-1" />
                      )}
                      Test Proxy
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </AdminShell>
  );
};

export default AdminTools;
