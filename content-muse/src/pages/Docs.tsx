import Navbar from "@/components/Navbar";
import { Sparkles, Star, BookOpen, Terminal, Zap, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-6 mx-auto max-w-7xl min-h-[70vh]">
        <div className="flex flex-col items-center justify-center text-center mb-20 gap-4 max-w-3xl mx-auto animate-in fade-in duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">
            <BookOpen className="h-3 w-3" /> Technical Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-foreground">
            Architecture <span className="text-primary">Docs</span>
          </h1>
          <p className="text-muted-foreground text-xl">
            Explore the engineering principles, API limits, and prompt schemas powering the ContentMuse Llama 3.3 pipeline.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {[
            { tag: "Getting Started", title: "Authentication Flow", desc: "Understanding our secure JWT implementation and session lifecycles.", icon: Fingerprint, color: "text-blue-500", bg: "bg-blue-500/10" },
            { tag: "Generation", title: "Prompt Engineering", desc: "How we instruct the LLM using context windows and persona matrices.", icon: Terminal, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { tag: "Infrastructure", title: "Groq Inference API", desc: "Dive into our 800 tokens/second low-latency inference connection.", icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" }
          ].map((item, idx) => (
            <Card key={idx} className="group border-border/50 bg-card/40 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${item.bg} group-hover:scale-110 transition-transform`}>
                  <item.icon className={`h-7 w-7 ${item.color}`} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">{item.tag}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="prose prose-invert prose-lg max-w-4xl mx-auto text-muted-foreground bg-card/30 p-8 md:p-12 rounded-3xl border border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-6">REST API Endpoints</h2>
          <p className="mb-6">
            Our backend runs exclusively on an Express 5 architecture connected directly to MongoDB Atlas. 
            Below is a sample of our highly restricted internal generation route:
          </p>
          <div className="bg-black/50 p-6 rounded-xl border border-white/5 font-mono text-sm overflow-x-auto mb-8">
            <span className="text-purple-400">POST</span> <span className="text-emerald-400">/api/v1/content/generate</span>
            <br/><br/>
            <span className="text-gray-500">{"// Request Payload"}</span><br/>
            {"{"}<br/>
            &nbsp;&nbsp;<span className="text-blue-300">"platform"</span>: <span className="text-amber-300">"twitter"</span>,<br/>
            &nbsp;&nbsp;<span className="text-blue-300">"topic"</span>: <span className="text-amber-300">"AI engineering speed"</span>,<br/>
            &nbsp;&nbsp;<span className="text-blue-300">"persona"</span>: <span className="text-amber-300">"The Strategist"</span><br/>
            {"}"}
          </div>
          <p>
            Please note that direct API access outside of the ContentMuse dashboard requires an Enterprise Service Account key. Regular accounts are limited to internal dashboard GUI usage.
          </p>
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
                <Link to="/contact" className="hover:text-primary transition-colors text-muted-foreground">Support</Link>
                <Link to="/terms" className="hover:text-primary transition-colors text-muted-foreground">Terms</Link>
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

export default Docs;
