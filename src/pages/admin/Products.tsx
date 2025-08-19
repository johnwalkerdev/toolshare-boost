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
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getProducts, createProduct, Product } from "@/lib/supabase-admin";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Category = Tables<'categories'>;

const AdminProducts = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New product form
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [monetizzeProductId, setMonetizzeProductId] = useState("");
  const [monetizzeCheckoutCode, setMonetizzeCheckoutCode] = useState("");
  
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesRes] = await Promise.all([
        getProducts(),
        supabase.from('categories').select('*').order('name')
      ]);

      if (categoriesRes.error) throw categoriesRes.error;
      
      setProducts(productsData);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load products and categories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) => 
    categoryFilter === 'all' || p.category?.name === categoryFilter
  );

  const handleCreateProduct = async () => {
    const name = productName.trim();
    const price = parseFloat(productPrice);
    
    if (!name || !price || isNaN(price)) {
      toast({ 
        title: "Missing data", 
        description: "Name and valid price are required." 
      });
      return;
    }

    try {
      const newProduct = await createProduct({
        name,
        description: productDesc || undefined,
        price,
        category_id: productCategory || undefined,
        monetizze_product_id: monetizzeProductId || undefined,
        monetizze_checkout_code: monetizzeCheckoutCode || undefined,
        status: "active"
      });

      setProducts(prev => [newProduct, ...prev]);
      
      // Reset form
      setProductName("");
      setProductDesc("");
      setProductPrice("");
      setProductCategory("");
      setMonetizzeProductId("");
      setMonetizzeCheckoutCode("");
      
      toast({ 
        title: "Product created", 
        description: `${name} added successfully.` 
      });
    } catch (error) {
      console.error('Error creating product:', error);
      toast({ 
        title: "Error", 
        description: "Failed to create product",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminShell title="Admin - Products">
      <Helmet>
        <title>Admin Products | ToolShare</title>
        <meta name="description" content="Manage products for ToolShare platform with Monetizze integration." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/products"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Package className="h-7 w-7 text-primary" /> Products
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> New Product</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Product</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name">Name</Label>
                  <Input 
                    id="product-name" 
                    placeholder="e.g. Premium Plan" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="product-price">Price (R$)</Label>
                  <Input 
                    id="product-price" 
                    type="number" 
                    step="0.01" 
                    placeholder="99.90" 
                    value={productPrice} 
                    onChange={(e) => setProductPrice(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <Select value={productCategory} onValueChange={setProductCategory}>
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="monetizze-product-id">Monetizze Product ID</Label>
                  <Input 
                    id="monetizze-product-id" 
                    placeholder="Optional" 
                    value={monetizzeProductId} 
                    onChange={(e) => setMonetizzeProductId(e.target.value)} 
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="product-desc">Description</Label>
                  <Textarea 
                    id="product-desc" 
                    placeholder="Product description" 
                    value={productDesc} 
                    onChange={(e) => setProductDesc(e.target.value)} 
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="monetizze-checkout">Monetizze Checkout Code</Label>
                  <Input 
                    id="monetizze-checkout" 
                    placeholder="e.g. KZC42 (for Monetizze integration)" 
                    value={monetizzeCheckoutCode} 
                    onChange={(e) => setMonetizzeCheckoutCode(e.target.value)} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateProduct}>Create Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <Card className="p-4 mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">{filtered.length} products</span>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {product.category?.name || 'No category'}
                    </p>
                  </div>
                  <Badge className={product.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-muted/60 text-foreground'}>
                    {product.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-2xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </div>
                  {product.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  {product.monetizze_checkout_code && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">Monetizze:</span> {product.monetizze_checkout_code}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">View Sales</Button>
                  {product.monetizze_checkout_code && (
                    <Button size="sm" variant="outline">Test Checkout</Button>
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

export default AdminProducts;