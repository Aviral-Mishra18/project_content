import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Sparkles, Star, Mail, MessageSquare, Twitter, Globe, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const { toast } = useToast();
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Transmission Failed",
        description: "Please provide all required diagnostic fields.",
        variant: "destructive"
      });
      return;
    }

    setIsTransmitting(true);
    
    // Simulate network transmission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsTransmitting(false);
    setFormData({ name: "", email: "", message: "" });
    
    toast({
      title: "Transmission Successful",
      description: "Mission Control has received your dispatch. We'll deploy a response shortly."
    });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-6 mx-auto max-w-6xl min-h-[70vh]">
        <div className="flex flex-col items-center justify-center text-center mb-16 gap-4 max-w-3xl mx-auto animate-in fade-in duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">
            <MessageSquare className="h-3 w-3" /> Mission Control
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-foreground">
            Contact <span className="text-primary">Support</span>
          </h1>
          <p className="text-muted-foreground text-xl">
            Need help configuring your neural pipelines? Running into rate limits? Our engineering team is standing by to deploy assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-5xl mx-auto">
          {/* Quick Contact Cards */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
            <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">Direct Channels</h2>
            
            <Link to="/docs" className="block group">
              <Card className="bg-card/40 border-border/50 hover:bg-card hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Documentation</h3>
                    <p className="text-sm text-muted-foreground">Self-serve Neural Guides</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <a href="#" className="block group">
              <Card className="bg-card/40 border-border/50 hover:bg-card hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Twitter className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Developer Twitter/X</h3>
                    <p className="text-sm text-muted-foreground">@ContentMuseApp</p>
                  </div>
                </CardContent>
              </Card>
            </a>

            <a href="#" className="block group">
              <Card className="bg-card/40 border-border/50 hover:bg-card hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Community Discord</h3>
                    <p className="text-sm text-muted-foreground">Join 10k+ Creators</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>

          {/* Contact Form */}
          <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <Card className="border-border bg-card shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -z-10 rounded-full" />
              <h2 className="text-2xl font-bold mb-6">Send a Dispatch</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Operator Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
                    disabled={isTransmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Secure Transmission Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com" 
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
                    disabled={isTransmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Diagnostics / Inquiry</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can our engineering team assist you today?" 
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none focus:ring-2 focus:ring-primary/20"
                    disabled={isTransmitting}
                  />
                </div>
                <Button 
                  disabled={isTransmitting}
                  className="w-full h-12 font-bold rounded-xl primary-gradient mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isTransmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Transmitting...
                    </>
                  ) : (
                    <>
                      Transmit Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
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
                <Link to="/privacy" className="hover:text-primary transition-colors text-muted-foreground">Privacy</Link>
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

export default Contact;
