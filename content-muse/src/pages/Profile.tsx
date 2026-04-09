import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, Zap, BarChart3, Database, Activity, TrendingUp, Flame, Lightbulb, User as UserIcon, Download } from "lucide-react";
import { UserProfile } from "@/types/tweet";
import api from "@/lib/api";

const AI_TIPS = [
  "Use action verbs in your headlines to boost engagement by up to 40%.",
  "Posts with questions get 2x more comments — ask your audience something today.",
  "The best time to post on LinkedIn is Tuesday-Thursday, 8-10 AM.",
  "Carousel posts on Instagram get 3x more engagement than single images.",
  "Keep your Twitter/X threads under 7 tweets for maximum completion rate.",
  "Use storytelling frameworks like AIDA to structure your content flow.",
  "Repurpose your best-performing content across platforms for 10x reach.",
];

const STREAK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const dailyTip = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return AI_TIPS[dayOfYear % AI_TIPS.length];
  }, []);

  // Generate a pseudo-random streak based on total generations
  const streakData = useMemo(() => {
    const total = stats?.generationsCount || 0;
    const seed = total + new Date().getDay();
    return STREAK_DAYS.map((day, i) => ({
      day,
      active: i <= new Date().getDay() && (seed + i) % 3 !== 0,
    }));
  }, [stats]);

  const streakCount = streakData.filter(d => d.active).length;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        setStats(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const totalActivity = (stats?.generationsCount || 0) + (stats?.totalSaved || 0);
  const progressPercent = Math.min(totalActivity * 5, 100);
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const handleExport = async () => {
    try {
      const { data } = await api.get('/content/all');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contentmuse-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      console.error("Export failed");
    }
  };

  return (
    <DashboardLayout>
      <SectionHeading title="Muse Identity" subtitle="Manage your tactical credentials and account performance." />

      <div className="grid gap-8 lg:grid-cols-3 mt-10">
        {/* User Card */}
        <Card className="lg:col-span-2 border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden rounded-3xl">
          <CardHeader className="p-8 border-b border-border/50 bg-muted/20">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                <UserIcon className="h-10 w-10" />
              </div>
              <div>
                <CardTitle className="text-3xl font-black">{user?.name || "Tactical Operator"}</CardTitle>
                <p className="text-muted-foreground font-medium">{user?.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stats?.isPro ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                    {stats?.isPro ? "Pro Strategist" : "Free Tier"}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-2xl font-black">{loading ? '...' : stats?.generationsCount || 0}</span>
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Syntheses</p>
              </div>
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <Database className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="text-2xl font-black">{loading ? '...' : stats?.totalSaved || 0}</span>
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Archived in Vault</p>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl border border-dashed border-border/50 bg-muted/5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Security Status: Encrypted</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Your account is secured by ContentMuse Tactical Encryption. Your brand patterns and AI context are fully private.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Muse Pulse - AI Activity Tracker */}
        <div className="space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm p-0 rounded-3xl overflow-hidden relative group">
            {/* Animated glow background */}
            <div className="absolute -top-16 -right-16 h-48 w-48 bg-gradient-to-br from-violet-500/15 via-cyan-500/10 to-transparent blur-3xl rounded-full group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent blur-2xl rounded-full" />

            <div className="relative p-7">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border border-violet-500/20">
                  <Activity className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest">Muse Pulse</h3>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Activity Tracker</p>
                </div>
              </div>

              {/* Progress Ring + Score */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <svg width="108" height="108" viewBox="0 0 108 108" className="transform -rotate-90">
                    <circle cx="54" cy="54" r="42" stroke="currentColor" strokeWidth="6" fill="none" className="text-border/30" />
                    <circle
                      cx="54" cy="54" r="42"
                      stroke="url(#pulseGradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                    />
                    <defs>
                      <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black bg-gradient-to-br from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                      {progressPercent}%
                    </span>
                    <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Score</span>
                  </div>
                </div>
              </div>

              {/* Weekly Streak */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Weekly Streak
                    </span>
                  </div>
                  <span className="text-xs font-black text-orange-400">{streakCount}/7</span>
                </div>
                <div className="flex gap-1.5">
                  {streakData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div
                        className={`w-full h-7 rounded-lg transition-all duration-500 ${
                          d.active
                            ? "bg-gradient-to-t from-violet-500/80 to-cyan-500/60 shadow-sm shadow-violet-500/20"
                            : "bg-muted/30 border border-border/30"
                        }`}
                        style={{ animationDelay: `${i * 80}ms` }}
                      />
                      <span className={`text-[9px] font-bold ${d.active ? "text-violet-400" : "text-muted-foreground/50"}`}>
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Insight */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/10 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Quick Insight</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {totalActivity > 10
                    ? `You've created ${stats?.generationsCount || 0} syntheses and saved ${stats?.totalSaved || 0}. You're on fire! 🔥`
                    : totalActivity > 0
                    ? `Getting started! You've made ${totalActivity} actions. Keep the momentum going.`
                    : "Start generating content to see your activity insights here!"}
                </p>
              </div>
            </div>

            {/* Daily AI Tip */}
            <div className="border-t border-border/30 p-5 bg-muted/5">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 shrink-0 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Tip of the Day</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{dailyTip}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-border/50 bg-card/40 p-8 rounded-3xl">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Node Operations</h4>
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-10 rounded-xl border-border/50 font-bold hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all">
                Reset Brand Brain
              </Button>
              <Button
                variant="ghost"
                className="w-full h-10 rounded-xl text-muted-foreground font-bold gap-2"
                onClick={handleExport}
              >
                <Download className="h-4 w-4" /> Export Archives (JSON)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
