import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  Bell, Send, Clock, CheckCircle2, XCircle, AlertTriangle,
  MoreHorizontal, ChevronDown, Users, Mail, MessageSquare,
  Megaphone, RefreshCw, FileText, Eye, Trash2, Copy,
  TrendingUp, TrendingDown, Filter, Download, Plus,
  Smartphone, Radio, LayoutTemplate, History, Zap,
} from "lucide-react";
import { AdminShell, Card } from "@/components/admin-shell";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Pine Broker Admin" },
      { name: "description", content: "Manage push, email, SMS, and broadcast notifications across all channels." },
    ],
  }),
  component: NotificationsPage,
});

/* ─────────────────────────── types ─────────────────────────── */

type Channel = "push" | "email" | "sms" | "broadcast";
type NotifStatus = "delivered" | "failed" | "scheduled" | "sending" | "draft";

type Notification = {
  id: string;
  title: string;
  body: string;
  channel: Channel;
  status: NotifStatus;
  recipients: number;
  delivered: number;
  failed: number;
  opened: number;
  scheduledAt?: string;
  sentAt?: string;
  createdBy: string;
  template?: string;
  segment: string;
};

type Template = {
  id: string;
  name: string;
  channel: Channel;
  subject?: string;
  body: string;
  usedCount: number;
  lastUsed: string;
};

/* ─────────────────────────── mock data ─────────────────────────── */

function s(i: number, mod: number) {
  return Math.abs(Math.sin(i * 9301 + 49297)) % 1 * mod;
}

const channels: Channel[] = ["push", "push", "email", "email", "sms", "broadcast"];
const statuses: NotifStatus[] = ["delivered", "delivered", "delivered", "failed", "scheduled", "sending"];
const segments = ["All Users", "Active Traders", "Tier 1 Users", "Tier 2 Users", "Inactive 30d", "New Signups", "KYC Pending"];
const creators = ["Prince C.", "Chisomo M.", "Grace P.", "James N.", "System"];
const templates = ["Market Alert", "Account Update", "Promo Offer", "Security Notice", "Dividend Notice", undefined];

const pushTitles = [
  "Market Opens in 15 Minutes", "Your order has been filled", "Dividend credited to your wallet",
  "New stock listing: Press Holdings", "Price alert: NICO +5.2%", "Withdrawal approved",
  "Security alert: new device login", "KYC approved — Tier 2 unlocked", "Markets close in 30 minutes",
  "Quarterly report available", "Trading suspended: MCB", "Portfolio milestone reached",
];
const emailTitles = [
  "Monthly Statement — June 2026", "Important: KYC Deadline", "New Feature: Portfolio Analytics",
  "Dividend Payment Notice", "Security Update Required", "Welcome to Pine — Getting Started",
  "Market Holiday Notice", "Account Activity Summary",
];
const smsTitles = [
  "OTP: 847291", "Your withdrawal of MWK 50,000 is processing", "PIN reset successful",
  "Login alert from new device", "KYC docs reminder", "Trade confirmation: 200 shares NICO",
];
const broadcastTitles = [
  "Planned maintenance: Sat 02:00–04:00", "Markets closed for Independence Day",
  "New trading hours effective Monday", "Emergency: Trading halted for system upgrade",
  "Rate change notice: withdrawal fees", "System update complete — services restored",
];

const allTitles = { push: pushTitles, email: emailTitles, sms: smsTitles, broadcast: broadcastTitles };

