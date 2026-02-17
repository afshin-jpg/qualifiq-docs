import { useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown, ChevronRight, LayoutDashboard, Users, Megaphone, FileText, Calendar, Settings, LogOut, Filter, CheckCircle, Star, Mail, ArrowUpRight, ArrowDownRight, Clock, Eye, UserPlus, Send, Upload, Shield, FileSignature, TrendingUp, Zap, Target, Award, BarChart3, PieChart, Activity, Globe, Sparkles, Play, X, Check, AlertCircle, ChevronLeft, User, Building2, Briefcase, Lock, Unlock, Video, CreditCard, Phone, MessageSquare, Download, MoreVertical, Plus, ExternalLink, RefreshCw, Flame, Heart } from "lucide-react";

// ─── Design Tokens ───
const T = {
  bg: "#0A0A0F",
  surface: "#111118",
  surface2: "#1A1A24",
  surface3: "#222230",
  border: "#2A2A3A",
  borderHover: "#3A3A50",
  text: "#F0F0F5",
  textDim: "#9090A8",
  textMuted: "#606078",
  // Vibrant palette
  electric: "#6C5CE7",
  electricGlow: "rgba(108,92,231,0.3)",
  neon: "#00F5D4",
  neonGlow: "rgba(0,245,212,0.25)",
  hot: "#FF6B6B",
  hotGlow: "rgba(255,107,107,0.25)",
  amber: "#FFD93D",
  amberGlow: "rgba(255,217,61,0.2)",
  cyan: "#4ECDC4",
  blue: "#0984E3",
  pink: "#FD79A8",
  lime: "#00B894",
  gradient1: "linear-gradient(135deg, #6C5CE7, #a855f7, #FD79A8)",
  gradient2: "linear-gradient(135deg, #00F5D4, #4ECDC4, #0984E3)",
  gradient3: "linear-gradient(135deg, #FF6B6B, #FD79A8, #a855f7)",
  gradient4: "linear-gradient(135deg, #FFD93D, #FF6B6B)",
};

const roleColors = {
  franchisor: { primary: "#6C5CE7", gradient: "linear-gradient(135deg, #6C5CE7, #a855f7)", label: "Franchisor", icon: "🏢" },
  agency: { primary: "#00F5D4", gradient: "linear-gradient(135deg, #00F5D4, #4ECDC4)", label: "Agency (Broker)", icon: "🤝" },
  franchisee: { primary: "#FF6B6B", gradient: "linear-gradient(135deg, #FF6B6B, #FD79A8)", label: "Franchisee / QL", icon: "👤" },
};

// ─── Mock Data ───
const mockLeads = [
  { id: 1, name: "Sarah Chen", company: "Chen Enterprises", email: "sarah@chen.co", score: 94, status: "qualified", avatar: "SC", location: "San Francisco, CA", investment: "$250K-500K", industry: "Food & Beverage" },
  { id: 2, name: "Marcus Johnson", company: "MJ Holdings", email: "marcus@mjh.com", score: 87, status: "vetted", avatar: "MJ", location: "Austin, TX", investment: "$100K-250K", industry: "Fitness" },
  { id: 3, name: "Priya Patel", company: "Patel Group", email: "priya@patelgrp.com", score: 91, status: "qualified", avatar: "PP", location: "Chicago, IL", investment: "$500K-1M", industry: "Healthcare" },
  { id: 4, name: "David Kim", company: "Kim Ventures", email: "david@kimv.io", score: 76, status: "cold", avatar: "DK", location: "Seattle, WA", investment: "$100K-250K", industry: "Technology" },
  { id: 5, name: "Lisa Thompson", company: "Thompson LLC", email: "lisa@tllc.com", score: 82, status: "vetted", avatar: "LT", location: "Denver, CO", investment: "$250K-500K", industry: "Retail" },
  { id: 6, name: "Alex Rivera", company: "Rivera Capital", email: "alex@riveracap.com", score: 69, status: "cold", avatar: "AR", location: "Miami, FL", investment: "$50K-100K", industry: "Food & Beverage" },
  { id: 7, name: "Emily Watson", company: "Watson Inc", email: "emily@watson.inc", score: 88, status: "qualified", avatar: "EW", location: "New York, NY", investment: "$500K-1M", industry: "Education" },
  { id: 8, name: "James Okafor", company: "Okafor Systems", email: "james@okasys.com", score: 73, status: "cold", avatar: "JO", location: "Atlanta, GA", investment: "$100K-250K", industry: "Technology" },
];

const mockDocs = [
  { id: 1, name: "NDA — Sarah Chen", type: "NDA", status: "signed", date: "2025-02-10", lead: "Sarah Chen" },
  { id: 2, name: "FDD — Sarah Chen", type: "FDD", status: "pending", date: "2025-02-12", lead: "Sarah Chen", daysLeft: 11 },
  { id: 3, name: "NDA — Priya Patel", type: "NDA", status: "sent", date: "2025-02-15", lead: "Priya Patel" },
  { id: 4, name: "NDA — Emily Watson", type: "NDA", status: "signed", date: "2025-02-08", lead: "Emily Watson" },
  { id: 5, name: "FDD — Emily Watson", type: "FDD", status: "signed", date: "2025-02-09", lead: "Emily Watson" },
  { id: 6, name: "Franchise Agreement — Emily Watson", type: "FA", status: "pending", date: "2025-02-14", lead: "Emily Watson" },
];

