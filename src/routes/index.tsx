import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Package,
  Users,
  ShoppingCart,
  FileBarChart,
  CreditCard,
  Megaphone,
  ClipboardList,
  UserCircle,
  Percent,
  Share2,
  Store,
  Settings,
  HelpCircle,
  ChevronDown,
  Search,
  Bell,
  Download,
  Building2,
  Coins,
  BarChart3,
  Users2,
  HelpCircle as InfoIcon,
  Calendar,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Property Wallet — Agent Organizer" },
      { name: "description", content: "Property Wallet Manager dashboard with inventory analytics, sales funnel, and city insights." },
    ],
  }),
  component: Dashboard,
});

const navMain = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: TrendingUp, label: "Traffic", active: true },
  { icon: Wallet, label: "Property Wallet Inventory", chevron: true },
  { icon: Package, label: "Inventory Management", chevron: true },
  { icon: Users, label: "Leads" },
  { icon: ShoppingCart, label: "Sales Order" },
  { icon: FileBarChart, label: "Reports Managment" },
  { icon: CreditCard, label: "Payments", chevron: true },
  { icon: Megaphone, label: "Advertisement", chevron: true },
  { icon: ClipboardList, label: "CRM Requests" },
  { icon: UserCircle, label: "App Users" },
  { icon: Percent, label: "Commission Request" },
  { icon: Share2, label: "Referrals" },
  { icon: Store, label: "Sales Service Point", chevron: true },
];

const navOther = [
  { icon: Settings, label: "Settings", chevron: true },
  { icon: HelpCircle, label: "Support", chevron: true },
];

const chartData = Array.from({ length: 12 }, (_, i) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const wave = (base: number, amp: number) =>
    Math.round(base + Math.sin(i / 1.6) * amp + (Math.random() - 0.5) * 30);
  return {
    month: months[i],
    add: Math.max(400, 500 + i * 25 + wave(0, 40)),
    sold: Math.max(300, 380 + i * 18 + wave(0, 30)),
    price: Math.max(100, 180 + i * 22 + wave(0, 25)),
  };
});

