import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, Target, BarChart3, ArrowRight, CheckCircle2, Star, ShieldCheck, Globe, Rocket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const features = [
  { icon: Sparkles, title: "AI-Powered Intelligence", description: "Generate high-converting tweets, captions, and threads using state-of-the-art LLMs.", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Target, title: "Platform Precision", description: "Tailored algorithms for X, Instagram, LinkedIn and Facebook to maximize engagement.", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Zap, title: "Instant Velocity", description: "Go from idea to post in under 3 seconds with our 'Flash-Post' technology.", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: BarChart3, title: "Trend Analytics", description: "Real-time content suggestions based on viral vectors and trending narratives.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

const personas = [
  { name: "The Minimalist", description: "Sleek, short, and impactful. For the modem professional.", icon: "✨" },
  { name: "The Hype Beast", description: "Bold, energetic, and emoji-rich. Perfect for product launches.", icon: "🔥" },
  { name: "The Strategist", description: "Data-driven, educational, and authoritative threads.", icon: "🧠" },
];

const Landing = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Smooth scroll for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-44 pb-24 px-6 sm:pt-64 sm:pb-40">
        {/* Animated Background Blobs - Luxury Depth */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-pulse opacity-50" />
        <div className="absolute top-1/2 -right-48 w-[700px] h-[700px] bg-accent/10 blur-[180px] rounded-full animate-pulse delay-1000 opacity-30" />
        
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Neural Intelligence: Muse Engine v2.5
          </div>
          
          <h1 className="text-6xl font-black tracking-tight text-white sm:text-[10rem] mb-12 leading-[1.1] sm:leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 uppercase">
            Social <br />
            <span className="text-gradient">Velocity.</span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-2xl text-muted-foreground/80 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Precision-engineered social strategies. ContentMuse generates tactical hooks, 
            high-converting threads, and viral assets tailored to your brand’s identity.
          </p>

          <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            {isLoggedIn ? (
              <Button onClick={() => navigate("/dashboard")} size="lg" className="h-16 px-12 text-xl font-black rounded-2xl primary-gradient shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] transition-all duration-500">
                Go to Dashboard <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            ) : (
              <Button onClick={() => navigate("/register")} size="lg" className="h-16 px-12 text-xl font-black rounded-2xl primary-gradient shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] transition-all duration-500">
                Register Free <Sparkles className="ml-2 h-6 w-6" />
              </Button>
            )}
            <Button variant="outline" size="lg" asChild className="h-16 px-12 text-xl font-black rounded-2xl border-white/5 glass hover:bg-white/10 transition-all">
              <a href="#features">See the Tech</a>
            </Button>
          </div>

          {/* Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof Social Proof */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-xl font-bold flex items-center gap-2"> <Rocket className="h-5 w-5" /> LaunchPad</span>
            <span className="text-sm font-semibold border px-3 py-1 rounded-md">10k+ Creators</span>
            <span className="text-xl font-bold flex items-center gap-2"> <Globe className="h-5 w-5" /> GlobalReach</span>
            <span className="text-xl font-bold flex items-center gap-2"> <ShieldCheck className="h-5 w-5" /> SecureAI</span>
          </div>
        </div>
      </section>

      {/* Brand Personas Section - NEW FEATURE */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Choose Your <span className="text-primary italic font-serif">Persona</span></h2>
              <p className="text-muted-foreground text-lg">Our multi-persona engine adjusts the vocabulary, tone, and formatting to match your specific brand identity perfectly.</p>
            </div>
            <Link to="/register">
              <Button variant="link" className="text-primary font-bold group">Explore Personas <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((persona) => (
              <div key={persona.name} className="group relative p-8 rounded-3xl border border-border bg-card/50 hover:bg-card hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] group-hover:bg-primary/10 transition-colors" />
                <div className="text-4xl mb-6">{persona.icon}</div>
                <h3 className="text-xl font-bold mb-3">{persona.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{persona.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">Designed for High-Octane Growth</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Everything you need to turn your social media into a high-performance content engine.</p>
          </div>
          
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Card key={f.title} className="group border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${f.bg} ${f.color} group-hover:scale-110 transition-transform`}>
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Advanced Card */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[80%] h-[30%] bg-primary/20 blur-[150px] rounded-[100%]" />
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Start for free, upgrade as you scale.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="border border-border p-10 bg-card/50">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-muted-foreground mb-8 text-sm italic">For personal brands & side hustles.</p>
              <div className="text-4xl font-black mb-8">$0 <span className="text-lg font-normal text-muted-foreground">/ forever</span></div>
              <ul className="space-y-4 mb-8">
                {["10 Generations / mo", "Standard AI Core", "X Support Only", "Community Support"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 font-bold rounded-xl" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </Card>

            <Card className="border-2 border-primary p-10 bg-card relative overflow-hidden shadow-2xl shadow-primary/20 md:scale-105 z-10 w-full">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-4 py-1 uppercase tracking-widest rounded-bl-lg">Most Popular</div>
              <h3 className="text-xl font-bold mb-2">Pro Strategist</h3>
              <p className="text-muted-foreground mb-8 text-sm italic">For founders, creators & agencies.</p>
              <div className="text-4xl font-black mb-8 text-primary">$19 <span className="text-lg font-normal text-muted-foreground">/ month</span></div>
              <ul className="space-y-4 mb-8">
                {["Unlimited Generations", "Premium Muse Engine v2", "All Platforms", "Priority Support", "Advanced Analytics", "Chrome Extension"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary font-bold" /> {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full h-12 font-bold rounded-xl shadow-lg shadow-primary/30" asChild>
                <Link to="/register">Upgrade to Pro</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 pt-20 pb-10 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-foreground">ContentMuse</span>
              </Link>
              <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
                Empowering the next generation of digital creators with tactical AI content strategy. 
                Built by creators, for creators.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6">Platform</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Client Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6">Company</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-medium">© 2026 ContentMuse. All rights reserved.</p>
            <div className="flex items-center gap-6 text-muted-foreground">
              <Star className="h-5 w-5 hover:text-amber-400 cursor-pointer" />
              <Star className="h-5 w-5 hover:text-amber-400 cursor-pointer" />
              <Star className="h-5 w-5 hover:text-amber-400 cursor-pointer" />
              <Star className="h-5 w-5 hover:text-amber-400 cursor-pointer" />
              <Star className="h-5 w-5 hover:text-amber-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