const mockCampaigns = [
  { id: 1, name: "Q1 Franchise Owners", platform: "LinkedIn", status: "active", reach: 12400, leads: 34, spend: 2100, ctr: 3.2 },
  { id: 2, name: "Instagram Growth Push", platform: "Instagram", status: "active", reach: 45200, leads: 89, spend: 3400, ctr: 4.1 },
  { id: 3, name: "Facebook Local Targeting", platform: "Facebook", status: "paused", reach: 8900, leads: 12, spend: 890, ctr: 1.8 },
  { id: 4, name: "TikTok Awareness", platform: "TikTok", status: "draft", reach: 0, leads: 0, spend: 0, ctr: 0 },
];

const mockEvents = [
  { id: 1, title: "Discovery Call — Sarah Chen", time: "10:00 AM", date: "Today", type: "call", color: T.electric },
  { id: 2, title: "FDD Review — Priya Patel", time: "2:00 PM", date: "Today", type: "review", color: T.amber },
  { id: 3, title: "Discovery Day — Emily Watson", time: "9:00 AM", date: "Tomorrow", type: "meeting", color: T.neon },
  { id: 4, title: "Onboarding Call — Marcus Johnson", time: "11:30 AM", date: "Feb 20", type: "call", color: T.pink },
  { id: 5, title: "FDD Signing Deadline — Sarah Chen", time: "EOD", date: "Feb 23", type: "deadline", color: T.hot },
];

// ─── Animated Number Component ───
function AnimNum({ value, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = typeof value === "number" ? value : parseFloat(value);
    if (isNaN(end)) { setDisplay(value); return; }
    const dur = 800;
    const step = (end - start) / (dur / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{typeof display === "number" ? display.toLocaleString() : display}{suffix}</span>;
}

// ─── Glow Card ───
function GlowCard({ children, color = T.electric, style = {}, onClick, hoverScale = true }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: T.surface2,
        border: `1px solid ${hover ? color + "60" : T.border}`,
        borderRadius: 16,
        padding: 20,
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        cursor: onClick ? "pointer" : "default",
        transform: hover && hoverScale ? "translateY(-2px)" : "none",
        boxShadow: hover ? `0 8px 30px ${color}20` : "none",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {hover && (
        <div style={{
          position: "absolute", top: -50, right: -50, width: 120, height: 120,
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          borderRadius: "50%", pointerEvents: "none",
        }} />
      )}
      {children}
    </div>
  );
}

// ─── Stat Card ───
function StatCard({ icon: Icon, label, value, change, changeType, color, prefix = "", suffix = "" }) {
  return (
    <GlowCard color={color}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          background: `${color}18`,
        }}>
          <Icon size={20} color={color} />
        </div>
        {change && (
          <div style={{
            display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600,
            color: changeType === "up" ? T.lime : T.hot,
            background: changeType === "up" ? `${T.lime}15` : `${T.hot}15`,
            padding: "3px 8px", borderRadius: 8,
          }}>
            {changeType === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: T.text, letterSpacing: -1, lineHeight: 1.1 }}>
        <AnimNum value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div style={{ fontSize: 13, color: T.textDim, marginTop: 4, fontWeight: 500 }}>{label}</div>
    </GlowCard>
  );
}

// ─── Badge ───
function Badge({ text, color, bg }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 8,
      background: bg || `${color}18`, color: color, letterSpacing: 0.3, textTransform: "uppercase",
    }}>
      {text}
    </span>
  );
}

// ─── Score Ring ───
function ScoreRing({ score, size = 40 }) {
  const color = score >= 85 ? T.lime : score >= 70 ? T.amber : T.hot;
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.surface3} strokeWidth={3} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800, color,
      }}>{score}</div>
    </div>
  );
}

