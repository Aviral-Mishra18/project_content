import Navbar from "@/components/Navbar";
import { Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-6 mx-auto max-w-4xl min-h-[70vh]">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 animate-in fade-in duration-700">
          <ShieldIcon /> Legal Information
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Privacy <span className="text-primary">Policy</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <p className="text-xl font-medium mb-12 text-foreground/80">Last updated: April 2026</p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Information We Collect</h2>
          <p>
            At ContentMuse, we collect data to provide you with the best AI-driven content generation experience. This includes:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Personal Data:</strong> Email addresses and profile information when you register.</li>
            <li><strong>Usage Data:</strong> Analytics regarding the platforms and personas you select to improve the Muse AI Engine.</li>
            <li><strong>AI Inputs:</strong> The topics, refinement instructions, and generated content are temporarily processed by third-party LLM providers (e.g., Groq) via API but are not used to train global models.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. How We Use Your Data</h2>
          <p>
            We strictly limit the use of your data to core functionality. ContentMuse uses your information to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Synthesize high-converting social media posts customized to your profile.</li>
            <li>Maintain session activity and your timeline vault database safely.</li>
            <li>Monitor for malicious abuse of our generative AI resources.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Third-Party Integrations</h2>
          <p>
            We integrate with world-class sub-processors to power the platform. Most notably, the Llama 3.3 Versatile model executes the generation via Groq's high-speed inference cloud. By using ContentMuse, you agree to their strictly regulated data pipelines, which enforce privacy standards matching our own.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Data Security</h2>
          <p>
            Your account is secured via enterprise-grade JSON Web Tokens (JWT) and encrypted MongoDB Atlas clusters. We enforce rate limiting, Cross-Origin request security, and strictly sanitized internal parameters.
          </p>
        </div>
      </main>

      {/* Simplified Footer */}
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
                <Link to="/" className="hover:text-primary transition-colors text-muted-foreground">Return Home</Link>
                <Link to="/login" className="hover:text-primary transition-colors text-muted-foreground">Client Login</Link>
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

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export default Privacy;
