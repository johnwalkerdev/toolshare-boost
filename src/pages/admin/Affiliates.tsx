import { Helmet } from "react-helmet-async";
import AdminShell from "@/components/AdminShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { Share2 } from "lucide-react";

const AdminAffiliates = () => {
  type Affiliate = {
    name: string;
    email: string;
    code: string;
    clicks: number;
    signups: number;
    paidUsers: number;
    commissionPct: number; // 0-100
    balance: number; // pending payout
    status: "Active" | "Paused";
  };

  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    { name: "Alice Growth", email: "alice@growth.io", code: "ALICE10", clicks: 420, signups: 60, paidUsers: 25, commissionPct: 30, balance: 525, status: "Active" },
    { name: "Bob Ads", email: "bob@ads.com", code: "BOBDEV", clicks: 130, signups: 18, paidUsers: 7, commissionPct: 25, balance: 175, status: "Paused" },
  ]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newPct, setNewPct] = useState(30);

  const metrics = useMemo(() => {
    const total = affiliates.length;
    const clicks = affiliates.reduce((s, a) => s + a.clicks, 0);
    const conv = affiliates.reduce((s, a) => s + a.paidUsers, 0);
    const balance = affiliates.reduce((s, a) => s + a.balance, 0);
    return { total, clicks, conv, balance };
  }, [affiliates]);

  const genCode = () => {
    const base = (newName || newEmail || "AFF").split(" ")[0].toUpperCase().replace(/[^A-Z0-9]/g, "");
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    setNewCode(`${base}${rand}`);
  };

  return (
    <AdminShell title="Admin - Affiliates">
      <Helmet>
        <title>Admin Affiliates | ToolShare</title>
        <meta name="description" content="Manage affiliate program: partners, referral codes and commissions." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"")+"/admin/affiliates"} />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Share2 className="h-7 w-7 text-primary" /> Affiliates
          </h1>
          <p className="text-muted-foreground">Mock affiliate system with partners, codes and commissions.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4"><p className="text-sm text-muted-foreground">Affiliates</p><h3 className="text-2xl font-bold">{metrics.total}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Total Clicks</p><h3 className="text-2xl font-bold">{metrics.clicks}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Paid Conversions</p><h3 className="text-2xl font-bold">{metrics.conv}</h3></Card>
          <Card className="p-4"><p className="text-sm text-muted-foreground">Pending Balance ($)</p><h3 className="text-2xl font-bold">{metrics.balance.toFixed(2)}</h3></Card>
        </div>

        <Card className="p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-muted-foreground">Manage partners and payouts. Everything is mocked for now.</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>New affiliate</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create affiliate</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="af-name">Name</Label>
                  <Input id="af-name" value={newName} onChange={(e)=>setNewName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="af-email">Email</Label>
                  <Input id="af-email" type="email" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="af-code">Referral code</Label>
                  <div className="flex gap-2">
                    <Input id="af-code" value={newCode} onChange={(e)=>setNewCode(e.target.value.toUpperCase())} className="uppercase" />
                    <Button type="button" variant="outline" onClick={genCode}>Generate</Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="af-pct">Commission %</Label>
                  <Input id="af-pct" type="number" min={0} max={100} value={newPct} onChange={(e)=>setNewPct(Number(e.target.value))} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={()=>{
                  const name = newName.trim();
                  const email = newEmail.trim();
                  const code = (newCode || "").trim().toUpperCase() || "AFF"+Math.random().toString(36).slice(2,6).toUpperCase();
                  if(!name || !email) return;
                  setAffiliates(prev=>[
                    ...prev,
                    { name, email, code, clicks: 0, signups: 0, paidUsers: 0, commissionPct: newPct, balance: 0, status: "Active" }
                  ]);
                  setNewName("");
                  setNewEmail("");
                  setNewCode("");
                  setNewPct(30);
                }}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>

        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Affiliate</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Signups</TableHead>
                <TableHead>Paid users</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="text-right">Status / Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliates.map((a)=> (
                <TableRow key={a.email}>
                  <TableCell>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.email}</div>
                  </TableCell>
                  <TableCell>{a.code}</TableCell>
                  <TableCell>{a.clicks}</TableCell>
                  <TableCell>{a.signups}</TableCell>
                  <TableCell>{a.paidUsers}</TableCell>
                  <TableCell>{a.commissionPct}%</TableCell>
                  <TableCell>${a.balance.toFixed(2)}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <Badge className={a.status==='Active' ? 'bg-primary/20 text-primary' : 'bg-muted/60 text-foreground'}>{a.status}</Badge>
                    <Button size="sm" variant="outline" onClick={()=>{
                      setAffiliates(prev=>prev.map(x=> x.email===a.email ? { ...x, status: x.status==='Active'?'Paused':'Active' } : x));
                    }}>{a.status==='Active'? 'Pause' : 'Activate'}</Button>
                    <Button size="sm" onClick={()=>{
                      // mock payout: clear balance
                      setAffiliates(prev=>prev.map(x=> x.email===a.email ? { ...x, balance: 0 } : x));
                    }}>Pay</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </AdminShell>
  );
};

export default AdminAffiliates;