const cities = [
  { name: "Lilongwe", pct: 50 },
  { name: "Blantyre", pct: 15 },
  { name: "Mzuzu", pct: 25 },
  { name: "Zomba", pct: 65 },
  { name: "Kasungu", pct: 2 },
  { name: "Mangochi", pct: 2 },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-sidebar flex flex-col">
        <div className="px-6 py-5 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-teal" />
          </div>
          <div>
            <div className="font-bold text-[15px] leading-tight">Property Wallet</div>
            <div className="text-[10px] tracking-[0.15em] text-muted-foreground">AGENT ORGANIZER</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          <div className="px-3 py-2 text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">DASHBOARD</div>
          <ul className="space-y-0.5">
            {navMain.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </ul>
          <div className="px-3 pt-5 pb-2 text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">OTHERS</div>
          <ul className="space-y-0.5">
            {navOther.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </ul>
        </nav>

        <div className="m-3 rounded-xl border border-dashed border-teal/40 bg-teal/5 py-5 flex flex-col items-center">
          <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-2 relative">
            <Building2 className="w-5 h-5 text-teal" />
            <Plus className="w-3 h-3 text-teal absolute -bottom-0.5 -right-0.5 bg-sidebar rounded-full" />
          </div>
          <span className="text-sm font-medium text-foreground">New Project</span>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-8 py-5 bg-background">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold">Welcome Back, Muhammad Irfan!</h1>
            <p className="text-sm text-muted-foreground">Property Wallet Manager</p>
          </div>
          <div className="flex-1 max-w-xl mx-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for any information"
                className="w-full h-11 pl-11 pr-4 rounded-full bg-muted/60 border border-transparent focus:outline-none focus:border-teal/40 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-muted/60 rounded-full p-1">
              <button className="px-5 py-1.5 rounded-full bg-teal text-primary-foreground text-sm font-medium">Sell</button>
              <button className="px-5 py-1.5 rounded-full text-sm text-muted-foreground">Rent</button>
            </div>
            <button className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center relative">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-teal-soft" />
          </div>
        </header>

        <div className="px-8 pb-10 space-y-6">
          {/* Summary header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Summary</h2>
              <p className="text-sm text-muted-foreground">Results for all User Traffic for each Matrix</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted/50">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-border">
            <TabItem label="Users Analysis" />
            <TabItem label="Inventories Analysis" active />
            <TabItem label="Agencies Analysis" />
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <KpiCard
              icon={Building2}
              label="No of Inventories"
              value="1566"
              badge="20+ new Inventories"
              rowA={{ label: "PW Inventories", value: "455" }}
              rowB={{ label: "Other Inventories", value: "786" }}
            />
            <KpiCard
              icon={Coins}
              label="Average Inventory Price"
              value="PKR 450M"
              badge="20%"
              trend
              rowA={{ label: "Starting Price", value: "PKR 40M" }}
              rowB={{ label: "Max Price", value: "PKR 850M" }}
            />
            <KpiCard
              icon={BarChart3}
              label="Revenue Generate"
              value="PKR 245M"
              badge="20%"
              trend
              rowA={{ label: "Last Month", value: "PKR 12M" }}
              rowB={{ label: "Current Month", value: "PKR 45M" }}
            />
            <KpiCard
              icon={Users2}
              label="No of Sale Orders"
              value="2500"
              badge="20+ new Clients"
              rowA={{ label: "No of  Quotations Created", value: "899" }}
            />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <FunnelCard />
            <CitiesCard />
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  chevron,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  chevron?: boolean;
}) {
  return (
    <li>
      <button
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
          active
            ? "bg-teal/10 text-teal font-medium"
            : "text-sidebar-foreground hover:bg-muted/60"
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="flex-1 text-left truncate">{label}</span>
        {chevron && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
      </button>
    </li>
  );
}

function TabItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`pb-3 text-sm relative ${
        active ? "text-foreground font-semibold" : "text-muted-foreground"
      }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-foreground rounded-full" />
      )}
    </button>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  badge,
  trend,
  rowA,
  rowB,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  badge: string;
  trend?: boolean;
  rowA: { label: string; value: string };
  rowB?: { label: string; value: string };
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 flex flex-col">
      <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-teal" />
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2 flex-wrap">
        <div className="text-2xl font-bold">{value}</div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal bg-teal/10 px-2 py-1 rounded-md">
          {trend && <TrendingUp className="w-3 h-3" />}
          {badge}
        </span>
      </div>
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2">
        <RowStat {...rowA} />
        {rowB && <RowStat {...rowB} />}
      </div>
    </div>
  );
}

function RowStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {label} <InfoIcon className="w-3 h-3 opacity-60" />
      </div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
    </div>
  );
}

function DateChip() {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 text-xs border border-border rounded-lg text-muted-foreground hover:bg-muted/40">
      <Calendar className="w-3.5 h-3.5" />
      20 Jun — 25 Aug
    </button>
  );
}

function FunnelCard() {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold">Inventories Matrix Funnel</h3>
            <InfoIcon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Check overview of all your property details.
          </p>
        </div>
        <DateChip />
      </div>

      <div className="flex items-center justify-center gap-5 text-xs text-muted-foreground mb-2">
        <LegendDot color="oklch(0.35 0.14 290)" label="Inventories Add" />
        <LegendDot color="oklch(0.55 0.14 290)" label="Sold Inventories" />
        <LegendDot color="oklch(0.25 0.14 290)" label="Inventory Price" />
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid stroke="oklch(0.92 0.008 250)" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.02 260)" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.55 0.02 260)" }} domain={[0, 1000]} ticks={[0,200,400,600,800,1000]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.008 250)", fontSize: 12 }} />
            <Line type="monotone" dataKey="add" stroke="oklch(0.55 0.14 290)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="sold" stroke="oklch(0.35 0.14 290)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="price" stroke="oklch(0.25 0.14 290)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-1">Month</div>
      <div className="absolute" />
      <div className="text-[10px] text-muted-foreground -mt-52 rotate-[-90deg] w-4">Active users</div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function CitiesCard() {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold">Cities</h3>
            <InfoIcon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">In wich city you inventories sell</p>
        </div>
        <DateChip />
      </div>

      <div className="grid grid-cols-5 gap-4 items-center">
        <div className="col-span-2">
          <MalawiMap />
        </div>
        <div className="col-span-3 space-y-3">
          <div className="text-2xl font-bold mb-2">10.8K Users</div>
          {cities.map((c) => (
            <CityRow key={c.name} name={c.name} pct={c.pct} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CityRow({ name, pct }: { name: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-muted-foreground">{name}</span>
        <span className="font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-teal rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function MalawiMap() {
  // Stylized Malawi outline with 3 regions (Northern, Central, Southern) and Lake Malawi.
  return (
    <svg viewBox="0 0 220 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Northern region */}
      <path
        d="M95 15 C 120 20, 135 45, 130 75 L 150 110 L 145 145 L 110 155 L 85 130 L 70 90 L 78 45 Z"
        fill="oklch(0.55 0.02 260)"
        stroke="oklch(1 0 0)"
        strokeWidth="1.5"
      />
      {/* Central region */}
      <path
        d="M145 145 L 110 155 L 85 130 L 60 170 L 55 220 L 90 240 L 130 225 L 155 195 Z"
        fill="oklch(0.75 0.015 260)"
        stroke="oklch(1 0 0)"
        strokeWidth="1.5"
      />
      {/* Southern region */}
      <path
        d="M55 220 L 90 240 L 130 225 L 140 265 L 125 310 L 100 350 L 70 380 L 50 340 L 45 285 Z"
        fill="oklch(0.85 0.012 260)"
        stroke="oklch(1 0 0)"
        strokeWidth="1.5"
      />
      {/* Lake Malawi (subtle) */}
      <path
        d="M130 75 Q 155 130 165 195 Q 155 250 145 265 L 140 250 Q 150 210 152 165 Q 148 120 130 90 Z"
        fill="oklch(0.9 0.02 220)"
        opacity="0.6"
      />

      {/* City dots */}
      <CityDot cx={100} cy={80} label="Mzuzu" />
      <CityDot cx={95} cy={200} label="Lilongwe" big />
      <CityDot cx={80} cy={175} label="Kasungu" small />
      <CityDot cx={120} cy={260} label="Mangochi" small />
      <CityDot cx={90} cy={320} label="Zomba" />
      <CityDot cx={80} cy={355} label="Blantyre" tag />
    </svg>
  );
}

function CityDot({
  cx,
  cy,
  label,
  big,
  small,
  tag,
}: {
  cx: number;
  cy: number;
  label: string;
  big?: boolean;
  small?: boolean;
  tag?: boolean;
}) {
  const r = big ? 7 : small ? 4 : 5;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 3} fill="oklch(0.62 0.11 190)" opacity="0.25" />
      <circle cx={cx} cy={cy} r={r} fill="oklch(0.62 0.11 190)" stroke="oklch(1 0 0)" strokeWidth="2" />
      {tag && (
        <g>
          <text x={cx} y={cy + 20} textAnchor="middle" fontSize="9" fontWeight="600" fill="oklch(0.18 0.02 260)">
            {label}
          </text>
          <text x={cx} y={cy + 32} textAnchor="middle" fontSize="7" fill="oklch(0.55 0.02 260)">
            423 Using
          </text>
        </g>
      )}
    </g>
  );
}
