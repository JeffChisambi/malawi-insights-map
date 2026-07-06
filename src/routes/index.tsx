import { createFileRoute } from "@tanstack/react-router";
import {
  Users, FileCheck2, CandlestickChart, Briefcase, Headphones, Scale,
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Clock,
  CheckCircle2, XCircle, Server, Cpu, HardDrive, Wifi, DollarSign, Coins,
  Landmark, UserCheck, UserPlus, ShieldAlert, Zap, Activity, DatabaseBackup,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, PieChart, Pie, Cell,
  RadialBarChart, RadialBar,
} from "recharts";
import { AdminShell, Card } from "@/components/admin-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pine — Broker Admin Dashboard" },
      { name: "description", content: "Pine broker admin: executive overview, users, KYC, trading, wallets, ledger, compliance, and system operations." },
      { property: "og:title", content: "Pine — Broker Admin Dashboard" },
      { property: "og:description", content: "Executive control tower for brokerage operations." },
    ],
  }),
  component: Dashboard,
});

const volumeData = Array.from({ length: 24 }, (_, i) => ({
  h: `${String(i).padStart(2, "0")}:00`,
  volume: Math.round(400 + Math.sin(i / 3) * 220 + Math.random() * 180 + i * 12),
  trades: Math.round(120 + Math.cos(i / 4) * 60 + Math.random() * 40),
}));

const revenueData = Array.from({ length: 14 }, (_, i) => ({
  d: `${i + 1}`,
  deposits: Math.round(500 + Math.random() * 400 + i * 25),
  withdrawals: Math.round(300 + Math.random() * 260 + i * 12),
  revenue: Math.round(80 + Math.random() * 60 + i * 6),
}));

const totalDeposits = revenueData.reduce((s, d) => s + d.deposits, 0);
const totalWithdrawals = revenueData.reduce((s, d) => s + d.withdrawals, 0);
const totalTradeVolume = volumeData.reduce((s, d) => s + d.volume, 0);

const _flowMax = Math.max(totalDeposits, totalWithdrawals, totalTradeVolume);
const radialFlowData = [
  { name: "Trades",      raw: totalTradeVolume, value: Math.round((totalTradeVolume / _flowMax) * 100), fill: "#60A5FA" },
  { name: "Withdrawals", raw: totalWithdrawals,  value: Math.round((totalWithdrawals  / _flowMax) * 100), fill: "#F87171" },
  { name: "Deposits",    raw: totalDeposits,     value: Math.round((totalDeposits     / _flowMax) * 100), fill: "#45B369" },
];

const allocation = [
  { name: "Equities", value: 62, color: "#45B369" },
  { name: "Bonds", value: 18, color: "#7DD99A" },
  { name: "Cash", value: 12, color: "oklch(0.72 0.15 75)" },
  { name: "Funds", value: 8, color: "oklch(0.62 0.13 230)" },
];

const approvals = [
  { type: "KYC", who: "Chikondi Banda", detail: "Tier 2 upgrade", time: "2m", severity: "warn" },
  { type: "Withdrawal", who: "Grace Phiri", detail: "MWK 4,200,000 → Airtel Money", time: "6m", severity: "high" },
  { type: "Manual adj.", who: "Ledger #A-4821", detail: "Correction request", time: "12m", severity: "warn" },
  { type: "Corp action", who: "TNM plc", detail: "Dividend distribution", time: "1h", severity: "info" },
  { type: "Refund", who: "Mercy Kaunda", detail: "Failed deposit refund", time: "2h", severity: "info" },
  { type: "KYC", who: "James Nyirenda", detail: "Face verification review", time: "3h", severity: "warn" },
];

const alerts = [
  { icon: ShieldAlert, title: "AML velocity threshold breached", meta: "Account #U-90312 · 4 deposits in 12m", time: "4m", tone: "rose" },
  { icon: XCircle, title: "Payment gateway PesaPal degraded", meta: "Error rate 6.4% · last 15m", time: "9m", tone: "amber" },
  { icon: Zap, title: "Order execution latency spike", meta: "p95 = 812ms on MSE feed", time: "22m", tone: "amber" },
  { icon: CheckCircle2, title: "Market open completed", meta: "MSE session started nominally", time: "1h", tone: "pine" },
];

