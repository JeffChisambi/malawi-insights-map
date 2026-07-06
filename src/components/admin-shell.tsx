import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, ShieldCheck, FileCheck2, CandlestickChart, Briefcase,
  Wallet, BookOpen, CreditCard, Building2, LineChart as LineChartIcon, Newspaper,
  Bell, Star, BarChart3, Headphones, AlertTriangle, Scale, KeyRound, UserCog,
  Activity, ListChecks, History, Settings, Plug, DatabaseBackup,
  ChevronDown, ChevronRight, ChevronLeft, Search, Download, CircleUser, Clock,
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
  { section: "OVERVIEW", icon: LayoutDashboard, label: "Overview", href: "/" },
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
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(window.localStorage.getItem("pine-sidebar-collapsed") === "1");
  }, []);
  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("pine-sidebar-collapsed", next ? "1" : "0");
      }
      return next;
    });
  };
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar open={open} setOpen={setOpen} activeLabel={activeLabel} collapsed={collapsed} onToggleCollapse={toggleCollapse} />
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <Topbar eyebrow={eyebrow} title={title} />
        <div className="flex-1 min-h-0 overflow-y-auto px-8 pb-10 space-y-6 scrollbar-thin-gray">{children}</div>
      </main>
    </div>
  );
}

function Sidebar({
  open, setOpen, activeLabel, collapsed, onToggleCollapse,
}: {
  open: Record<string, boolean>;
  setOpen: (v: Record<string, boolean>) => void;
  activeLabel: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  return (
    <aside
      className="relative shrink-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border rounded-tr-[28px] transition-all duration-300 ease-in-out overflow-visible"
      style={{ width: collapsed ? "4.5rem" : "17rem" }}
    >
      {/* Floating collapse toggle — overlaps the top-right corner */}
      <button
        onClick={onToggleCollapse}
        className="absolute top-3 -right-4 z-20 w-8 h-8 rounded-full bg-gray-100 border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed
          ? <ChevronRight className="w-3.5 h-3.5" />
          : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Header */}
      <div className="relative z-10 flex items-center h-16 px-4 shrink-0 border-b border-sidebar-border">
        <div className="w-8 h-8 shrink-0 flex items-center justify-center">
          <img src="/logo.png" alt="Pine" className="w-8 h-8 object-contain" />
        </div>
        {!collapsed && (
          <div className="ml-3 flex-1 min-w-0">
            <div className="text-[15px] font-bold text-gray-900 leading-none">Pine</div>
            <div className="text-[9px] tracking-[0.18em] text-gray-400 mt-0.5">BROKER ADMIN</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-2">
        {sectionOrder.map((section) => {
          const items = nav.filter((n) => n.section === section);
          if (!items.length) return null;
          return (
            <div key={section} className="mb-1">
              <div className={`flex items-center px-4 py-1.5 ${collapsed ? "justify-center" : ""}`}>
                {collapsed
                  ? <div className="w-6 border-t border-gray-200" />
                  : <span className="text-[9px] font-semibold tracking-[0.14em] text-gray-400">{section}</span>}
              </div>
              <ul className="px-2 space-y-px">
                {items.map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    active={item.label === activeLabel}
                    isOpen={!!open[item.label]}
                    onToggle={() => setOpen({ ...open, [item.label]: !open[item.label] })}
                    collapsed={collapsed}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <div className={`flex items-center rounded-xl px-2 py-2 hover:bg-gray-100 cursor-pointer transition-colors ${collapsed ? "justify-center" : "gap-2.5"}`}>
          <div className="w-8 h-8 shrink-0 rounded-full bg-gray-100 flex items-center justify-center ring-1 ring-gray-200">
            <CircleUser className="w-4 h-4 text-gray-500" />
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-gray-800 leading-none truncate">Prince Chitseka</div>
                <div className="text-[9px] tracking-[0.1em] text-gray-400 mt-0.5 truncate">SUPER ADMIN</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  item, active, isOpen, onToggle, collapsed,
}: {
  item: NavGroup; active: boolean; isOpen: boolean; onToggle: () => void; collapsed: boolean;
}) {
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;
  const liRef = useRef<HTMLLIElement>(null);
  const [flyoutTop, setFlyoutTop] = useState<number | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHide = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };
  const scheduleHide = () => {
    cancelHide();
    hideTimeoutRef.current = setTimeout(() => setFlyoutTop(null), 250);
  };

  /* ── Collapsed: icon only + portal flyout (escapes overflow-y:auto) ── */
  if (collapsed) {
    const cls = `relative w-full flex items-center justify-center p-2.5 rounded-lg transition-colors ${
      active ? "bg-pine/10" : "hover:bg-gray-100"
    }`;

    const flyout = flyoutTop !== null
      ? createPortal(
          <div
            className="fixed z-[200] pl-2"
            style={{ top: flyoutTop, left: "4.5rem" }}
            onMouseEnter={cancelHide}
            onMouseLeave={scheduleHide}
          >
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 min-w-[192px] overflow-hidden">
              {/* Header */}
              <div className={`px-3.5 py-2.5 flex items-center gap-2.5 border-b ${active ? "border-pine/20 bg-pine/5" : "border-gray-100"}`}>
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${active ? "bg-pine/15" : "bg-gray-100"}`}>
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-pine" : "text-gray-500"}`} />
                </div>
                <span className={`text-[12px] font-semibold leading-none ${active ? "text-pine" : "text-gray-800"}`}>
                  {item.label}
                </span>
                {item.badge != null && (
                  <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-pine/10 text-pine leading-none shrink-0">
                    {item.badge}
                  </span>
                )}
              </div>
              {/* Children */}
              {hasChildren ? (
                <ul className="py-1 max-h-72 overflow-y-auto scrollbar-thin-gray">
                  {item.children!.map((c) => {
                    const rowCls = "w-full flex items-center gap-2 px-3.5 py-[7px] text-[12px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors text-left";
                    const row = (
                      <>
                        <span className="flex-1 truncate">{c.label}</span>
                        {c.badge != null && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-pine/10 text-pine leading-none shrink-0">
                            {c.badge}
                          </span>
                        )}
                      </>
                    );
                    return (
                      <li key={c.label}>
                        {c.href
                          ? <Link to={c.href} className={rowCls}>{row}</Link>
                          : <button className={rowCls}>{row}</button>}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-3.5 py-2.5 text-[12px] text-gray-500">{item.label}</div>
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

    return (
      <li
        ref={liRef}
        onMouseEnter={() => {
          cancelHide();
          const rect = liRef.current?.getBoundingClientRect();
          if (rect) setFlyoutTop(rect.top);
        }}
        onMouseLeave={scheduleHide}
      >
        <div className="relative">
          {item.href ? (
            <Link to={item.href} className={cls}>
              <Icon className={`w-[18px] h-[18px] ${active ? "text-pine" : "text-gray-400"}`} />
            </Link>
          ) : (
            <button className={cls}>
              <Icon className={`w-[18px] h-[18px] ${active ? "text-pine" : "text-gray-400"}`} />
            </button>
          )}
          {item.badge != null && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-pine" />
          )}
        </div>
        {flyout}
      </li>
    );
  }

  /* ── Expanded: icon + label ── */
  const rowCls = `w-full flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13px] font-[450] transition-colors ${
    active
      ? "bg-pine/8 text-gray-900"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
  }`;

  const rowContent = (icon: React.ReactNode, label: string, badge?: string | number, chevron?: React.ReactNode) => (
    <>
      {icon}
      <span className="flex-1 text-left truncate">{label}</span>
      {badge != null && (
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none ${
          active ? "bg-pine/15 text-pine" : "bg-gray-100 text-gray-500"
        }`}>
          {badge}
        </span>
      )}
      {chevron}
    </>
  );

  return (
    <li>
      {hasChildren ? (
        <button onClick={onToggle} className={rowCls}>
          {rowContent(
            <Icon className={`w-4 h-4 shrink-0 ${active ? "text-pine" : "text-gray-400"}`} />,
            item.label,
            item.badge,
            isOpen
              ? <ChevronDown className="w-3 h-3 text-gray-300 shrink-0" />
              : <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />,
          )}
        </button>
      ) : item.href ? (
        <Link to={item.href} className={rowCls}>
          {rowContent(
            <Icon className={`w-4 h-4 shrink-0 ${active ? "text-pine" : "text-gray-400"}`} />,
            item.label,
            item.badge,
          )}
        </Link>
      ) : (
        <button className={rowCls}>
          {rowContent(
            <Icon className="w-4 h-4 shrink-0 text-gray-400" />,
            item.label,
            item.badge,
          )}
        </button>
      )}

      {/* Children with rounded-L connectors */}
      {hasChildren && isOpen && (
        <ul className="mt-1 ml-4 space-y-0.5 pb-1">
          {item.children!.map((c, idx) => {
            const isLast = idx === item.children!.length - 1;
            const childCls = "w-full flex items-center gap-2 pr-2 py-[7px] text-[12px] transition-colors text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-left";
            const childContent = (
              <>
                <span className="flex-1 truncate">{c.label}</span>
                {c.badge != null && (
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full leading-none shrink-0">
                    {c.badge}
                  </span>
                )}
              </>
            );
            return (
              <li key={c.label} className="relative pl-[26px]">
                {/* Rounded-corner L: vertical (top→mid) + horizontal arm, curved at junction */}
                <div className="pointer-events-none absolute left-[5px] top-0 h-[calc(50%+1px)] w-[14px] border-l-[1.5px] border-b-[1.5px] border-gray-200 rounded-bl-[6px]" />
                {/* Vertical extension below midpoint (connects to next sibling) */}
                {!isLast && (
                  <div className="pointer-events-none absolute left-[5px] top-1/2 bottom-0 w-[1.5px] bg-gray-200" />
                )}
                {c.href
                  ? <Link to={c.href} className={childCls}>{childContent}</Link>
                  : <button className={childCls}>{childContent}</button>}
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
    <header className="flex items-center gap-4 px-8 py-4 bg-background sticky top-0 z-10">
      <div className="shrink-0 min-w-0">
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <div className="flex-1 min-w-0 mx-6">
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
