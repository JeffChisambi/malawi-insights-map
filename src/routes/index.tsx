import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  FileCheck2,
  CandlestickChart,
  Briefcase,
  Wallet,
  BookOpen,
  CreditCard,
  Building2,
  LineChart as LineChartIcon,
  Newspaper,
  Bell,
  Star,
  BarChart3,
  Headphones,
  AlertTriangle,
  Scale,
  KeyRound,
  UserCog,
  Activity,
  ListChecks,
  History,
  Settings,
  Plug,
  DatabaseBackup,
  ChevronDown,
  ChevronRight,
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  Trees,
  CircleUser,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  DollarSign,
  Coins,
  Landmark,
  UserCheck,
  UserPlus,
  ShieldAlert,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

type NavChild = { label: string; badge?: string | number };
type NavGroup = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  section: string;
  badge?: string | number;
  active?: boolean;
  children?: NavChild[];
};

const nav: NavGroup[] = [
  { section: "OVERVIEW", icon: LayoutDashboard, label: "Executive Dashboard", active: true },
  {
    section: "CLIENTS", icon: Users, label: "User Management", badge: 12,
    children: [
      { label: "All Users" }, { label: "Advanced Filters" }, { label: "Frozen Accounts", badge: 4 },
      { label: "Suspended", badge: 2 }, { label: "Closed" }, { label: "Login History" },
      { label: "Trusted Devices" }, { label: "Linked Banks" }, { label: "Linked Mobile Money" },
      { label: "Activity Timeline" }, { label: "Export" },
    ],
  },
  {
    section: "CLIENTS", icon: ShieldCheck, label: "Auth & Security",
    children: [
      { label: "Active Sessions" }, { label: "Force Logout" }, { label: "Password Resets" },
      { label: "PIN Resets" }, { label: "Biometric Status" }, { label: "MFA" },
      { label: "Failed Logins", badge: 38 }, { label: "Lockouts", badge: 6 },
      { label: "IP Blacklist" }, { label: "Device Blacklist" },
    ],
  },
  {
    section: "CLIENTS", icon: FileCheck2, label: "KYC Management", badge: 27,
    children: [
      { label: "Pending Reviews", badge: 27 }, { label: "Documents" }, { label: "Face Verification" },
      { label: "OCR Results" }, { label: "Approved" }, { label: "Rejected" },
      { label: "Additional Docs" }, { label: "Verification History" }, { label: "Manual Verification" },
      { label: "Audit Trail" },
    ],
  },
  {
    section: "MARKETS", icon: CandlestickChart, label: "Trading Operations",
    children: [
      { label: "All Orders" }, { label: "Open" }, { label: "Completed" }, { label: "Cancelled" },
      { label: "Rejected" }, { label: "Pending Settlements", badge: 14 }, { label: "Trade History" },
      { label: "Execution Logs" }, { label: "Suspend Trading" },
    ],
  },
  {
    section: "MARKETS", icon: Briefcase, label: "Portfolio Management",
    children: [
      { label: "User Portfolios" }, { label: "Holdings" }, { label: "Allocation" },
      { label: "Performance" }, { label: "Historical Snapshots" }, { label: "Unrealized Gains" },
      { label: "Realized Gains" }, { label: "Dividends Received" }, { label: "Export" },
    ],
  },
  {
    section: "MARKETS", icon: LineChartIcon, label: "Market Data",
    children: [
      { label: "Listed Companies" }, { label: "Listed Securities" }, { label: "Import Prices" },
      { label: "Sync Status" }, { label: "Market Holidays" }, { label: "Trading Sessions" },
      { label: "Price History" }, { label: "Sync Logs" }, { label: "Retry Failed Imports" },
    ],
  },
  {
    section: "MARKETS", icon: Building2, label: "Corporate Actions",
    children: [
      { label: "Dividend Announcements" }, { label: "Import Actions" }, { label: "Dividend Schedules" },
      { label: "Stock Splits" }, { label: "Bonus Issues" }, { label: "Rights Issues" },
      { label: "Mergers" }, { label: "Payment Schedules" }, { label: "Distribution History" },
    ],
  },
  {
    section: "FINANCE", icon: Wallet, label: "Wallet Management",
    children: [
      { label: "Balances" }, { label: "Available" }, { label: "Reserved" }, { label: "Pending" },
      { label: "Wallet History" }, { label: "Reservations" }, { label: "Deposits" },
      { label: "Withdrawals" }, { label: "Manual Adjustments", badge: 3 }, { label: "Statements" },
    ],
  },
  {
    section: "FINANCE", icon: BookOpen, label: "Ledger & Accounting",
    children: [
      { label: "Ledger Entries" }, { label: "Journal Entries" }, { label: "Account Balances" },
      { label: "Reconciliation" }, { label: "Settlement Records" }, { label: "Financial Reports" },
      { label: "Export" }, { label: "Audit Financial" },
    ],
  },
  {
    section: "FINANCE", icon: CreditCard, label: "Payments",
    children: [
      { label: "Deposits" }, { label: "Withdrawals" }, { label: "Failed", badge: 9 },
      { label: "Retry Payments" }, { label: "Gateways" }, { label: "Bank Reconciliation" },
      { label: "Mobile Money Reconciliation" }, { label: "Disputes", badge: 2 },
      { label: "Refunds" }, { label: "Manual Verification" },
    ],
  },
  {
    section: "ENGAGEMENT", icon: Newspaper, label: "News & Announcements",
    children: [
      { label: "Market News" }, { label: "Company News" }, { label: "Announcements" },
      { label: "Scheduled" }, { label: "Pinned" }, { label: "Archive" },
    ],
  },
  {
    section: "ENGAGEMENT", icon: Bell, label: "Notifications",
    children: [
      { label: "Push" }, { label: "Email Campaigns" }, { label: "SMS" }, { label: "Broadcasts" },
      { label: "Scheduled" }, { label: "Delivery Status" }, { label: "Retry Failed" },
      { label: "Templates" }, { label: "History" },
    ],
  },
  {
    section: "ENGAGEMENT", icon: Star, label: "Watchlists & Alerts",
    children: [
      { label: "User Watchlists" }, { label: "Global Alerts" }, { label: "Price Alerts" },
      { label: "Market Alerts" }, { label: "Delete Alerts" }, { label: "Delivery Monitor" },
    ],
  },
  {
    section: "INSIGHTS", icon: BarChart3, label: "Reports & Analytics",
    children: [
      { label: "User Growth" }, { label: "Revenue" }, { label: "Trading" }, { label: "Settlement" },
      { label: "Dividend" }, { label: "Portfolio" }, { label: "Wallet" }, { label: "Compliance" },
      { label: "Audit" }, { label: "Daily / Monthly / Annual" }, { label: "Export CSV / XLS / PDF" },
    ],
  },
  {
    section: "INSIGHTS", icon: Headphones, label: "Customer Support", badge: 18,
    children: [
      { label: "Search Customer" }, { label: "Timeline" }, { label: "Support History" },
      { label: "Create Case" }, { label: "Assign Tickets" }, { label: "Escalate", badge: 3 },
      { label: "Internal Notes" }, { label: "Resolve" }, { label: "Communications" },
    ],
  },
  {
    section: "RISK", icon: AlertTriangle, label: "Risk & Fraud", badge: 7,
    children: [
      { label: "Suspicious Accounts", badge: 7 }, { label: "Suspicious Trades" }, { label: "AML Alerts" },
      { label: "Velocity Alerts" }, { label: "Large Transactions" }, { label: "Device Risk" },
      { label: "IP Risk" }, { label: "Country Risk" }, { label: "Fraud Dashboard" },
      { label: "Risk Scoring" }, { label: "Manual Review" },
    ],
  },
  {
    section: "RISK", icon: Scale, label: "Compliance",
    children: [
      { label: "AML Monitoring" }, { label: "Sanctions Screening" }, { label: "PEP Screening" },
      { label: "Regulatory Reports" }, { label: "Audit Logs" }, { label: "Case Management" },
      { label: "Suspicious Activity Reports" }, { label: "Regulatory Export" },
    ],
  },
  {
    section: "ACCESS", icon: KeyRound, label: "Roles & Permissions",
    children: [
      { label: "Roles" }, { label: "Assign Permissions" }, { label: "Revoke" },
      { label: "Role Assignments" }, { label: "Permission Audit" }, { label: "Access History" },
    ],
  },
  {
    section: "ACCESS", icon: UserCog, label: "Staff Management",
    children: [
      { label: "Administrators" }, { label: "Invite Staff" }, { label: "Disable Accounts" },
      { label: "Reset MFA" }, { label: "Staff Activity" }, { label: "Audit Logs" },
      { label: "Sessions" },
    ],
  },
  {
    section: "SYSTEM", icon: Activity, label: "System Monitoring",
    children: [
      { label: "API Health" }, { label: "Database" }, { label: "Redis" }, { label: "Queues" },
      { label: "Storage" }, { label: "CPU" }, { label: "Memory" }, { label: "Network" },
      { label: "Error Logs", badge: 24 }, { label: "Uptime" }, { label: "Incidents" },
    ],
  },
  {
    section: "SYSTEM", icon: ListChecks, label: "Queue Monitoring",
    children: [
      { label: "Job Queues" }, { label: "Failed Jobs", badge: 11 }, { label: "Retry Jobs" },
      { label: "Metrics" }, { label: "Throughput" }, { label: "Delays" },
    ],
  },
  {
    section: "SYSTEM", icon: History, label: "Audit Center",
    children: [
      { label: "User Audit" }, { label: "Financial Audit" }, { label: "Trading Audit" },
      { label: "Admin Audit" }, { label: "Auth Audit" }, { label: "API Audit" },
      { label: "Export Reports" }, { label: "Immutable History" },
    ],
  },
  {
    section: "SYSTEM", icon: Settings, label: "System Configuration",
    children: [
      { label: "Feature Flags" }, { label: "Trading Limits" }, { label: "Deposit Limits" },
      { label: "Withdrawal Limits" }, { label: "KYC Settings" }, { label: "Password Policy" },
      { label: "Session Policy" }, { label: "Notifications" }, { label: "Market Settings" },
      { label: "Maintenance Mode" },
    ],
  },
  {
    section: "SYSTEM", icon: Plug, label: "APIs & Integrations",
    children: [
      { label: "Broker Integration" }, { label: "Market Data" }, { label: "Payment Gateways" },
      { label: "SMS Providers" }, { label: "Email Providers" }, { label: "Push Providers" },
      { label: "API Keys" }, { label: "Webhooks" },
    ],
  },
  {
    section: "SYSTEM", icon: DatabaseBackup, label: "Backup & Recovery",
    children: [
      { label: "Backup History" }, { label: "Manual Backup" }, { label: "Restore Points" },
      { label: "DR Status" }, { label: "Backup Verification" },
    ],
  },
];

