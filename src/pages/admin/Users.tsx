import { Helmet } from "react-helmet-async";
import { useMemo, useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users as UsersIcon, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getProfiles, createProfile, Profile } from "@/lib/supabase-admin";

const AdminUsers = () => {
  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<'all'|'active'|'inactive'|'trial'>('all');
  const [plan, setPlan] = useState<'all'|'monthly'|'quarterly'|'semiannual'|'annual'|'lifetime'>('all');
  const [loading, setLoading] = useState(true);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPlan, setNewPlan] = useState<'monthly'|'quarterly'|'semiannual'|'annual'|'lifetime'>('lifetime');
  const [newStatus, setNewStatus] = useState<'active'|'trial'|'inactive'>('active');

  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await getProfiles();
      setProfiles(data);
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast({
        title: "Error loading users",
        description: "Failed to load user profiles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const totals = useMemo(() => {
    const active = profiles.filter(u => u.status === 'active').length;
    const trial = profiles.filter(u => u.status === 'trial').length;
    const inactive = profiles.filter(u => u.status === 'inactive').length;
    return { total: profiles.length, active, trial, inactive };
  }, [profiles]);

  const users = useMemo(() => {
    return profiles
      .filter(u => 
        (u.full_name?.toLowerCase().includes(q.toLowerCase()) || false) || 
        (u.email?.toLowerCase().includes(q.toLowerCase()) || false)
      )
      .filter(u => status === 'all' ? true : u.status === status)
      .filter(u => plan === 'all' ? true : u.plan === plan);
  }, [profiles, q, status, plan]);

  return (
    <AdminShell title="Admin - Users">
      <Helmet>
        <title>Admin Users | ToolShare</title>
        <meta name="description" content="Manage ToolShare users: search, filter and perform actions." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/users"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <UsersIcon className="h-7 w-7 text-primary" /> Users
          </h1>
          <p className="text-muted-foreground">Search and manage your user base.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4"><p className="text-sm text-muted-foreground">Total users</p><h3 className="text-2xl font-bold">{totals.total}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Active</p><h3 className="text-2xl font-bold">{totals.active}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Trials</p><h3 className="text-2xl font-bold">{totals.trial}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Inactive</p><h3 className="text-2xl font-bold">{totals.inactive}</h3></Card>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name or email" className="pl-9" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={status} onValueChange={(v: typeof status) => setStatus(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={plan} onValueChange={(v: typeof plan) => setPlan(v)}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All plans</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="semiannual">Semiannual</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="lifetime">Lifetime</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button variant="outline" size="sm">Invite</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">New user</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create user (manual)</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nu-name">Full Name</Label>
                      <Input id="nu-name" value={newName} onChange={(e)=>setNewName(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="nu-email">Email</Label>
                      <Input id="nu-email" type="email" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="nu-phone">Phone</Label>
                      <Input id="nu-phone" type="tel" value={newPhone} onChange={(e)=>setNewPhone(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="nu-plan">Plan</Label>
                      <Select value={newPlan} onValueChange={(v)=>setNewPlan(v as any)}>
                        <SelectTrigger id="nu-plan">
                          <SelectValue placeholder="Plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="semiannual">Semiannual</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                          <SelectItem value="lifetime">Lifetime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="nu-status">Status</Label>
                      <Select value={newStatus} onValueChange={(v)=>setNewStatus(v as any)}>
                        <SelectTrigger id="nu-status">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="trial">Trial</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={async ()=>{
                      const name = newName.trim();
                      const email = newEmail.trim();
                      if(!name || !email) {
                        toast({title: "Error", description: "Name and email are required"});
                        return;
                      }
                      
                      try {
                        const newProfile = await createProfile({
                          user_id: crypto.randomUUID(), // Generate temporary ID
                          full_name: name,
                          email,
                          phone: newPhone || undefined,
                          plan: newPlan,
                          status: newStatus
                        });
                        
                        setProfiles(prev => [newProfile, ...prev]);
                        setNewName("");
                        setNewEmail("");
                        setNewPhone("");
                        setNewPlan('lifetime');
                        setNewStatus('active');
                        
                        toast({title: "User created", description: `${name} added successfully`});
                      } catch (error) {
                        console.error('Error creating user:', error);
                        toast({title: "Error", description: "Failed to create user", variant: "destructive"});
                      }
                    }}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.full_name || 'N/A'}</TableCell>
                    <TableCell className="truncate max-w-[220px]">{u.email || 'N/A'}</TableCell>
                    <TableCell>{u.phone || 'N/A'}</TableCell>
                    <TableCell className="capitalize">{u.plan}</TableCell>
                    <TableCell>
                      <Badge className={u.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}>
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Manage</Button>
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

export default AdminUsers;