// ─── Mini Chart (sparkline) ───
function Sparkline({ data, color, width = 100, height = 30 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${height} ${pts} ${width},${height}`} fill={`url(#sg-${color.replace("#","")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Onboarding Screen ───
function OnboardingFlow({ role, onComplete }) {
  const [step, setStep] = useState(0);
  const rc = roleColors[role];
  
  const franchisorSteps = [
    { title: "Welcome to QualifIQ", subtitle: "Let's get your franchise set up in minutes", icon: "🚀", fields: null },
    { title: "Sign Up", subtitle: "Create your account", icon: "🔐", fields: ["email", "auth"] },
    { title: "Choose Your Plan", subtitle: "Select the tier that fits your needs", icon: "💎", fields: ["plan"] },
    { title: "Watch Tutorial", subtitle: "A quick overview of your new superpowers", icon: "🎬", fields: ["video"] },
    { title: "Company Details", subtitle: "Tell us about your franchise", icon: "🏢", fields: ["company"] },
    { title: "You're All Set!", subtitle: "Welcome aboard — let's find your next franchisee", icon: "🎉", fields: null },
  ];
  
  const agencySteps = [
    { title: "Welcome, Agency Partner!", subtitle: "Manage multiple franchisors from one platform", icon: "🚀", fields: null },
    { title: "Sign Up", subtitle: "Create your agency account", icon: "🔐", fields: ["email", "auth"] },
    { title: "Choose Your Plan", subtitle: "Plans scale with your franchisor count", icon: "💎", fields: ["plan"] },
    { title: "Watch Tutorial", subtitle: "Learn the multi-franchisor workflow", icon: "🎬", fields: ["video"] },
    { title: "Agency & Franchisor Details", subtitle: "Set up your agency and add your franchisors", icon: "🤝", fields: ["agency"] },
    { title: "Ready to Represent!", subtitle: "Select a franchisor and start generating leads", icon: "🎉", fields: null },
  ];
  
  const franchiseeSteps = [
    { title: "You've Been Invited!", subtitle: "A franchisor wants to connect with you", icon: "✉️", fields: null },
    { title: "Create Your Account", subtitle: "Sign up to get started", icon: "🔐", fields: ["email", "auth"] },
    { title: "Quick Tutorial", subtitle: "See how QualifIQ works for you", icon: "🎬", fields: ["video"] },
    { title: "Tell Us About You", subtitle: "Complete your profile", icon: "👤", fields: ["profile"] },
    { title: "Optional: Unlock Premium", subtitle: "Get AI features and marketplace access", icon: "✨", fields: ["upsell"] },
    { title: "Let's Get Started!", subtitle: "Your Discovery Call awaits", icon: "🎉", fields: null },
  ];
  
  const steps = role === "franchisor" ? franchisorSteps : role === "agency" ? agencySteps : franchiseeSteps;
  const current = steps[step];
  const progress = ((step) / (steps.length - 1)) * 100;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, background: T.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Background effects */}
      <div style={{
        position: "absolute", top: "-20%", left: "-10%", width: "50%", height: "50%",
        background: `radial-gradient(circle, ${rc.primary}12 0%, transparent 60%)`,
        borderRadius: "50%", filter: "blur(80px)",
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", right: "-10%", width: "60%", height: "60%",
        background: `radial-gradient(circle, ${T.pink}08 0%, transparent 60%)`,
        borderRadius: "50%", filter: "blur(80px)",
      }} />

      <div style={{ width: "100%", maxWidth: 540, padding: 32, position: "relative", zIndex: 1 }}>
        {/* Progress bar */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: T.textDim, fontWeight: 600 }}>Step {step + 1} of {steps.length}</span>
            <span style={{ fontSize: 12, color: rc.primary, fontWeight: 700 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 4, background: T.surface3, borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`, background: rc.gradient,
              borderRadius: 4, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: 24,
          padding: 40, textAlign: "center",
          boxShadow: `0 0 60px ${rc.primary}10`,
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{current.icon}</div>
          <h2 style={{
            fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: -0.5, marginBottom: 8,
            fontFamily: "'Sora', 'Outfit', sans-serif",
          }}>{current.title}</h2>
          <p style={{ fontSize: 15, color: T.textDim, marginBottom: 28, lineHeight: 1.5 }}>{current.subtitle}</p>

          {/* Dynamic content based on step */}
          {current.fields && current.fields.includes("auth") && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <div style={{
                background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              }}>
                <Mail size={18} color={T.textDim} />
                <span style={{ color: T.textDim, fontSize: 14 }}>Continue with Email</span>
              </div>
              <div style={{
                background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              }}>
                <Globe size={18} color="#DB4437" />
                <span style={{ color: T.textDim, fontSize: 14 }}>Continue with Google</span>
              </div>
              <div style={{
                background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              }}>
                <Briefcase size={18} color="#0077B5" />
                <span style={{ color: T.textDim, fontSize: 14 }}>Continue with LinkedIn</span>
              </div>
            </div>
          )}

          {current.fields && current.fields.includes("plan") && (
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {["Starter", "Growth", "Enterprise"].map((plan, i) => (
                <div key={plan} style={{
                  flex: 1, background: i === 1 ? `${rc.primary}15` : T.surface2,
                  border: `1px solid ${i === 1 ? rc.primary + "50" : T.border}`, borderRadius: 14,
                  padding: "16px 12px", cursor: "pointer", position: "relative",
                }}>
                  {i === 1 && <div style={{
                    position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
                    background: rc.gradient, padding: "2px 10px", borderRadius: 6,
                    fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: 1, textTransform: "uppercase",
                  }}>Popular</div>}
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 4 }}>{plan}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: i === 1 ? rc.primary : T.textDim }}>
                    ${[49, 149, 399][i]}<span style={{ fontSize: 12, fontWeight: 500 }}>/mo</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {current.fields && current.fields.includes("video") && (
            <div style={{
              background: T.surface2, borderRadius: 16, padding: 40, marginBottom: 20,
              border: `1px solid ${T.border}`, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", background: rc.gradient,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                boxShadow: `0 0 20px ${rc.primary}40`,
              }}>
                <Play size={24} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontSize: 13, color: T.textDim }}>Watch 2-min tutorial</span>
            </div>
          )}

          {current.fields && current.fields.includes("company") && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, textAlign: "left" }}>
              {["Company Name", "Industry", "Number of Locations", "Annual Revenue Range"].map(f => (
                <div key={f}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.textDim, marginBottom: 4, display: "block" }}>{f}</label>
                  <div style={{
                    background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 10,
                    padding: "10px 14px", color: T.textMuted, fontSize: 14,
                  }}>Enter {f.toLowerCase()}...</div>
                </div>
              ))}
            </div>
          )}

          {current.fields && current.fields.includes("upsell") && (
            <div style={{
              background: `linear-gradient(135deg, ${T.electric}12, ${T.pink}12)`,
              border: `1px solid ${T.electric}30`, borderRadius: 16, padding: 20, marginBottom: 20,
              textAlign: "left",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Sparkles size={18} color={T.amber} />
                <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Premium Access — $29/mo</span>
              </div>
              {["AI-powered FDD analysis", "Franchise marketplace access", "Advanced analytics", "Priority support"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Check size={14} color={T.lime} />
                  <span style={{ fontSize: 13, color: T.textDim }}>{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{
              padding: "12px 24px", borderRadius: 12, border: `1px solid ${T.border}`,
              background: "transparent", color: T.textDim, fontSize: 14, fontWeight: 600,
              cursor: "pointer",
            }}>Back</button>
          )}
          <button onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onComplete()} style={{
            padding: "12px 36px", borderRadius: 12, border: "none",
            background: rc.gradient, color: "#fff", fontSize: 14, fontWeight: 700,
            cursor: "pointer", boxShadow: `0 4px 20px ${rc.primary}40`,
            letterSpacing: 0.3,
          }}>
            {step === steps.length - 1 ? "Enter Platform →" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard View ───
function DashboardView({ role }) {
  const rc = roleColors[role];
  const isAgency = role === "agency";
  const isFranchisee = role === "franchisee";

  const stats = isFranchisee ? [
    { icon: FileText, label: "Pending Documents", value: 2, color: T.amber, change: null },
    { icon: Calendar, label: "Upcoming Calls", value: 3, color: T.cyan, change: null },
    { icon: CheckCircle, label: "Completed Steps", value: 7, color: T.lime, suffix: "/12" },
    { icon: Star, label: "Match Score", value: 91, color: T.electric, suffix: "%" },
  ] : [
    { icon: Users, label: "Total Leads", value: 1247, color: T.electric, change: "+12%", changeType: "up" },
    { icon: CheckCircle, label: "Qualified Leads", value: 89, color: T.lime, change: "+8%", changeType: "up" },
    { icon: Target, label: "Conversion Rate", value: 7.1, color: T.amber, suffix: "%", change: "+0.4%", changeType: "up" },
    { icon: FileSignature, label: "Agreements Signed", value: 12, color: T.pink, change: "+3", changeType: "up" },
  ];

  return (
    <div>
      {/* Welcome section */}
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20,
        padding: 28, marginBottom: 24, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 200, height: 200,
          background: `radial-gradient(circle, ${rc.primary}10 0%, transparent 60%)`,
          borderRadius: "50%",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: -0.5, marginBottom: 4 }}>
                {isFranchisee ? "Welcome back, Sarah" : isAgency ? "Good morning, Agency" : "Good morning, Franchise Co"}
              </h2>
              <p style={{ fontSize: 14, color: T.textDim }}>
                {isFranchisee
                  ? "You have 2 pending documents and 1 upcoming call today"
                  : `You have ${isAgency ? "3 franchisors active" : "5 new qualified leads"} this week`
                }
              </p>
            </div>
            {isAgency && (
              <div style={{
                display: "flex", alignItems: "center", gap: 8, background: T.surface2,
                border: `1px solid ${T.border}`, borderRadius: 12, padding: "8px 16px", cursor: "pointer",
              }}>
                <Building2 size={16} color={rc.primary} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>BurgerPro Inc.</span>
                <ChevronDown size={14} color={T.textDim} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: isFranchisee ? "1fr" : "1.4fr 1fr", gap: 20 }}>
        {/* Left: Activity / Pipeline */}
        {!isFranchisee && (
          <GlowCard color={T.electric} hoverScale={false}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Lead Pipeline</h3>
              <div style={{ display: "flex", gap: 6 }}>
                {["7D", "30D", "90D"].map((t, i) => (
                  <button key={t} style={{
                    padding: "4px 12px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 700,
                    background: i === 1 ? T.electric : T.surface3, color: i === 1 ? "#fff" : T.textDim,
                    cursor: "pointer", letterSpacing: 0.3,
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Cold", count: 423, color: T.textDim, bar: 100 },
                { label: "Vetted", count: 187, color: T.cyan, bar: 44 },
                { label: "Qualified", count: 89, color: T.amber, bar: 21 },
                { label: "Signed", count: 12, color: T.lime, bar: 3 },
              ].map(s => (
                <div key={s.label} style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.text, marginBottom: 6 }}>{s.count}</div>
                  <div style={{ height: 4, background: T.surface3, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.bar}%`, background: s.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Sparkline data={[12, 18, 15, 25, 22, 35, 30, 42, 38, 45, 52, 48]} color={T.electric} width={200} height={40} />
              <Sparkline data={[5, 8, 6, 12, 10, 15, 18, 14, 22, 19, 25, 28]} color={T.lime} width={200} height={40} />
            </div>
          </GlowCard>
        )}

        {/* Right or Full: Upcoming */}
        <GlowCard color={T.cyan} hoverScale={false} style={isFranchisee ? {} : {}}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text }}>
              {isFranchisee ? "Your Action Items" : "Upcoming Events"}
            </h3>
            <Calendar size={18} color={T.textDim} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(isFranchisee ? [
              { id: 1, title: "Sign NDA", time: "Due Today", date: "", type: "action", color: T.hot },
              { id: 2, title: "Discovery Call with BurgerPro", time: "10:00 AM", date: "Today", type: "call", color: T.electric },
              { id: 3, title: "Complete Long Form", time: "Due Feb 20", date: "", type: "action", color: T.amber },
              { id: 4, title: "Upload Financial Documents", time: "Due Feb 22", date: "", type: "upload", color: T.cyan },
              { id: 5, title: "Review FDD", time: "14-day period starts Feb 23", date: "", type: "review", color: T.pink },
            ] : mockEvents).map(ev => (
              <div key={ev.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                background: T.surface3, borderRadius: 10, cursor: "pointer",
                borderLeft: `3px solid ${ev.color}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{ev.time} {ev.date && `· ${ev.date}`}</div>
                </div>
                <ChevronRight size={16} color={T.textMuted} />
              </div>
            ))}
          </div>
        </GlowCard>
      </div>
    </div>
  );
}

// ─── Lead Management View ───
function LeadManagementView({ role }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState([]);
  const rc = roleColors[role];

  const filtered = filter === "all" ? mockLeads : mockLeads.filter(l => l.status === filter);
  const statusColors = { cold: T.textDim, vetted: T.cyan, qualified: T.lime };

  const toggleSelect = (id) => {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: -0.5 }}>Lead Management</h2>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 2 }}>Manage your pipeline from cold leads to qualified prospects</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 12,
            border: `1px solid ${T.border}`, background: T.surface2, color: T.text,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            <Upload size={15} /> Import Leads
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 12,
            border: "none", background: rc.gradient, color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            boxShadow: `0 4px 15px ${rc.primary}30`,
          }}>
            <UserPlus size={15} /> Add Lead
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[
          { key: "all", label: "All Leads", count: mockLeads.length },
          { key: "cold", label: "Cold", count: mockLeads.filter(l=>l.status==="cold").length },
          { key: "vetted", label: "Vetted", count: mockLeads.filter(l=>l.status==="vetted").length },
          { key: "qualified", label: "Qualified", count: mockLeads.filter(l=>l.status==="qualified").length },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: "8px 16px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 600,
            background: filter === f.key ? rc.primary : T.surface2, color: filter === f.key ? "#fff" : T.textDim,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}>
            {f.label}
            <span style={{
              background: filter === f.key ? "rgba(255,255,255,0.2)" : T.surface3,
              padding: "1px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            }}>{f.count}</span>
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: T.surface2,
          border: `1px solid ${T.border}`, borderRadius: 10, padding: "0 14px",
        }}>
          <Search size={15} color={T.textMuted} />
          <input placeholder="Search leads..." style={{
            background: "none", border: "none", outline: "none", color: T.text,
            fontSize: 13, padding: "8px 0", width: 160,
          }} />
        </div>
      </div>

      {/* Action Bar */}
      {selected.length > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", marginBottom: 16,
          background: `${rc.primary}12`, border: `1px solid ${rc.primary}30`, borderRadius: 12,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: rc.primary }}>{selected.length} selected</span>
          <div style={{ flex: 1 }} />
          <button style={{
            padding: "6px 14px", borderRadius: 8, border: `1px solid ${T.cyan}50`,
            background: `${T.cyan}15`, color: T.cyan, fontSize: 12, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 4,
          }}><CheckCircle size={14} /> Vet</button>
          <button style={{
            padding: "6px 14px", borderRadius: 8, border: "none",
            background: rc.gradient, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 4,
          }}><Zap size={14} /> Qualify</button>
          <button style={{
            padding: "6px 14px", borderRadius: 8, border: `1px solid ${T.border}`,
            background: T.surface3, color: T.textDim, fontSize: 12, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 4,
          }}><Send size={14} /> Email</button>
        </div>
      )}

      {/* Lead Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(lead => (
          <div key={lead.id} onClick={() => toggleSelect(lead.id)} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "14px 18px",
            background: selected.includes(lead.id) ? `${rc.primary}08` : T.surface,
            border: `1px solid ${selected.includes(lead.id) ? rc.primary + "40" : T.border}`,
            borderRadius: 14, cursor: "pointer",
            transition: "all 0.2s",
          }}>
            {/* Checkbox */}
            <div style={{
              width: 20, height: 20, borderRadius: 6, border: `2px solid ${selected.includes(lead.id) ? rc.primary : T.border}`,
              background: selected.includes(lead.id) ? rc.primary : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {selected.includes(lead.id) && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>

            {/* Avatar */}
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: `${statusColors[lead.status]}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, color: statusColors[lead.status], flexShrink: 0,
            }}>{lead.avatar}</div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{lead.name}</span>
                <Badge text={lead.status} color={statusColors[lead.status]} />
                {lead.status === "vetted" && <CheckCircle size={14} color={T.cyan} />}
              </div>
              <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>
                {lead.company} · {lead.location}
              </div>
            </div>

            <div style={{ textAlign: "right", marginRight: 8 }}>
              <div style={{ fontSize: 12, color: T.textMuted }}>{lead.industry}</div>
              <div style={{ fontSize: 12, color: T.textDim, fontWeight: 600 }}>{lead.investment}</div>
            </div>

            <ScoreRing score={lead.score} />
            <ChevronRight size={18} color={T.textMuted} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Campaigns View ───
function CampaignsView({ role }) {
  const rc = roleColors[role];
  const platformIcons = { LinkedIn: "🔗", Instagram: "📸", Facebook: "📘", TikTok: "🎵" };
  const statusStyle = { active: { bg: `${T.lime}15`, color: T.lime }, paused: { bg: `${T.amber}15`, color: T.amber }, draft: { bg: `${T.textMuted}15`, color: T.textMuted } };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: -0.5 }}>Campaigns</h2>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 2 }}>Run social media campaigns to generate franchise leads</p>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 12,
          border: "none", background: rc.gradient, color: "#fff",
          fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 15px ${rc.primary}30`,
        }}>
          <Plus size={16} /> New Campaign
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard icon={Megaphone} label="Active Campaigns" value={2} color={T.lime} />
        <StatCard icon={Eye} label="Total Reach" value={66500} color={T.electric} change="+24%" changeType="up" />
        <StatCard icon={UserPlus} label="Leads Generated" value={135} color={T.cyan} change="+18%" changeType="up" />
        <StatCard icon={Activity} label="Avg. CTR" value={3.4} suffix="%" color={T.amber} change="+0.6%" changeType="up" />
      </div>

      {/* Campaign Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {mockCampaigns.map(c => (
          <GlowCard key={c.id} color={statusStyle[c.status].color}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>{platformIcons[c.platform]}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: T.textMuted }}>{c.platform}</div>
                </div>
              </div>
              <Badge text={c.status} color={statusStyle[c.status].color} bg={statusStyle[c.status].bg} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 8 }}>
              {[
                { label: "Reach", value: c.reach.toLocaleString() },
                { label: "Leads", value: c.leads },
                { label: "Spend", value: `$${c.spend.toLocaleString()}` },
                { label: "CTR", value: `${c.ctr}%` },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{m.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{m.value}</div>
                </div>
              ))}
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

// ─── Documents View ───
function DocumentsView({ role }) {
  const rc = roleColors[role];
  const isFranchisee = role === "franchisee";
  const docTypeColors = { NDA: T.electric, FDD: T.amber, FA: T.lime };
  const statusIcons = {
    signed: { icon: CheckCircle, color: T.lime, label: "Signed" },
    pending: { icon: Clock, color: T.amber, label: "Pending" },
    sent: { icon: Send, color: T.cyan, label: "Sent" },
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: -0.5 }}>Documents</h2>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 2 }}>
            {isFranchisee ? "Your documents and agreements" : "Manage NDAs, FDDs, and Franchise Agreements"}
          </p>
        </div>
        {!isFranchisee && (
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 12,
            border: "none", background: rc.gradient, color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>
            <Upload size={16} /> Upload Document
          </button>
        )}
      </div>

      {/* Document Type Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {[
          { type: "NDA", icon: Shield, count: 3 },
          { type: "FDD", icon: FileText, count: 2 },
          { type: "FA", icon: FileSignature, count: 1 },
        ].map(d => (
          <GlowCard key={d.type} color={docTypeColors[d.type]} style={{ flex: 1, padding: 16, textAlign: "center" }}>
            <d.icon size={24} color={docTypeColors[d.type]} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>{d.count}</div>
            <div style={{ fontSize: 12, color: T.textDim, fontWeight: 600 }}>
              {d.type === "NDA" ? "Non-Disclosure" : d.type === "FDD" ? "Franchise Disclosure" : "Franchise Agreement"}
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Document List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {mockDocs.map(doc => {
          const SI = statusIcons[doc.status];
          return (
            <div key={doc.id} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
              background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14,
              cursor: "pointer", transition: "all 0.2s",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${docTypeColors[doc.type]}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FileText size={20} color={docTypeColors[doc.type]} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{doc.name}</span>
                  <Badge text={doc.type} color={docTypeColors[doc.type]} />
                </div>
                <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>
                  {doc.lead} · {doc.date}
                  {doc.daysLeft && <span style={{ color: T.amber, fontWeight: 600 }}> · {doc.daysLeft} days remaining</span>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: SI.color }}>
                <SI.icon size={16} />
                <span style={{ fontSize: 12, fontWeight: 700 }}>{SI.label}</span>
              </div>
              <button style={{
                padding: "6px 14px", borderRadius: 8, border: `1px solid ${T.border}`,
                background: T.surface2, color: T.textDim, fontSize: 12, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4,
              }}>
                {doc.status === "pending" || doc.status === "sent"
                  ? <><Eye size={13} /> {isFranchisee ? "Sign" : "View"}</>
                  : <><Download size={13} /> Download</>
                }
              </button>
            </div>
          );
        })}
      </div>

      {/* Reminder Banner */}
      <div style={{
        marginTop: 20, padding: "16px 20px", borderRadius: 14,
        background: `${T.amber}08`, border: `1px solid ${T.amber}20`,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <AlertCircle size={20} color={T.amber} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.amber }}>FDD Reminder Active</div>
          <div style={{ fontSize: 12, color: T.textDim }}>
            Automated reminders will be sent on days 3, 7, 10, and 14 for pending FDD signatures.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Calendar View ───
function CalendarView({ role }) {
  const rc = roleColors[role];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = Array.from({ length: 28 }, (_, i) => i + 1);
  const eventDays = { 3: T.electric, 7: T.amber, 10: T.lime, 14: T.hot, 17: T.electric, 18: T.neon, 20: T.pink, 23: T.amber, 25: T.cyan };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: -0.5 }}>Calendar</h2>
          <p style={{ fontSize: 13, color: T.textDim, marginTop: 2 }}>Discovery Calls, FDD reviews, and Discovery Days</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ChevronLeft size={20} color={T.textDim} style={{ cursor: "pointer" }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>February 2026</span>
          <ChevronRight size={20} color={T.textDim} style={{ cursor: "pointer" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
        {/* Calendar Grid */}
        <GlowCard color={T.electric} hoverScale={false}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {days.map(d => (
              <div key={d} style={{
                textAlign: "center", fontSize: 11, fontWeight: 700, color: T.textMuted,
                padding: 8, textTransform: "uppercase", letterSpacing: 1,
              }}>{d}</div>
            ))}
            {/* Empty cells for month start (Feb 2026 starts on Sunday -> offset 6) */}
            {Array.from({ length: 6 }, (_, i) => <div key={`e${i}`} />)}
            {dates.map(d => (
              <div key={d} style={{
                textAlign: "center", padding: "10px 0", borderRadius: 10, cursor: "pointer",
                background: d === 17 ? rc.primary : eventDays[d] ? `${eventDays[d]}12` : "transparent",
                color: d === 17 ? "#fff" : eventDays[d] ? T.text : T.textDim,
                fontWeight: d === 17 || eventDays[d] ? 700 : 500, fontSize: 13,
                position: "relative",
              }}>
                {d}
                {eventDays[d] && d !== 17 && (
                  <div style={{
                    position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)",
                    width: 4, height: 4, borderRadius: "50%", background: eventDays[d],
                  }} />
                )}
              </div>
            ))}
          </div>
        </GlowCard>

        {/* Events List */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 12 }}>Upcoming Events</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mockEvents.map(ev => (
              <div key={ev.id} style={{
                padding: "12px 14px", background: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 12, borderLeft: `3px solid ${ev.color}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{ev.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: ev.color, fontWeight: 600 }}>{ev.date}</span>
                  <span style={{ fontSize: 11, color: T.textMuted }}>{ev.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Schedule */}
          <div style={{
            marginTop: 16, padding: 16, background: `${rc.primary}08`,
            border: `1px dashed ${rc.primary}30`, borderRadius: 12, textAlign: "center",
            cursor: "pointer",
          }}>
            <Plus size={20} color={rc.primary} style={{ marginBottom: 4 }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: rc.primary }}>Schedule New Event</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings View ───