const notifications: Notification[] = Array.from({ length: 60 }, (_, i) => {
  const channel = channels[Math.floor(s(i + 1, channels.length))];
  const status = statuses[Math.floor(s(i + 2, statuses.length))];
  const titlePool = allTitles[channel];
  const title = titlePool[Math.floor(s(i + 3, titlePool.length))];
  const recipients = Math.round(100 + s(i + 5, 180000));
  const deliveryRate = status === "delivered" ? 0.88 + s(i + 7, 0.11) : status === "failed" ? 0 : s(i + 7, 0.6);
  const delivered = status === "delivered" ? Math.round(recipients * deliveryRate) : status === "failed" ? 0 : Math.round(recipients * deliveryRate);
  const failed = status === "failed" ? recipients : Math.round((recipients - delivered) * 0.4);
  const opened = channel !== "sms" ? Math.round(delivered * (0.15 + s(i + 9, 0.3))) : 0;
  const daysAgo = Math.floor(s(i + 11, 28));
  const hour = Math.floor(s(i + 13, 24));
  const min = Math.floor(s(i + 17, 60));
  const baseDate = new Date(2026, 5, 6 - daysAgo, hour, min);
  const futureDate = new Date(2026, 5, 6 + Math.floor(s(i + 19, 7)), hour, min);
  return {
    id: `NTF-${(10000 + i * 173).toString()}`,
    title,
    body: channel === "push"
      ? "Tap to view details in the Pine app."
      : channel === "email"
      ? "Please review this important update to your account."
      : channel === "sms"
      ? title
      : "This affects all users. Please read carefully.",
    channel,
    status,
    recipients,
    delivered,
    failed,
    opened,
    scheduledAt: status === "scheduled" ? futureDate.toISOString() : undefined,
    sentAt: status !== "scheduled" && status !== "draft" ? baseDate.toISOString() : undefined,
    createdBy: creators[Math.floor(s(i + 21, creators.length))],
    template: templates[Math.floor(s(i + 23, templates.length))] ?? undefined,
    segment: segments[Math.floor(s(i + 25, segments.length))],
  };
});

const templateData: Template[] = [
  { id: "T-01", name: "Market Alert", channel: "push", body: "{{market}} is now {{action}}. Tap to trade.", usedCount: 34, lastUsed: "2026-06-05T08:12:00Z" },
  { id: "T-02", name: "Account Update", channel: "email", subject: "Important update to your Pine account", body: "Dear {{name}},\n\nWe wanted to inform you about a recent change to your account.\n\n{{body}}\n\nRegards,\nThe Pine Team", usedCount: 18, lastUsed: "2026-06-04T14:30:00Z" },
  { id: "T-03", name: "OTP SMS", channel: "sms", body: "Your Pine OTP is {{otp}}. Valid for 5 minutes. Do not share.", usedCount: 892, lastUsed: "2026-06-06T10:45:00Z" },
  { id: "T-04", name: "Dividend Notice", channel: "email", subject: "Dividend credited to your Pine wallet", body: "Dear {{name}},\n\nA dividend of MWK {{amount}} for {{company}} has been credited to your wallet.\n\nRegards,\nThe Pine Team", usedCount: 12, lastUsed: "2026-05-28T09:00:00Z" },
  { id: "T-05", name: "Promo Offer", channel: "push", body: "🎉 {{promo_title}} — limited time only! Tap to claim.", usedCount: 7, lastUsed: "2026-05-15T11:00:00Z" },
  { id: "T-06", name: "Security Notice", channel: "broadcast", body: "PINE SECURITY NOTICE: {{message}}. For assistance, contact support.", usedCount: 3, lastUsed: "2026-04-20T06:00:00Z" },
  { id: "T-07", name: "Trade Confirmation", channel: "sms", body: "Trade confirmed: {{shares}} shares of {{symbol}} at MWK {{price}}. Ref: {{ref}}", usedCount: 441, lastUsed: "2026-06-06T12:33:00Z" },
  { id: "T-08", name: "Welcome Email", channel: "email", subject: "Welcome to Pine!", body: "Dear {{name}},\n\nWelcome to Pine, Malawi's leading broker platform. Your account is ready.\n\n{{onboarding_link}}\n\nRegards,\nThe Pine Team", usedCount: 156, lastUsed: "2026-06-06T08:05:00Z" },
];

/* ─────────────────────────── helpers ─────────────────────────── */

const NOW = Date.UTC(2026, 5, 6, 10, 0, 0); // UTC — timezone-stable for SSR/client hydration

