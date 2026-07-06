import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Pine Broker Admin" },
      { name: "description", content: "Sign in to the Pine broker administration portal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    // Simulate auth — navigate to dashboard
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-background">

      {/* ── Left: brand panel ── */}
      <div className="hidden lg:flex lg:w-[46%] flex-col bg-[#45B369] relative overflow-hidden">

        {/* Subtle circle decorations */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[380px] h-[380px] rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-14 py-12">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="Pine" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none">Pine</div>
              <div className="text-white/60 text-[9px] tracking-[0.2em] mt-0.5">BROKER ADMIN</div>
            </div>
          </div>

          {/* Tagline — vertically centred */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-white text-[2.4rem] font-bold leading-tight tracking-tight">
              The control tower<br />for your brokerage.
            </h1>
            <p className="text-white/70 text-[15px] mt-4 leading-relaxed max-w-xs">
              Manage users, trades, compliance, and operations — all from one secure platform.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {["KYC Verification", "Trade Monitoring", "AML Alerts", "Ledger & Reporting"].map((f) => (
                <span
                  key={f}
                  className="text-[12px] font-medium text-white/90 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom note */}
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secured with end-to-end encryption · Admin access only
          </div>
        </div>
      </div>

      {/* ── Right: form panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <img src="/logo.png" alt="Pine" className="w-8 h-8 object-contain" />
            <div>
              <div className="font-bold text-[15px] leading-none">Pine</div>
              <div className="text-[9px] tracking-[0.18em] text-muted-foreground mt-0.5">BROKER ADMIN</div>
            </div>
          </div>

          <h2 className="text-[22px] font-bold text-foreground">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your admin account</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">

            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium text-foreground mb-1.5">
                Email address
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@pinebroker.com"
                className="w-full h-10 px-3.5 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-pine/30 focus:border-pine/60 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-medium text-foreground">Password</label>
                <button
                  type="button"
                  className="text-[12px] text-pine hover:text-pine/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-3.5 pr-10 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-pine/30 focus:border-pine/60 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[13px] text-rose bg-rose/8 border border-rose/20 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-pine text-white text-sm font-semibold hover:bg-pine/90 active:bg-pine/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[12px] text-muted-foreground">
            Authorised personnel only.{" "}
            <Link to="/" className="text-pine hover:underline">
              Back to dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
