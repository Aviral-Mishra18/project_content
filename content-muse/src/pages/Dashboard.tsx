import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { 
  Zap, TrendingUp, Users, Target, ArrowUpRight, 
  ShieldCheck, LayoutDashboard, Sparkles, Brain
} from "lucide-react";
import api from "@/lib/api";

const Dashboard = () => {
  const [statsData, setStatsData] = useState<any>(null);
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

  const chartData = [
    { name: 'Twitter', value: statsData?.platformBreakdown?.twitter || 0 },
    { name: 'Instagram', value: statsData?.platformBreakdown?.instagram || 0 },
    { name: 'LinkedIn', value: statsData?.platformBreakdown?.linkedin || 0 },
    { name: 'Facebook', value: statsData?.platformBreakdown?.facebook || 0 },
  ];

  const mainStats = [
    { 
      label: "Total Syntheses", 
      value: statsData?.totalSyntheses || 0, 
      icon: Zap, 
      color: "text-primary", 
      bg: "bg-primary/10",
      trend: "+12%" 
    },
    { 
      label: "Engagement Rate", 
      value: statsData?.engagementRate || "8.4%", 
      icon: TrendingUp, 
      color: "text-purple-500", 
      bg: "bg-purple-500/10",
      trend: "+2.1%" 
    },
    { 
      label: "Potential Reach", 
      value: statsData?.potentialReach || "42.8K", 
      icon: Users, 
      color: "text-amber-500", 
      bg: "bg-amber-500/10",
      trend: "+5.4%" 
    },
    { 
      label: "Tactical Score", 
      value: "94/100", 
      icon: Target, 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10",
      trend: "Optimal" 
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <SectionHeading 
          title="Command Center" 
          subtitle="Precision-engineered analytics for your content ecosystem." 
        />
        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-primary/5 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-glow">
          <ShieldCheck className="h-4 w-4" /> Nexus: Optimized
        </div>
      </div>
 
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {mainStats.map((stat, i) => (
          <Card key={i} className="card-tactical group border-none shadow-none">
            <CardContent className="p-7">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-all duration-500`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {stat.trend} <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 opacity-70">{stat.label}</h3>
              <p className="text-4xl font-black tracking-tighter text-foreground">{loading ? "..." : stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Main Analytics Chart */}
        <Card className="lg:col-span-2 border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between p-6 bg-muted/20">
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-primary" /> Synthesis Matrix
            </CardTitle>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase text-muted-foreground">Live Data</span>
            </div>
          </CardHeader>
          <CardContent className="p-6 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700}} 
                />
                <Tooltip 
                  contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Muse Intelligence Panel */}
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden rounded-3xl group">
          <CardHeader className="p-6 border-b border-border/50">
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" /> Muse IQ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium leading-relaxed">
                <Sparkles className="h-4 w-4 inline mr-2 text-amber-500" />
                "Your content performance is peaking on <span className="font-black text-primary">Twitter</span>. Tactical recommendation: Increase your posting frequency to 3x/day."
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Network Distribution</h4>
              {chartData.map((platform, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold px-1">
                    <span>{platform.name}</span>
                    <span className="text-primary">{platform.value} posts</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
                      style={{ width: statsData ? `${(platform.value / (statsData.totalSyntheses || 1)) * 100}%` : '0%' }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/50 opacity-60 group-hover:opacity-100 transition-opacity">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-tight">Enterprise Privacy Guard Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
