import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
  Zap, TrendingUp, Users, Target, ArrowUpRight, ArrowDownRight,
  ShieldCheck, LayoutDashboard, Sparkles, Brain, MessageSquare, RefreshCw
} from "lucide-react";
import { SkeletonStats, SkeletonChart } from "@/components/SkeletonCard";
import { DashboardStats } from "@/types/tweet";
import api from "@/lib/api";

const PIE_COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ec4899'];

const Dashboard = () => {
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/content/stats');
        setStatsData(data);
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const platformChartData = statsData
    ? Object.entries(statsData.platformBreakdown).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }))
    : [];

  const personaChartData = statsData
    ? Object.entries(statsData.personaBreakdown).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const weekGrowthPositive = (statsData?.weekGrowth ?? 0) >= 0;

  const mainStats = [
    {
      label: "Total Syntheses",
      value: statsData?.totalSyntheses ?? 0,
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/10",
      trend: statsData ? `${weekGrowthPositive ? '+' : ''}${statsData.weekGrowth}%` : '—',
      trendUp: weekGrowthPositive,
    },
    {
      label: "This Week",
      value: statsData?.thisWeekCount ?? 0,
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      trend: `${statsData?.dailyTimeSeries?.reduce((a, b) => a + b.count, 0) ?? 0} posts`,
      trendUp: true,
    },
    {
      label: "Threads Created",
      value: statsData?.threadCount ?? 0,
      icon: MessageSquare,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      trend: `${statsData?.singleCount ?? 0} singles`,
      trendUp: true,
    },
    {
      label: "Refinements",
      value: statsData?.refinementCount ?? 0,
      icon: RefreshCw,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: statsData?.topPlatform ? `Top: ${statsData.topPlatform}` : '—',
      trendUp: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <SectionHeading
          title="Command Center"
          subtitle="Real-time analytics from your content ecosystem."
        />
        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-primary/5 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-glow">
          <ShieldCheck className="h-4 w-4" /> Nexus: Optimized
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <SkeletonStats />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {mainStats.map((stat, i) => (
            <Card key={i} className="card-tactical group border-none shadow-none">
              <CardContent className="p-7">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-all duration-500`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-[11px] font-black px-3 py-1 rounded-full border ${
                    stat.trendUp
                      ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                      : 'text-red-500 bg-red-500/10 border-red-500/20'
                  }`}>
                    {stat.trend}
                    {stat.trendUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  </div>
                </div>
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 opacity-70">{stat.label}</h3>
                <p className="text-4xl font-black tracking-tighter text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Charts Row */}
      {loading ? (
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2"><SkeletonChart /></div>
          <SkeletonChart />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Daily Activity Chart */}
          <Card className="lg:col-span-2 border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between p-6 bg-muted/20">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-primary" /> 7-Day Activity
              </CardTitle>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase text-muted-foreground">Live Data</span>
              </div>
            </CardHeader>
            <CardContent className="p-6 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statsData?.dailyTimeSeries || []}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700}}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700}}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderRadius: '16px',
                      border: '1px solid hsl(var(--border))',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value: number) => [`${value} posts`, 'Generated']}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden rounded-3xl group">
            <CardHeader className="p-6 border-b border-border/50">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" /> Platform Mix
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {platformChartData.length > 0 ? (
                <>
                  <div className="h-[180px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={platformChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          dataKey="value"
                          strokeWidth={2}
                          stroke="hsl(var(--background))"
                        >
                          {platformChartData.map((_, index) => (
                            <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderRadius: '12px',
                            border: '1px solid hsl(var(--border))'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3 mt-4">
                    {platformChartData.map((platform, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                          <span className="font-bold">{platform.name}</span>
                        </div>
                        <span className="font-black text-primary">{platform.value} posts</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[250px] text-center">
                  <Sparkles className="h-8 w-8 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-bold text-muted-foreground">No data yet</p>
                  <p className="text-xs text-muted-foreground/60">Generate content to see platform analytics</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Row — Persona breakdown + Muse Intelligence */}
      {!loading && (
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Persona Usage */}
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden rounded-3xl">
            <CardHeader className="p-6 bg-muted/20">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-500" /> Persona Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-[280px]">
              {personaChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={personaChartData} layout="vertical" barCategoryGap={8}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700}} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700}} width={100} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-sm text-muted-foreground">No persona data yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights Panel */}
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden rounded-3xl group">
            <CardHeader className="p-6 border-b border-border/50">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" /> Muse IQ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Smart AI insight based on real data */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-medium leading-relaxed">
                  <Sparkles className="h-4 w-4 inline mr-2 text-amber-500" />
                  {statsData && statsData.totalSyntheses > 0 ? (
                    <>
                      Your most active platform is <span className="font-black text-primary">{statsData.topPlatform}</span>.
                      You've generated <span className="font-black">{statsData.totalSyntheses}</span> posts total
                      with <span className="font-black">{statsData.threadCount}</span> threads
                      and <span className="font-black">{statsData.refinementCount}</span> refinements.
                      {statsData.weekGrowth > 0 && ` Activity is up ${statsData.weekGrowth}% this week! 🚀`}
                      {statsData.weekGrowth < 0 && ` Activity dropped ${Math.abs(statsData.weekGrowth)}% — time to get back on track!`}
                    </>
                  ) : (
                    "Start generating content to unlock AI-powered insights about your posting patterns."
                  )}
                </p>
              </div>

              {/* Average Scores */}
              {statsData?.averageScores && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                    Average Content Quality
                  </h4>
                  {[
                    { label: 'Engagement', value: statsData.averageScores.avgEngagement },
                    { label: 'Readability', value: statsData.averageScores.avgReadability },
                    { label: 'Overall', value: statsData.averageScores.avgOverall },
                  ].map(metric => (
                    <div key={metric.label} className="space-y-1.5">
                      <div className="flex justify-between text-xs px-1">
                        <span className="font-bold text-muted-foreground">{metric.label}</span>
                        <span className="font-black">{Math.round(metric.value)}/100</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000 rounded-full"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-[10px] text-muted-foreground/60 px-1">
                    Based on {statsData.averageScores.scoredCount} scored posts
                  </p>
                </div>
              )}

              {/* Security badge */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/50 opacity-60 group-hover:opacity-100 transition-opacity">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-tight">Enterprise Privacy Guard Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