const health = [
  { icon: Server, label: "API", value: "99.98%", tone: "pine" },
  { icon: DatabaseBackup, label: "Database", value: "Healthy", tone: "pine" },
  { icon: Cpu, label: "CPU", value: "42%", tone: "pine" },
  { icon: HardDrive, label: "Storage", value: "68%", tone: "amber" },
  { icon: Wifi, label: "Network", value: "Stable", tone: "pine" },
  { icon: Activity, label: "Queues", value: "11 failed", tone: "amber" },
];

function Dashboard() {
  return (
    <AdminShell activeLabel="Executive Dashboard" eyebrow="Control Tower" title="Overview">
      <PageHeader />
      <KpiGrid />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <VolumeCard />
        <RevenueCard />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <ApprovalsCard />
        <AlertsCard />
      </div>
    </AdminShell>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 pt-6">
      <div>
      </div>
    </div>
  );
}

function StatusPill({ tone, label }: { tone: "pine" | "amber" | "rose"; label: string }) {
  const map = {
    pine: "bg-pine/10 text-pine",
    amber: "bg-amber/10 text-amber",
    rose: "bg-rose/10 text-rose",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium ${map[tone]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function KpiGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Kpi icon={Users} label="Registered users" value="184,203" delta="+2.4%" trend="up" sub="12,842 active today" />
      <Kpi icon={Coins} label="Total cash held" value="MWK 214.6B" delta="-0.3%" trend="down" sub="Reserved 42.1B" />
      <Kpi icon={CandlestickChart} label="Volume (today)" value="MWK 18.9B" delta="+12.7%" trend="up" sub="14,208 trades" />
      <Kpi icon={DollarSign} label="Revenue (today)" value="MWK 92.4M" delta="+4.9%" trend="up" sub="Fees + spread" />
      <Kpi icon={ArrowUpRight} label="Deposits today" value="MWK 1.42B" delta="+8.2%" trend="up" sub="3,102 txns" tone="pine" />
      <Kpi icon={ArrowDownRight} label="Withdrawals today" value="MWK 942M" delta="-3.6%" trend="down" sub="1,984 txns" tone="rose" />
      <Kpi icon={Landmark} label="AUM" value="MWK 812.4B" delta="+1.8%" trend="up" sub="30-day change" />
      <Kpi icon={FileCheck2} label="Pending approvals" value="46" delta="urgent" trend="flat" sub="12 KYC · 9 payouts" tone="amber" />
      <Kpi icon={UserPlus} label="New signups (24h)" value="1,284" delta="+6.1%" trend="up" sub="812 verified" />
      <Kpi icon={ShieldAlert} label="Risk alerts" value="7" delta="review" trend="flat" sub="AML · velocity · IP" tone="rose" />
    </div>
  );
}

function Kpi({
  icon: Icon, label, value, delta, trend, sub, tone = "pine",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string; delta: string;
  trend: "up" | "down" | "flat"; sub: string;
  tone?: "pine" | "amber" | "rose";
}) {
  const toneMap = {
    pine: "text-pine bg-pine/10",
    amber: "text-amber bg-amber/10",
    rose: "text-rose bg-rose/10",
  }[tone];
  const trendMap = {
    up: "text-pine bg-pine/10",
    down: "text-rose bg-rose/10",
    flat: "text-amber bg-amber/10",
  }[trend];
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Clock;
  return (
    <div className="rounded-xl bg-card border border-border p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${toneMap}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${trendMap}`}>
          <TrendIcon className="w-3 h-3" /> {delta}
        </span>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xl font-bold mt-0.5">{value}</div>
        <div className="text-[11px] text-muted-foreground mt-1">{sub}</div>
      </div>
    </div>
  );
}

function VolumeCard() {
  return (
    <Card title="Trading volume (24h)" subtitle="Rolling hourly volume and executed trades" className="xl:col-span-2">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#45B369" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#45B369" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(0.92 0.008 150)" vertical={false} />
            <XAxis dataKey="h" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "oklch(0.5 0.02 160)" }} interval={2} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "oklch(0.5 0.02 160)" }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.008 150)", fontSize: 12 }} />
            <Area type="monotone" dataKey="volume" stroke="#45B369" strokeWidth={2} fill="url(#gv)" />
            <Line type="monotone" dataKey="trades" stroke="oklch(0.72 0.15 75)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function SystemHealthCard() {
  return (
    <Card title="System health" subtitle="Core services & infrastructure">
      <div className="grid grid-cols-2 gap-3">
        {health.map((h) => {
          const Icon = h.icon;
          const tone =
            h.tone === "pine" ? "text-pine bg-pine/10" :
            h.tone === "amber" ? "text-amber bg-amber/10" : "text-rose bg-rose/10";
          return (
            <div key={h.label} className="rounded-lg border border-border p-3 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tone}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">{h.label}</div>
                <div className="text-sm font-semibold truncate">{h.value}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Uptime (30d)</span>
          <span className="font-semibold text-pine">99.982%</span>
        </div>
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-pine rounded-full" style={{ width: "99.982%" }} />
        </div>
      </div>
    </Card>
  );
}

function RevenueCard() {
  return (
    <Card title="Flow breakdown" subtitle="Last 14 days · MWK millions">
      <div className="flex flex-col gap-3">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="25%"
              outerRadius="95%"
              barSize={10}
              data={radialFlowData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={6}
                background={{ fill: "oklch(0.94 0.005 150)" }}
              />
              <Tooltip
                formatter={(_: number, __: string, props: { payload?: { name: string; raw: number } }) =>
                  [`MWK ${((props.payload?.raw ?? 0) / 1000).toFixed(1)}B`, props.payload?.name ?? ""]
                }
                contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.008 150)", fontSize: 12 }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {[...radialFlowData].reverse().map((entry) => (
            <div key={entry.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: entry.fill }} />
                <span className="text-xs text-muted-foreground">{entry.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">MWK {(entry.raw / 1000).toFixed(1)}B</span>
                <span className="text-xs text-muted-foreground w-8 text-right">{entry.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function AllocationCard() {
  const total = allocation.reduce((s, a) => s + a.value, 0);
  return (
    <Card title="Aggregate portfolio" subtitle="Asset allocation across all users">
      <div className="flex items-center gap-4">
        <div className="w-40 h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={allocation} innerRadius={48} outerRadius={72} paddingAngle={2} dataKey="value">
                {allocation.map((a) => <Cell key={a.name} fill={a.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[10px] text-muted-foreground">AUM</div>
            <div className="text-lg font-bold">812.4B</div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {allocation.map((a) => (
            <div key={a.name} className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full" style={{ background: a.color }} />
              <span className="flex-1">{a.name}</span>
              <span className="font-semibold">{Math.round((a.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ApprovalsCard() {
  return (
    <Card
      title="Pending approvals"
      subtitle="Actions waiting on admin review"
      className="xl:col-span-2"
      action={<button className="text-xs text-pine font-medium hover:underline">View queue →</button>}
    >
      <div className="divide-y divide-border">
        {approvals.map((a, i) => {
          const tone =
            a.severity === "high" ? "bg-rose/10 text-rose" :
            a.severity === "warn" ? "bg-amber/10 text-amber" : "bg-pine/10 text-pine";
          return (
            <div key={i} className="py-3 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold ${tone}`}>
                {a.type.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{a.who}</div>
                <div className="text-xs text-muted-foreground truncate">{a.type} · {a.detail}</div>
              </div>
              <div className="text-[11px] text-muted-foreground">{a.time} ago</div>
              <div className="flex items-center gap-1">
                <button className="text-xs px-2.5 py-1 rounded-md bg-pine text-primary-foreground hover:opacity-95">
                  Approve
                </button>
                <button className="text-xs px-2.5 py-1 rounded-md border border-border hover:bg-muted/40">
                  Review
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function AlertsCard() {
  return (
    <Card title="Critical alerts" subtitle="Last 6 hours">
      <ul className="space-y-3">
        {alerts.map((a, i) => {
          const Icon = a.icon;
          const tone =
            a.tone === "rose" ? "bg-rose/10 text-rose" :
            a.tone === "amber" ? "bg-amber/10 text-amber" : "bg-pine/10 text-pine";
          return (
            <li key={i} className="flex gap-3">
              <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${tone}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-tight">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">{a.meta}</div>
              </div>
              <div className="text-[11px] text-muted-foreground shrink-0">{a.time}</div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function OperationsStrip() {
  const ops = [
    { label: "Open orders", value: "3,412", icon: CandlestickChart },
    { label: "Pending settlements", value: "14", icon: Clock },
    { label: "Failed jobs", value: "11", icon: XCircle },
    { label: "Active sessions", value: "27,880", icon: Users },
    { label: "Support tickets", value: "18", icon: Headphones },
    { label: "AML cases", value: "5", icon: Scale },
  ];
  return (
    <div className="rounded-xl bg-card border border-border p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {ops.map((o) => {
        const Icon = o.icon;
        return (
          <div key={o.label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-muted/70 flex items-center justify-center">
              <Icon className="w-4 h-4 text-pine" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{o.label}</div>
              <div className="text-base font-semibold">{o.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
