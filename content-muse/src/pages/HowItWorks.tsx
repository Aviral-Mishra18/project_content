import Navbar from "@/components/Navbar";
import { Sparkles, Star, Target, Cpu, RefreshCw, Sparkle, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-24 px-6 mx-auto max-w-7xl min-h-[70vh]">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-24 gap-4 max-w-3xl mx-auto animate-in fade-in duration-1000 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full -z-10" />
          
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">
            <Cpu className="h-3 w-3" /> The Engine Room
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-foreground leading-[1.1]">
            How ContentMuse <br/>
            <span className="text-primary">Changes The Game</span>
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Take a deep dive into the 4-stage neural pipeline that transforms a simple sentence into highly-engineered viral content within 3 seconds.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="relative max-w-5xl mx-auto space-y-16 md:space-y-24 before:absolute before:inset-0 before:left-5 md:before:left-1/2 md:before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
          
          {[
            {
              step: "Phase 01",
              title: "Input Analysis Matrix",
              desc: "When you select a platform (e.g., LinkedIn vs. X) and a Persona (e.g., 'The Strategist'), the frontend instantly computes a localized context string. It packages your core topic and strict tone constraints into a secure JSON payload.",
              icon: Target,
              align: "left",
              color: "text-blue-500",
              bg: "bg-blue-500/10"
            },
            {
              step: "Phase 02",
              title: "Llama 3.3 Synthesis",
              desc: "Your payload is transmitted to our Express backend, which dynamically constructs a hidden system prompt. We interface directly with Groq's high-speed inference cloud to trigger the Llama 3.3 Versatile model, achieving sub-second generative speeds.",
              icon: Cpu,
              align: "right",
              color: "text-purple-500",
              bg: "bg-purple-500/10"
            },
            {
              step: "Phase 03",
              title: "Platform Vectorization",
              desc: "Raw LLM output is structurally cleansed. The engine injects platform-native formatting—such as thread splitters for X or line-break hooks for LinkedIn—and generates a targeted array of highly relevant algorithmic hashtags.",
              icon: Sparkle,
              align: "left",
              color: "text-amber-500",
              bg: "bg-amber-500/10"
            },
            {
              step: "Phase 04",
              title: "Vault Storage & Routing",
              desc: "The final payload is routed back to your browser while concurrently executing an asynchronous saving procedure into your encrypted MongoDB Atlas timeline. The content is immediately ready for one-click clipboard copying.",
              icon: RefreshCw,
              align: "right",
              color: "text-emerald-500",
              bg: "bg-emerald-500/10"
            }
          ].map((item, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-center w-full group animate-in fade-in slide-in-from-bottom-10 duration-1000`} style={{animationDelay: `${idx * 200}ms`}}>
              {/* Timeline Center Node */}
              <div className="absolute left-0 md:left-1/2 -translate-y-1/2 md:translate-y-0 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/40 z-10">
                <div className="w-2 h-2 bg-background rounded-full" />
              </div>
              
              {/* Content Card */}
              <Card className={`w-[calc(100%-4rem)] ml-auto md:w-[calc(50%-3rem)] md:mx-0 ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} bg-card/60 backdrop-blur-md border-border/50 hover:border-primary/50 transition-colors shadow-xl group-hover:shadow-primary/5 z-20 overflow-hidden relative`}>
                <div className={`absolute top-0 ${item.align === 'left' ? 'right-0 rounded-bl-[100px]' : 'left-0 rounded-br-[100px]'} w-32 h-32 ${item.bg} opacity-20 -z-10 transition-transform group-hover:scale-150`} />
                <CardContent className="p-8">
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-4">{item.step}</div>
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}>
                    <item.icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{item.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center animate-in fade-in duration-1000 delay-700">
          <Button onClick={() => navigate("/register")} size="lg" className="h-16 px-12 text-xl font-black rounded-2xl primary-gradient shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] transition-all">
            Fire Up The Engine <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </main>

      <footer className="border-t border-border bg-card/50 pt-16 pb-10 px-6 mt-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-foreground">ContentMuse</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-semibold max-w-md w-full justify-end">
                <Link to="/docs" className="hover:text-primary transition-colors text-muted-foreground">API Docs</Link>
                <Link to="/contact" className="hover:text-primary transition-colors text-muted-foreground">Support</Link>
                <Link to="/login" className="hover:text-primary transition-colors text-muted-foreground">Login</Link>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-medium">© 2026 ContentMuse. All rights reserved.</p>
            <div className="flex items-center gap-6 text-muted-foreground">
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

export default HowItWorks;
