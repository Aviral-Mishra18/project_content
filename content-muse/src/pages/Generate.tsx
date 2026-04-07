import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SectionHeading from "@/components/SectionHeading";
import TweetCard from "@/components/TweetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Rocket, PlusCircle } from "lucide-react";
import { Tweet } from "@/types/tweet";
import { toast } from "@/hooks/use-toast";
import { BrandPersonaSelector, personas } from "@/components/BrandPersonaSelector";
import api from "@/lib/api";

const Generate = () => {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("");
  const [personaId, setPersonaId] = useState("minimalist");
  const [generated, setGenerated] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic || !platform) {
      toast({ 
        title: "Input required", 
        description: "Please provide a topic and select a platform.", 
        variant: "destructive" 
      });
      return;
    }
    
    setLoading(true);
    try {
      const selectedPersona = personas.find(p => p.id === personaId);
      
      const { data } = await api.post('/content/generate', {
        topic,
        platform,
        persona: selectedPersona?.name || "Professional"
      });

      // Wrap the single generated object in an array for the grid
      setGenerated([data, ...generated]);
      toast({ 
        title: "Content Synthesized!", 
        description: `Your ${platform} post is ready using ${selectedPersona?.name} persona.` 
      });
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({ 
        title: "Synthesis Failed", 
        description: error.response?.data?.message || "Failed to connect to AI engine. Check your API key.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (tweet: any) => {
    toast({ title: "Saved to Vault", description: "This post has been archived for later use." });
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 mb-16 px-2">
        <SectionHeading 
          title="Muse Engine v2.5" 
          subtitle="Precision-engineered social assets powered by Gemini Neural Intelligence." 
        />
        <div className="flex items-center gap-6 shrink-0 pb-1">
          <Button variant="outline" className="rounded-2xl border-white/10 glass shadow-2xl font-black px-8 h-14 hover:scale-[1.05] transition-all">
            <PlusCircle className="mr-3 h-5 w-5 text-primary" /> New Brand Persona
          </Button>
          <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-white/10">
            <div className="flex -space-x-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-12 w-12 rounded-full border-4 border-background bg-muted flex items-center justify-center text-xs font-black shadow-2xl hover:translate-y-[-4px] transition-transform cursor-pointer">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 leading-none">
              Connected <br /> Entities
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-16">
        {/* Input Controls */}
        <div className="xl:col-span-2 space-y-10">
          <Card className="card-tactical border-none shadow-2xl">
            <CardContent className="p-10 sm:p-12">
              <div className="space-y-10">
                {/* Topic Input */}
                <div className="space-y-4">
                  <Label htmlFor="topic" className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2 mb-2">
                    <Rocket className="h-4 w-4" /> Strategic Context
                  </Label>
                  <Input
                    id="topic"
                    placeholder="e.g. productivity tips for deep-work enthusiasts..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-20 text-2xl px-8 rounded-[1.5rem] bg-background/40 border-white/5 focus:ring-primary/40 focus:border-primary/50 transition-all font-medium placeholder:text-muted-foreground/30"
                  />
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/50 ml-2">Describe your objective in detail for peak AI performance.</p>
                </div>

                {/* Persona Selection */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                  <Label className="text-xs font-black uppercase tracking-[0.3em] text-purple-500 flex items-center gap-2">
                    <Brain className="h-4 w-4" /> Neural Brand Persona
                  </Label>
                  <BrandPersonaSelector selectedId={personaId} onSelect={setPersonaId} />
                </div>

                {/* Platform Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Target Network</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="h-14 rounded-2xl bg-background/40 border-white/5 font-bold text-lg"><SelectValue placeholder="Social Matrix" /></SelectTrigger>
                      <SelectContent className="rounded-2xl border-white/5 shadow-2xl bg-card">
                        <SelectItem value="twitter" className="font-bold">X / Twitter</SelectItem>
                        <SelectItem value="instagram" className="font-bold">Instagram</SelectItem>
                        <SelectItem value="facebook" className="font-bold">Facebook</SelectItem>
                        <SelectItem value="linkedin" className="font-bold">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleGenerate} disabled={loading} className="w-full h-14 text-lg font-black gap-3 rounded-2xl primary-gradient shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
                      <Sparkles className="h-6 w-6" />
                      {loading ? "Synthesizing..." : "Initialize Synthesis"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar/Tips */}
        <div className="space-y-8">
          <Card className="border-none bg-primary/5 p-8 rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
              <Brain className="h-24 w-24 text-primary" />
            </div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-3"> 
              <Sparkles className="h-5 w-5 text-amber-500" /> Tactical Intelligence
            </h4>
            <ul className="space-y-6">
              {[
                "Use 'Hype Beast' for announcements and product drops.",
                "'The Strategist' is best for LinkedIn threads and authority.",
                "Detail specific pain points for maximum relatability."
              ].map((tip, i) => (
                <li key={i} className="flex gap-4 text-sm font-medium text-muted-foreground leading-relaxed hover:text-foreground transition-colors">
                  <span className="h-6 w-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0 text-[10px] font-black">{i+1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 animate-pulse opacity-50">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-48 rounded-3xl bg-muted border border-border" />
          ))}
        </div>
      )}

      {!loading && generated.length > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold">Latest Generations</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {generated.map((item, idx) => (
              <TweetCard
                key={item._id || idx}
                tweet={{
                  id: item._id,
                  hook: item.hook || "",
                  text: item.content || "",
                  hashtags: item.hashtags || [],
                  cta: item.cta || "",
                  platform: item.platform,
                  tone: item.persona,
                  createdAt: new Date().toISOString()
                }}
                showSave
                showRegenerate
                onSave={() => handleSave(item)}
                onRegenerate={handleRegenerate}
              />
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Generate;