function SettingsView({ role }) {
  const rc = roleColors[role];
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: -0.5, marginBottom: 24 }}>Settings</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {[
          { icon: User, label: "Profile", desc: "Update your personal information" },
          { icon: Building2, label: "Company", desc: "Manage company details and branding" },
          { icon: CreditCard, label: "Billing", desc: "Manage subscription and payments" },
          { icon: Bell, label: "Notifications", desc: "Email and push notification preferences" },
          { icon: Shield, label: "Security", desc: "Password, 2FA, and session management" },
          { icon: Globe, label: "Integrations", desc: "Connect CRM, email, and calendar" },
        ].map(s => (
          <GlowCard key={s.label} color={rc.primary} onClick={() => {}}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, background: `${rc.primary}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <s.icon size={20} color={rc.primary} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{s.label}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>{s.desc}</div>
              </div>
              <ChevronRight size={18} color={T.textMuted} style={{ marginLeft: "auto" }} />
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ───
export default function QualifIQApp() {
  const [role, setRole] = useState("franchisor");
  const [view, setView] = useState("dashboard");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const rc = roleColors[role];

  const navItems = role === "franchisee" ? [
    { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { key: "documents", icon: FileText, label: "Documents" },
    { key: "calendar", icon: Calendar, label: "Calendar" },
    { key: "settings", icon: Settings, label: "Settings" },
  ] : [
    { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { key: "leads", icon: Users, label: "Lead Management" },
    { key: "campaigns", icon: Megaphone, label: "Campaigns" },
    { key: "documents", icon: FileText, label: "Documents" },
    { key: "calendar", icon: Calendar, label: "Calendar" },
    { key: "settings", icon: Settings, label: "Settings" },
  ];

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setRoleMenuOpen(false);
    setView("dashboard");
  };

  const renderView = () => {
    switch (view) {
      case "dashboard": return <DashboardView role={role} />;
      case "leads": return <LeadManagementView role={role} />;
      case "campaigns": return <CampaignsView role={role} />;
      case "documents": return <DocumentsView role={role} />;
      case "calendar": return <CalendarView role={role} />;
      case "settings": return <SettingsView role={role} />;
      default: return <DashboardView role={role} />;
    }
  };

  if (showOnboarding) {
    return <OnboardingFlow role={role} onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "'Sora', 'Outfit', -apple-system, sans-serif", overflow: "hidden" }}>
      
      {/* ── Sidebar ── */}
      <div style={{
        width: sidebarCollapsed ? 72 : 240, background: T.surface, borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column", transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden", flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: sidebarCollapsed ? "20px 12px" : "20px 20px", display: "flex", alignItems: "center",
          gap: 10, borderBottom: `1px solid ${T.border}`, minHeight: 64,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: rc.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, color: "#fff", flexShrink: 0,
          }}>Q</div>
          {!sidebarCollapsed && (
            <span style={{
              fontSize: 18, fontWeight: 800, letterSpacing: -0.5,
              background: "linear-gradient(135deg, #6C5CE7, #FD79A8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
            }}>QualifIQ</span>
          )}
        </div>

        {/* Role Switcher */}
        <div style={{ padding: sidebarCollapsed ? 8 : "12px 14px" }}>
          <div onClick={() => setRoleMenuOpen(!roleMenuOpen)} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: sidebarCollapsed ? 8 : "10px 12px",
            background: `${rc.primary}10`, border: `1px solid ${rc.primary}25`,
            borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
            justifyContent: sidebarCollapsed ? "center" : "flex-start",
          }}>
            <span style={{ fontSize: 18 }}>{rc.icon}</span>
            {!sidebarCollapsed && (
              <>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.text, whiteSpace: "nowrap" }}>{rc.label}</div>
                  <div style={{ fontSize: 10, color: T.textMuted }}>Switch Role</div>
                </div>
                <ChevronDown size={14} color={T.textDim} style={{
                  transition: "transform 0.2s",
                  transform: roleMenuOpen ? "rotate(180deg)" : "none",
                }} />
              </>
            )}
          </div>

          {roleMenuOpen && (
            <div style={{
              marginTop: 6, background: T.surface2, border: `1px solid ${T.border}`,
              borderRadius: 12, overflow: "hidden",
              ...(sidebarCollapsed ? { position: "absolute", left: 72, top: 140, zIndex: 50, width: 200 } : {}),
            }}>
              {Object.entries(roleColors).map(([key, val]) => (
                <div key={key} onClick={() => handleRoleChange(key)} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  cursor: "pointer", background: role === key ? `${val.primary}12` : "transparent",
                  borderLeft: `3px solid ${role === key ? val.primary : "transparent"}`,
                }}>
                  <span style={{ fontSize: 16 }}>{val.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: role === key ? val.primary : T.textDim }}>{val.label}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${T.border}` }}>
                <div onClick={() => { setShowOnboarding(true); setRoleMenuOpen(false); }} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer",
                }}>
                  <Play size={14} color={T.textDim} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.textDim }}>Replay Onboarding</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: sidebarCollapsed ? "8px 8px" : "8px 14px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(item => (
            <div key={item.key} onClick={() => setView(item.key)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: sidebarCollapsed ? "10px" : "10px 14px",
              borderRadius: 10, cursor: "pointer",
              background: view === item.key ? `${rc.primary}12` : "transparent",
              color: view === item.key ? rc.primary : T.textDim,
              transition: "all 0.15s",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
            }}>
              <item.icon size={18} />
              {!sidebarCollapsed && <span style={{ fontSize: 13, fontWeight: view === item.key ? 700 : 500, whiteSpace: "nowrap" }}>{item.label}</span>}
            </div>
          ))}
        </div>

        {/* Collapse toggle */}
        <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.border}` }}>
          <div onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: 8, borderRadius: 8, cursor: "pointer", color: T.textMuted, fontSize: 12,
          }}>
            {sidebarCollapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} />{!sidebarCollapsed && "Collapse"}</>}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 28px", borderBottom: `1px solid ${T.border}`, background: T.surface,
          minHeight: 64,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, background: T.surface2,
            border: `1px solid ${T.border}`, borderRadius: 10, padding: "0 14px", width: 320,
          }}>
            <Search size={16} color={T.textMuted} />
            <input placeholder="Search anything..." style={{
              background: "none", border: "none", outline: "none", color: T.text,
              fontSize: 13, padding: "10px 0", width: "100%",
            }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={20} color={T.textDim} />
              <div style={{
                position: "absolute", top: -2, right: -2, width: 8, height: 8,
                borderRadius: "50%", background: T.hot, border: `2px solid ${T.surface}`,
              }} />
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: rc.gradient,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, color: "#fff", cursor: "pointer",
            }}>
              {rc.icon}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
          {renderView()}
        </div>
      </div>
    </div>
  );
}