function relativeTime(iso: string) {
  const diff = NOW - new Date(iso).getTime();
  if (diff < 0) {
    const ahead = -diff;
    const h = Math.floor(ahead / 3_600_000);
    if (h < 24) return `in ${h}h`;
    return `in ${Math.floor(h / 24)}d`;
  }
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return `${Math.floor(diff / 60000)}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function fmtNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function deliveryRate(n: Notification) {
  if (n.recipients === 0 || n.status === "draft") return null;
  if (n.status === "scheduled") return null;
  return Math.round((n.delivered / n.recipients) * 100);
}

function openRate(n: Notification) {
  if (n.delivered === 0 || n.channel === "sms") return null;
  return Math.round((n.opened / n.delivered) * 100);
}

/* ─────────────────────────── tab definitions ─────────────────────────── */

type TabKey = "all" | "push" | "email" | "sms" | "broadcast" | "scheduled" | "failed" | "templates" | "history";

type Tab = {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const primaryTabs: Tab[] = [
  { key: "all", label: "All", icon: Bell },
  { key: "push", label: "Push", icon: Smartphone },
  { key: "email", label: "Email", icon: Mail },
  { key: "sms", label: "SMS", icon: MessageSquare },
  { key: "broadcast", label: "Broadcasts", icon: Radio },
];

const moreTabs: Tab[] = [
  { key: "scheduled", label: "Scheduled", icon: Clock },
  { key: "failed", label: "Failed", icon: XCircle },
  { key: "templates", label: "Templates", icon: LayoutTemplate },
  { key: "history", label: "History", icon: History },
];

const allTabs: Tab[] = [...primaryTabs, ...moreTabs];

function filterNotifs(key: TabKey): Notification[] {
  switch (key) {
    case "push": return notifications.filter((n) => n.channel === "push");
    case "email": return notifications.filter((n) => n.channel === "email");
    case "sms": return notifications.filter((n) => n.channel === "sms");
    case "broadcast": return notifications.filter((n) => n.channel === "broadcast");
    case "scheduled": return notifications.filter((n) => n.status === "scheduled");
    case "failed": return notifications.filter((n) => n.status === "failed");
    case "history": return notifications.filter((n) => n.status === "delivered" || n.status === "failed");
    default: return notifications;
  }
}

/* ─────────────────────────── page ─────────────────────────── */

function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [compose, setCompose] = useState(false);
  const [preview, setPreview] = useState<Notification | null>(null);

  const rows = useMemo(() => filterNotifs(activeTab), [activeTab]);

  const tab = allTabs.find((t) => t.key === activeTab)!;

  return (
    <AdminShell activeLabel="Notifications" eyebrow="Engagement" title="Notifications">
      <NotifStats />

      {/* Tab bar */}
      <div className="flex items-center gap-0.5 border-b border-border -mx-8 px-8">
        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
          {primaryTabs.map((t) => {
            const count = filterNotifs(t.key).length;
            const isActive = t.key === activeTab;
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`relative flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-[13px] font-medium transition-colors shrink-0 ${
                  isActive ? "text-pine" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${isActive ? "bg-pine/10 text-pine" : "bg-muted text-muted-foreground"}`}>
                  {count}
                </span>
                {isActive && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-pine rounded-full" />}
              </button>
            );
          })}
          <MoreTabsDropdown activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="ml-auto flex items-center gap-2 py-2">
          <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted/40">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button
            onClick={() => setCompose(true)}
            className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-pine text-primary-foreground text-sm hover:bg-pine/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Send Notification
          </button>
        </div>
      </div>

      {activeTab === "templates" ? (
        <TemplatesGrid />
      ) : (
        <Card className="!p-0 overflow-hidden">
          <NotifTable rows={rows} onPreview={setPreview} />
          <div className="flex items-center justify-between px-5 py-3 border-t border-border text-xs text-muted-foreground">
            <div>Showing <span className="text-foreground font-medium">{Math.min(rows.length, 25)}</span> of {rows.length}</div>
            <div className="flex items-center gap-1">
              <button className="h-8 px-3 rounded-md border border-border hover:bg-muted/40">Previous</button>
              <button className="h-8 w-8 rounded-md bg-pine text-primary-foreground text-xs font-medium">1</button>
              {rows.length > 25 && <button className="h-8 w-8 rounded-md hover:bg-muted/40">2</button>}
              {rows.length > 50 && <button className="h-8 w-8 rounded-md hover:bg-muted/40">3</button>}
              <button className="h-8 px-3 rounded-md border border-border hover:bg-muted/40">Next</button>
            </div>
          </div>
        </Card>
      )}

      {compose && <ComposeModal onClose={() => setCompose(false)} />}
      {preview && <PreviewModal notif={preview} onClose={() => setPreview(null)} />}
    </AdminShell>
  );
}

/* ─────────────────────────── stats ─────────────────────────── */

function NotifStats() {
  const sent = notifications.filter((n) => n.status !== "draft" && n.status !== "scheduled").length;
  const delivered = notifications.filter((n) => n.status === "delivered").length;
  const failed = notifications.filter((n) => n.status === "failed").length;
  const scheduled = notifications.filter((n) => n.status === "scheduled").length;
  const totalRecipients = notifications.reduce((s, n) => s + n.recipients, 0);
  const avgDelivery = Math.round((notifications.filter((n) => n.status === "delivered").reduce((sum, n) => sum + (n.delivered / n.recipients), 0) / Math.max(delivered, 1)) * 100);

  const stats = [
    { label: "Sent (30d)", value: sent, icon: Send, tone: "pine", trend: "+12 today", up: true },
    { label: "Delivered", value: delivered, icon: CheckCircle2, tone: "pine", trend: `${avgDelivery}% rate`, up: true },
    { label: "Failed", value: failed, icon: XCircle, tone: "rose", trend: "needs retry", up: false },
    { label: "Scheduled", value: scheduled, icon: Clock, tone: "amber", trend: "upcoming", up: true },
    { label: "Total Recipients", value: fmtNum(totalRecipients), icon: Users, tone: "pine", trend: "across all", up: true },
    { label: "Avg Delivery Rate", value: `${avgDelivery}%`, icon: Zap, tone: "pine", trend: "+2% vs last mo.", up: true },
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 pt-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const Trend = stat.up ? TrendingUp : TrendingDown;
        return (
          <div key={stat.label} className="rounded-xl bg-card border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 flex items-center justify-center">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${stat.up ? "text-pine" : "text-rose"}`}>
                <Trend className="w-3 h-3" /> {stat.trend}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-2xl font-bold mt-0.5">{stat.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────── more tabs dropdown ─────────────────────────── */

function MoreTabsDropdown({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKey;
  setActiveTab: (v: TabKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const activeMoreTab = moreTabs.find((t) => t.key === activeTab);

  return (
    <div ref={ref} className="relative ml-0.5 shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`relative flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-[13px] font-medium transition-colors ${
          activeMoreTab ? "text-pine" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Filter className="w-3.5 h-3.5" />
        {activeMoreTab ? activeMoreTab.label : "More"}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        {activeMoreTab && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-pine rounded-full" />}
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 min-w-[11rem] rounded-xl border border-border bg-card shadow-lg py-1 overflow-hidden">
          {moreTabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.key === activeTab;
            const count = t.key === "templates" ? templateData.length : filterNotifs(t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => { setActiveTab(t.key); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  isActive ? "bg-pine/10 text-pine font-medium" : "text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="flex-1 text-left">{t.label}</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${isActive ? "bg-pine/10 text-pine" : "bg-muted text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── table ─────────────────────────── */

function NotifTable({ rows, onPreview }: { rows: Notification[]; onPreview: (n: Notification) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/30">
            <th className="pl-5 py-2.5 text-left font-medium w-10">#</th>
            <th className="py-2.5 text-left font-medium">Notification</th>
            <th className="py-2.5 text-left font-medium">Channel</th>
            <th className="py-2.5 text-left font-medium">Status</th>
            <th className="py-2.5 text-left font-medium">Recipients</th>
            <th className="py-2.5 text-left font-medium">Delivery</th>
            <th className="py-2.5 text-left font-medium">Open Rate</th>
            <th className="py-2.5 text-left font-medium">Segment</th>
            <th className="py-2.5 text-left font-medium">Sent / Scheduled</th>
            <th className="pr-5 py-2.5"></th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 25).map((n, idx) => (
            <NotifRow key={n.id} notif={n} idx={idx + 1} onPreview={onPreview} />
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={10} className="py-16 text-center text-sm text-muted-foreground">
                No notifications match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function NotifRow({ notif: n, idx, onPreview }: { notif: Notification; idx: number; onPreview: (n: Notification) => void }) {
  const dr = deliveryRate(n);
  const or = openRate(n);
  const timeIso = n.scheduledAt ?? n.sentAt;

  return (
    <tr
      className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
      onClick={() => onPreview(n)}
    >
      <td className="pl-5 py-3 text-[11px] text-muted-foreground font-mono">{idx}</td>
      <td className="py-3 max-w-[220px]">
        <div className="font-medium text-[13px] truncate">{n.title}</div>
        {n.template && (
          <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
            <LayoutTemplate className="w-3 h-3" /> {n.template}
          </div>
        )}
      </td>
      <td className="py-3">
        <ChannelBadge channel={n.channel} />
      </td>
      <td className="py-3">
        <StatusBadge status={n.status} />
      </td>
      <td className="py-3 text-[13px] font-medium tabular-nums">{fmtNum(n.recipients)}</td>
      <td className="py-3">
        {dr !== null ? <DeliveryBar value={dr} /> : <span className="text-[11px] text-muted-foreground">—</span>}
      </td>
      <td className="py-3">
        {or !== null ? (
          <span className={`text-[12px] font-medium tabular-nums ${or >= 20 ? "text-pine" : or >= 10 ? "text-amber" : "text-muted-foreground"}`}>
            {or}%
          </span>
        ) : (
          <span className="text-[11px] text-muted-foreground">—</span>
        )}
      </td>
      <td className="py-3 text-[12px] text-muted-foreground max-w-[110px] truncate">{n.segment}</td>
      <td className="py-3 text-[12px] text-muted-foreground whitespace-nowrap">
        {timeIso ? relativeTime(timeIso) : "—"}
      </td>
      <td className="pr-5 py-3" onClick={(e) => e.stopPropagation()}>
        <RowMenu notif={n} onPreview={() => onPreview(n)} />
      </td>
    </tr>
  );
}

/* ─────────────────────────── badges ─────────────────────────── */

const channelConfig: Record<Channel, { icon: React.ComponentType<{ className?: string }>; label: string; cls: string }> = {
  push: { icon: Smartphone, label: "Push", cls: "bg-blue-500/10 text-blue-500" },
  email: { icon: Mail, label: "Email", cls: "bg-violet-500/10 text-violet-500" },
  sms: { icon: MessageSquare, label: "SMS", cls: "bg-amber/10 text-amber" },
  broadcast: { icon: Megaphone, label: "Broadcast", cls: "bg-pine/10 text-pine" },
};

function ChannelBadge({ channel }: { channel: Channel }) {
  const cfg = channelConfig[channel];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${cfg.cls}`}>
      <Icon className="w-3 h-3" /> {cfg.label}
    </span>
  );
}

const statusConfig: Record<NotifStatus, { label: string; cls: string; dot: string }> = {
  delivered: { label: "Delivered", cls: "bg-pine/10 text-pine", dot: "bg-pine" },
  failed: { label: "Failed", cls: "bg-rose/10 text-rose", dot: "bg-rose" },
  scheduled: { label: "Scheduled", cls: "bg-amber/10 text-amber", dot: "bg-amber" },
  sending: { label: "Sending…", cls: "bg-blue-500/10 text-blue-500", dot: "bg-blue-500 animate-pulse" },
  draft: { label: "Draft", cls: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
};

function StatusBadge({ status }: { status: NotifStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${cfg.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} /> {cfg.label}
    </span>
  );
}

function DeliveryBar({ value }: { value: number }) {
  const color = value >= 85 ? "bg-pine" : value >= 60 ? "bg-amber" : "bg-rose";
  const textColor = value >= 85 ? "text-pine" : value >= 60 ? "text-amber" : "text-rose";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-[11px] font-medium tabular-nums ${textColor}`}>{value}%</span>
    </div>
  );
}

/* ─────────────────────────── row menu ─────────────────────────── */

function RowMenu({ notif, onPreview }: { notif: Notification; onPreview: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const items = [
    { label: "Preview", icon: Eye, action: onPreview },
    { label: "Duplicate", icon: Copy, action: () => {} },
    ...(notif.status === "failed" ? [{ label: "Retry Failed", icon: RefreshCw, action: () => {} }] : []),
    ...(notif.status === "scheduled" ? [{ label: "Cancel Schedule", icon: XCircle, tone: "rose" as const, action: () => {} }] : []),
    { label: "Delete", icon: Trash2, tone: "rose" as const, action: () => {} },
  ];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 rounded-md hover:bg-muted/60 inline-flex items-center justify-center"
      >
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-44 rounded-xl border border-border bg-card shadow-lg py-1 overflow-hidden">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.label}
                onClick={() => { it.action(); setOpen(false); }}
                className={`w-full text-left px-3.5 py-2 text-sm flex items-center gap-2.5 transition-colors ${
                  it.tone === "rose"
                    ? "text-rose hover:bg-rose/10"
                    : "text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground" /> {it.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── templates grid ─────────────────────────── */

function TemplatesGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{templateData.length} templates available</p>
        <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-pine text-primary-foreground text-sm hover:bg-pine/90 transition-colors">
          <Plus className="w-3.5 h-3.5" /> New Template
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {templateData.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template: t }: { template: Template }) {
  const cfg = channelConfig[t.channel];
  const Icon = cfg.icon;
  return (
    <div className="rounded-2xl bg-card border border-border p-5 hover:border-pine/40 transition-colors group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <div className="font-semibold text-[13px]">{t.name}</div>
            <ChannelBadge channel={t.channel} />
          </div>
        </div>
        <button className="w-8 h-8 rounded-md hover:bg-muted/60 inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      {t.subject && (
        <div className="text-[11px] text-muted-foreground mb-1 font-medium truncate">Subject: {t.subject}</div>
      )}
      <p className="text-[12px] text-muted-foreground line-clamp-2 font-mono bg-muted/40 rounded-lg px-3 py-2">
        {t.body}
      </p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><Send className="w-3 h-3" /> Used {t.usedCount}×</span>
          <span>{relativeTime(t.lastUsed)}</span>
        </div>
        <button className="h-7 px-2.5 rounded-lg border border-border text-[11px] text-muted-foreground hover:bg-muted/40 flex items-center gap-1 transition-colors">
          <Copy className="w-3 h-3" /> Use
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── preview modal ─────────────────────────── */

function PreviewModal({ notif: n, onClose }: { notif: Notification; onClose: () => void }) {
  const dr = deliveryRate(n);
  const or = openRate(n);
  const cfg = channelConfig[n.channel];
  const Icon = cfg.icon;

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col" style={{ maxHeight: "88vh" }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border shrink-0">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Icon className="w-4.5 h-4.5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{n.title}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <ChannelBadge channel={n.channel} />
              <StatusBadge status={n.status} />
              <span className="text-[11px] text-muted-foreground font-mono">{n.id}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground ml-1 shrink-0">
            <XCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">

          {/* Message preview */}
          <Card title="Message">
            <div className="space-y-1.5">
              <div className="text-[13px] font-medium">{n.title}</div>
              <p className="text-sm text-muted-foreground">{n.body}</p>
            </div>
          </Card>

          {/* Delivery stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Recipients", value: fmtNum(n.recipients), icon: Users },
              { label: "Delivered", value: dr !== null ? `${dr}%` : "—", icon: CheckCircle2 },
              { label: "Failed", value: fmtNum(n.failed), icon: XCircle },
              { label: "Opened", value: or !== null ? `${or}%` : "N/A", icon: Eye },
            ].map(({ label, value, icon: StatIcon }) => (
              <div key={label} className="rounded-xl bg-muted/40 border border-border p-3">
                <StatIcon className="w-4 h-4 text-muted-foreground mb-2" />
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="text-lg font-bold mt-0.5">{value}</div>
              </div>
            ))}
          </div>

          {/* Meta */}
          <Card title="Details">
            <div className="space-y-2.5">
              {[
                { label: "Segment", value: n.segment },
                { label: "Created by", value: n.createdBy },
                { label: "Template", value: n.template ?? "None" },
                { label: "Sent", value: n.sentAt ? relativeTime(n.sentAt) : "—" },
                { label: "Scheduled", value: n.scheduledAt ? relativeTime(n.scheduledAt) : "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border shrink-0 gap-3">
          {n.status === "failed" && (
            <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted/40">
              <RefreshCw className="w-3.5 h-3.5" /> Retry Failed
            </button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted/40">
              <Copy className="w-3.5 h-3.5" /> Duplicate
            </button>
            <button onClick={onClose} className="h-9 px-4 rounded-lg bg-pine text-primary-foreground text-sm hover:bg-pine/90 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── compose modal ─────────────────────────── */

function ComposeModal({ onClose }: { onClose: () => void }) {
  const [channel, setChannel] = useState<Channel>("push");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [segment, setSegment] = useState("All Users");
  const [schedule, setSchedule] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col" style={{ maxHeight: "90vh" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div>
            <div className="font-semibold">Send Notification</div>
            <div className="text-xs text-muted-foreground mt-0.5">Compose and send to a user segment</div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground">
            <XCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">

          {/* Channel picker */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Channel</label>
            <div className="grid grid-cols-4 gap-2">
              {(["push", "email", "sms", "broadcast"] as Channel[]).map((ch) => {
                const cfg = channelConfig[ch];
                const ChIcon = cfg.icon;
                return (
                  <button
                    key={ch}
                    onClick={() => setChannel(ch)}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-[12px] font-medium transition-colors ${
                      channel === ch
                        ? "border-pine/50 bg-pine/5 text-pine"
                        : "border-border text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    <ChIcon className="w-4 h-4" />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Segment */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Segment</label>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-pine/40"
            >
              {segments.map((seg) => <option key={seg}>{seg}</option>)}
            </select>
          </div>

          {/* Title (push/email only) */}
          {channel !== "sms" && (
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                {channel === "email" ? "Subject" : "Title"}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={channel === "email" ? "Email subject line…" : "Notification title…"}
                className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-pine/40"
              />
            </div>
          )}

          {/* Body */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={channel === "email" ? 6 : 3}
              placeholder="Write your message…"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-pine/40 resize-none"
            />
            {channel === "sms" && (
              <div className="text-[11px] text-muted-foreground mt-1 text-right">{body.length}/160 chars</div>
            )}
          </div>

          {/* Schedule toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
            <div>
              <div className="text-sm font-medium">Schedule for later</div>
              <div className="text-xs text-muted-foreground mt-0.5">Set a future date and time to send</div>
            </div>
            <button
              onClick={() => setSchedule((s) => !s)}
              className={`relative w-10 h-5.5 rounded-full transition-colors ${schedule ? "bg-pine" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${schedule ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {schedule && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Date</label>
                <input type="date" className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-pine/40" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Time</label>
                <input type="time" className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-pine/40" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border shrink-0 gap-3">
          <button onClick={onClose} className="h-9 px-4 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted/40">
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted/40 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Save Draft
            </button>
            <button
              className="h-9 px-4 rounded-lg bg-pine text-primary-foreground text-sm hover:bg-pine/90 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              disabled={!body.trim()}
            >
              {schedule ? <Clock className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              {schedule ? "Schedule" : "Send Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