const sectionOrder = ["OVERVIEW", "CLIENTS", "MARKETS", "FINANCE", "ENGAGEMENT", "INSIGHTS", "RISK", "ACCESS", "SYSTEM"];

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

const allocation = [
  { name: "Equities", value: 62, color: "oklch(0.42 0.09 155)" },
  { name: "Bonds", value: 18, color: "oklch(0.62 0.14 150)" },
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
  const [open, setOpen] = useState<Record<string, boolean>>({ "User Management": true });
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar open={open} setOpen={setOpen} />
      <main className="flex-1 min-w-0">
        <Topbar />
        <div className="px-8 pb-10 space-y-6">
          <PageHeader />
          <KpiGrid />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <VolumeCard />
            <SystemHealthCard />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <RevenueCard />
            <AllocationCard />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <ApprovalsCard />
            <AlertsCard />
          </div>
          <OperationsStrip />
        </div>
      </main>
    </div>
  );
}

function Sidebar({
  open,
  setOpen,
}: {
  open: Record<string, boolean>;
  setOpen: (v: Record<string, boolean>) => void;
}) {
  return (
    <aside className="w-72 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-pine-soft/20 flex items-center justify-center">
          <Trees className="w-5 h-5 text-pine-soft" />
        </div>
        <div>
          <div className="font-bold text-[15px] leading-tight text-white">Pine</div>
          <div className="text-[10px] tracking-[0.15em] opacity-70">BROKER ADMIN</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {sectionOrder.map((section) => {
          const items = nav.filter((n) => n.section === section);
          if (!items.length) return null;
          return (
            <div key={section}>
              <div className="px-3 pb-1.5 text-[10px] font-semibold tracking-[0.15em] opacity-60">
                {section}
              </div>
              <ul className="space-y-0.5">
                {items.map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    isOpen={!!open[item.label]}
                    onToggle={() => setOpen({ ...open, [item.label]: !open[item.label] })}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent">
          <div className="w-9 h-9 rounded-full bg-pine-soft/30 flex items-center justify-center">
            <CircleUser className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-white truncate">Muhammad Irfan</div>
            <div className="text-[11px] opacity-70 truncate">Super Admin</div>
          </div>
          <ChevronDown className="w-4 h-4 opacity-60" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item, isOpen, onToggle }: { item: NavGroup; isOpen: boolean; onToggle: () => void }) {
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;
  return (
    <li>
      <button
        onClick={hasChildren ? onToggle : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
          item.active
            ? "bg-pine-soft/20 text-white font-medium"
            : "hover:bg-sidebar-accent"
        }`}
      >
        <Icon className={`w-4 h-4 ${item.active ? "text-pine-soft" : "opacity-80"}`} />
        <span className="flex-1 text-left truncate">{item.label}</span>
        {item.badge != null && (
          <span className="text-[10px] font-semibold bg-pine-soft/30 text-white px-1.5 py-0.5 rounded">
            {item.badge}
          </span>
        )}
        {hasChildren &&
          (isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          ))}
      </button>
      {hasChildren && isOpen && (
        <ul className="mt-1 ml-7 border-l border-sidebar-border pl-3 space-y-0.5">
          {item.children!.map((c) => (
            <li key={c.label}>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] opacity-80 hover:opacity-100 hover:bg-sidebar-accent text-left">
                <span className="flex-1 truncate">{c.label}</span>
                {c.badge != null && (
                  <span className="text-[10px] font-medium bg-sidebar-accent text-white px-1.5 rounded">
                    {c.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Topbar() {
  return (
    <header className="flex items-center gap-4 px-8 py-4 border-b border-border bg-background sticky top-0 z-10">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Control Tower</div>
        <div className="text-lg font-semibold">Executive Dashboard</div>
      </div>
      <div className="flex-1 max-w-xl mx-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users, orders, tickets, ledger…"
            className="w-full h-10 pl-11 pr-4 rounded-lg bg-muted/60 border border-transparent focus:outline-none focus:border-pine/40 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:bg-muted/40">
          <Clock className="w-4 h-4" /> Last 24h
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-pine text-primary-foreground text-sm hover:opacity-95">
          <Download className="w-4 h-4" /> Export report
        </button>
        <button className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center relative">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 pt-6">
      <div>
        <h1 className="text-2xl font-semibold">Platform overview</h1>
        <p className="text-sm text-muted-foreground">Realtime health, liquidity and risk across the brokerage.</p>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <StatusPill tone="pine" label="Markets open" />
        <StatusPill tone="amber" label="Settlement T+2 · 14 pending" />
        <StatusPill tone="rose" label="7 risk alerts" />
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
      <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
      {label}
    </span>
  );
}

function KpiGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <Kpi icon={Users} label="Registered users" value="184,203" delta="+2.4%" trend="up" sub="12,842 active today" />
      <Kpi icon={UserCheck} label="Verified users" value="128,591" delta="69.8%" trend="up" sub="27 KYC pending" />
      <Kpi icon={Briefcase} label="Trading accounts" value="96,412" delta="+1.1%" trend="up" sub="AUM MWK 812.4B" />
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
                <stop offset="0%" stopColor="oklch(0.42 0.09 155)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="oklch(0.42 0.09 155)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(0.92 0.008 150)" vertical={false} />
            <XAxis dataKey="h" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "oklch(0.5 0.02 160)" }} interval={2} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "oklch(0.5 0.02 160)" }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.008 150)", fontSize: 12 }} />
            <Area type="monotone" dataKey="volume" stroke="oklch(0.42 0.09 155)" strokeWidth={2} fill="url(#gv)" />
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
    <Card title="Deposits, withdrawals & revenue" subtitle="Last 14 days · MWK millions" className="xl:col-span-2">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="oklch(0.92 0.008 150)" vertical={false} />
            <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "oklch(0.5 0.02 160)" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "oklch(0.5 0.02 160)" }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.008 150)", fontSize: 12 }} />
            <Bar dataKey="deposits" fill="oklch(0.42 0.09 155)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="withdrawals" fill="oklch(0.62 0.14 150)" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="revenue" stroke="oklch(0.72 0.15 75)" strokeWidth={2} dot={false} />
          </BarChart>
        </ResponsiveContainer>
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

function Card({
  title, subtitle, children, className = "", action,
}: {
  title: string; subtitle?: string; children: React.ReactNode;
  className?: string; action?: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl bg-card border border-border p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
