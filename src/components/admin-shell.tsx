import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, ShieldCheck, FileCheck2, CandlestickChart, Briefcase,
  Wallet, BookOpen, CreditCard, Building2, LineChart as LineChartIcon, Newspaper,
  Bell, Star, BarChart3, Headphones, AlertTriangle, Scale, KeyRound, UserCog,
  Activity, ListChecks, History, Settings, Plug, DatabaseBackup,
  ChevronDown, ChevronRight, Search, Download, Trees, CircleUser, Clock,
} from "lucide-react";

export type NavChild = { label: string; href?: string; badge?: string | number };
export type NavGroup = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  section: string;
  badge?: string | number;
  children?: NavChild[];
};

export const nav: NavGroup[] = [
  { section: "OVERVIEW", icon: LayoutDashboard, label: "Executive Dashboard", href: "/" },
  {
    section: "CLIENTS", icon: Users, label: "User Management", href: "/users", badge: 12,
    children: [
      { label: "All Users", href: "/users" }, { label: "Advanced Filters", href: "/users?tab=filters" },
      { label: "Frozen Accounts", href: "/users?tab=frozen", badge: 4 },
      { label: "Suspended", href: "/users?tab=suspended", badge: 2 },
      { label: "Closed", href: "/users?tab=closed" }, { label: "Login History", href: "/users?tab=logins" },
      { label: "Trusted Devices", href: "/users?tab=devices" }, { label: "Linked Banks", href: "/users?tab=banks" },
      { label: "Linked Mobile Money", href: "/users?tab=momo" }, { label: "Activity Timeline", href: "/users?tab=activity" },
      { label: "Export" },
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

export const sectionOrder = ["OVERVIEW", "CLIENTS", "MARKETS", "FINANCE", "ENGAGEMENT", "INSIGHTS", "RISK", "ACCESS", "SYSTEM"];

export function AdminShell({
  activeLabel,
  eyebrow,
  title,
  children,
}: {
  activeLabel: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({ [activeLabel]: true });
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar open={open} setOpen={setOpen} activeLabel={activeLabel} />
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <Topbar eyebrow={eyebrow} title={title} />
        <div className="flex-1 min-h-0 overflow-y-auto px-8 pb-10 space-y-6">{children}</div>
      </main>
    </div>
  );
}

function Sidebar({
  open, setOpen, activeLabel,
}: {
  open: Record<string, boolean>;
  setOpen: (v: Record<string, boolean>) => void;
  activeLabel: string;
}) {
  return (
    <aside className="w-72 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-sidebar-border">
        <div className="w-9 h-9 flex items-center justify-center">
          <img src="/logo.png" alt="Pine logo" className="w-9 h-9 object-contain" />
        </div>
        <div>
          <div className="font-bold text-[15px] leading-tight text-white">Pine</div>
          <div className="text-[10px] tracking-[0.15em] opacity-70">BROKER ADMIN</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 space-y-4">
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
                    active={item.label === activeLabel}
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
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
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

function NavItem({
  item, active, isOpen, onToggle,
}: {
  item: NavGroup; active: boolean; isOpen: boolean; onToggle: () => void;
}) {
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;
  const cls = `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
    active ? "bg-white/10 text-white font-medium" : "hover:bg-sidebar-accent"
  }`;
  const inner = (
    <>
      <Icon className={`w-4 h-4 ${active ? "text-pine-soft" : "opacity-80"}`} />
      <span className="flex-1 text-left truncate">{item.label}</span>
      {item.badge != null && (
        <span className="text-[10px] font-semibold bg-pine-soft/30 text-white px-1.5 py-0.5 rounded">
          {item.badge}
        </span>
      )}
      {hasChildren && (isOpen
        ? <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        : <ChevronRight className="w-3.5 h-3.5 opacity-60" />)}
    </>
  );
  return (
    <li>
      {hasChildren ? (
        <button onClick={onToggle} className={cls}>{inner}</button>
      ) : item.href ? (
        <Link to={item.href} className={cls}>{inner}</Link>
      ) : (
        <button className={cls}>{inner}</button>
      )}
      {hasChildren && isOpen && (
        <ul className="mt-1 ml-7 border-l border-sidebar-border pl-3 space-y-0.5">
          {item.children!.map((c) => {
            const childCls = "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] opacity-80 hover:opacity-100 hover:bg-sidebar-accent text-left";
            const childInner = (
              <>
                <span className="flex-1 truncate">{c.label}</span>
                {c.badge != null && (
                  <span className="text-[10px] font-medium bg-sidebar-accent text-white px-1.5 rounded">
                    {c.badge}
                  </span>
                )}
              </>
            );
            return (
              <li key={c.label}>
                {c.href ? (
                  <Link to={c.href} className={childCls}>{childInner}</Link>
                ) : (
                  <button className={childCls}>{childInner}</button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function Topbar({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="flex items-center gap-4 px-8 py-4 border-b border-border bg-background sticky top-0 z-10">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{eyebrow}</div>
        <div className="text-lg font-semibold">{title}</div>
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
          <Download className="w-4 h-4" /> Export
        </button>
        <button className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center relative">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
}

export function Card({
  title, subtitle, children, className = "", action,
}: {
  title?: string; subtitle?: string; children: ReactNode;
  className?: string; action?: ReactNode;
}) {
  return (
    <div className={`rounded-2xl bg-card border border-border p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="font-semibold">{title}</h3>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
