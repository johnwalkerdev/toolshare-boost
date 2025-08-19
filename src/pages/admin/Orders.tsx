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
import { ShoppingCart, Plus, Loader2, DollarSign, TrendingUp, Users, Package } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getOrders, createOrder, Order, getProducts, Product } from "@/lib/supabase-admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminOrders = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New order form
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [orderAmount, setOrderAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cartao");
  
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, productsData] = await Promise.all([
        getOrders(),
        getProducts()
      ]);
      
      setOrders(ordersData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load orders and products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => 
      statusFilter === 'all' || order.status === statusFilter
    );
  }, [orders, statusFilter]);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const paid = orders.filter(o => o.status === 'paid').length;
    const failed = orders.filter(o => o.status === 'failed').length;
    const totalRevenue = orders
      .filter(o => o.status === 'paid')
      .reduce((sum, o) => sum + o.amount, 0);
    
    return { total, pending, paid, failed, totalRevenue };
  }, [orders]);

  const handleCreateOrder = async () => {
    const name = customerName.trim();
    const email = customerEmail.trim();
    const amount = parseFloat(orderAmount);
    
    if (!name || !email || !amount || isNaN(amount)) {
      toast({ 
        title: "Missing data", 
        description: "Name, email and valid amount are required." 
      });
      return;
    }

    try {
      const newOrder = await createOrder({
        customer_name: name,
        customer_email: email,
        customer_phone: customerPhone || undefined,
        product_id: selectedProduct || undefined,
        amount,
        payment_method: paymentMethod,
        status: "pending"
      });

      setOrders(prev => [newOrder, ...prev]);
      
      // Reset form
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setSelectedProduct("");
      setOrderAmount("");
      setPaymentMethod("cartao");
      
      toast({ 
        title: "Order created", 
        description: `Order for ${name} created successfully.` 
      });
    } catch (error) {
      console.error('Error creating order:', error);
      toast({ 
        title: "Error", 
        description: "Failed to create order",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminShell title="Admin - Orders">
      <Helmet>
        <title>Admin Orders | ToolShare</title>
        <meta name="description" content="Manage orders and sales for ToolShare platform." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/orders"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-7 w-7 text-primary" /> Orders
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" /> New Order</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Order</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input 
                    id="customer-name" 
                    placeholder="e.g. João Silva" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="customer-email">Customer Email</Label>
                  <Input 
                    id="customer-email" 
                    type="email"
                    placeholder="joao@exemplo.com" 
                    value={customerEmail} 
                    onChange={(e) => setCustomerEmail(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="customer-phone">Customer Phone</Label>
                  <Input 
                    id="customer-phone" 
                    placeholder="(11) 99999-9999" 
                    value={customerPhone} 
                    onChange={(e) => setCustomerPhone(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="order-amount">Amount (R$)</Label>
                  <Input 
                    id="order-amount" 
                    type="number" 
                    step="0.01" 
                    placeholder="99.90" 
                    value={orderAmount} 
                    onChange={(e) => setOrderAmount(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="product-select">Product (Optional)</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger id="product-select">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No product</SelectItem>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} - R$ {p.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cartao">Cartão</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateOrder}>Create Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Orders</span>
            </div>
            <h3 className="text-2xl font-bold">{stats.total}</h3>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <h3 className="text-2xl font-bold">{stats.pending}</h3>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Paid</span>
            </div>
            <h3 className="text-2xl font-bold">{stats.paid}</h3>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Failed</span>
            </div>
            <h3 className="text-2xl font-bold">{stats.failed}</h3>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Revenue</span>
            </div>
            <h3 className="text-2xl font-bold">R$ {stats.totalRevenue.toFixed(2)}</h3>
          </Card>
        </div>

        <Card className="p-4 mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">{filteredOrders.length} orders</span>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.customer_name}</div>
                      <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                      {order.customer_phone && (
                        <div className="text-xs text-muted-foreground">{order.customer_phone}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {order.product?.name || 'N/A'}
                    </TableCell>
                    <TableCell className="font-mono">
                      R$ {order.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="capitalize">
                      {order.payment_method || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        order.status === 'paid' ? 'bg-green-500/20 text-green-500' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        order.status === 'failed' ? 'bg-red-500/20 text-red-500' :
                        'bg-muted/60 text-foreground'
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(order.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>
    </AdminShell>
  );
};

export default AdminOrders;