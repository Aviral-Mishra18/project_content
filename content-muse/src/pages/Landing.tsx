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
        if (href && href !== '#') {
          try {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          } catch (error) {
            // Silent catch for invalid selectors
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 sm:pt-40 sm:pb-40">
        {/* Animated Background Blobs - Luxury Depth */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-pulse opacity-50" />
        <div className="absolute top-1/2 -right-48 w-[700px] h-[700px] bg-accent/10 blur-[180px] rounded-full animate-pulse delay-1000 opacity-30" />
        
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Neural Intelligence: Muse Engine v2.5
          </div>
          
          <h1 className="text-center text-6xl font-black tracking-tighter text-white sm:text-[8rem] md:text-[10rem] mb-12 leading-[1] sm:leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 uppercase w-full mx-auto">
            Social <br />
            <span className="text-gradient inline-block pb-2 -mt-4 sm:-mt-8">Velocity</span>
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
          <div className="flex flex-col items-center justify-center text-center mb-16 gap-4 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-2">Choose Your <span className="text-primary italic font-serif">Persona</span></h2>
            <p className="text-muted-foreground text-xl mb-2">Our multi-persona engine adjusts the vocabulary, tone, and formatting to match your specific brand identity perfectly.</p>
            <Link to="/register">
              <Button variant="link" className="text-primary font-bold group text-lg">Explore Personas <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((persona) => (
              <div key={persona.name} className="group relative p-8 flex flex-col items-center text-center rounded-3xl border border-border bg-card/50 hover:bg-card hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] group-hover:bg-primary/10 transition-colors" />
                <div className="text-5xl mb-6">{persona.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{persona.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{persona.description}</p>
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
              <Card key={f.title} className="group border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center rounded-3xl">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-[1.25rem] ${f.bg} ${f.color} group-hover:scale-110 transition-transform`}>
                    <f.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24 px-6 relative bg-muted/20">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[80%] h-[30%] bg-primary/10 blur-[150px] rounded-[100%]" />
        </div>
        
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">The Neural Synthesis <span className="text-primary">Pipeline</span></h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">See how ContentMuse transforms a simple thought into a highly-engaging viral masterpiece.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-[5.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />

            {[
              { step: "01", icon: Target, title: "Input Context", desc: "Select your platform, specify your core topic, and pick a brand persona to set the contextual baseline." },
              { step: "02", icon: Sparkles, title: "Llama 3.3 Synthesis", desc: "Our engine analyzes structural algorithms to generate hooks, engaging bodies, and tactical hashtags instantly." },
              { step: "03", icon: BarChart3, title: "Iterate & Score", desc: "Refine iterations using natural language prompts, and achieve an objective AI score for maximum readability." }
            ].map((item, idx) => (
              <Card key={idx} className="relative z-10 flex flex-col items-center text-center border border-border p-10 bg-card/60 backdrop-blur-md hover:bg-card hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 rounded-3xl group overflow-hidden">
                <div className="absolute -top-6 -right-6 text-[140px] font-black text-muted/10 group-hover:text-primary/5 transition-colors z-0 select-none pointer-events-none">
                  {item.step}
                </div>
                <div className="relative z-10 mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-background border border-primary/20 group-hover:border-primary/50 shadow-[0_0_30px_transparent] group-hover:shadow-[0_0_40px_rgba(var(--primary),0.15)] transition-all duration-500">
                  <item.icon className="h-10 w-10 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
                <h3 className="relative z-10 text-2xl font-bold mb-4">{item.title}</h3>
                <p className="relative z-10 text-muted-foreground leading-relaxed text-base">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <Button onClick={() => navigate("/register")} size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl primary-gradient shadow-lg shadow-primary/30 hover:scale-[1.05] transition-all">
              Initialize Your Pipeline <Zap className="ml-2 h-5 w-5" />
            </Button>
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
                <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Client Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6">Company</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
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

