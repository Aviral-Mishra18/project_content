import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SectionHeading from "@/components/SectionHeading";
import TweetCard from "@/components/TweetCard";
import ThreadPreview from "@/components/ThreadPreview";
import { PlatformPreview } from "@/components/PlatformPreview";
import ContentScoreCard from "@/components/ContentScoreCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Brain, Rocket, PlusCircle, MessageSquare, Languages, Eye, RefreshCw, Send } from "lucide-react";
import { ContentItem, ContentScores } from "@/types/tweet";
import { toast } from "@/hooks/use-toast";
import { BrandPersonaSelector, personas } from "@/components/BrandPersonaSelector";
import SkeletonCard from "@/components/SkeletonCard";
import api from "@/lib/api";

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh', label: 'Chinese' },
  { code: 'ar', label: 'Arabic' },
];

const Generate = () => {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("");
  const [personaId, setPersonaId] = useState("minimalist");
  const [language, setLanguage] = useState("en");
  const [contentMode, setContentMode] = useState<'single' | 'thread'>('single');
  const [threadLength, setThreadLength] = useState("5");
  const [generated, setGenerated] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Refinement state
  const [refineTarget, setRefineTarget] = useState<ContentItem | null>(null);
  const [refineInstruction, setRefineInstruction] = useState("");
  const [refining, setRefining] = useState(false);

  // Scoring state
  const [scores, setScores] = useState<Record<string, ContentScores | null>>({});
  const [scoringId, setScoringId] = useState<string | null>(null);

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
      const endpoint = contentMode === 'thread' ? '/content/thread' : '/content/generate';

      const { data } = await api.post(endpoint, {
        topic,
        platform,
        persona: selectedPersona?.name || "Professional",
        language,
        ...(contentMode === 'thread' && { threadLength: Number(threadLength) }),
      });

      setGenerated([data, ...generated]);
      toast({
        title: contentMode === 'thread' ? "Thread Synthesized!" : "Content Synthesized!",
        description: `Your ${platform} ${contentMode} is ready using ${selectedPersona?.name} persona.`
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Generation error:", err);
      toast({
        title: "Synthesis Failed",
        description: err.response?.data?.message || "Failed to connect to AI engine.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!refineTarget || !refineInstruction.trim()) return;

    setRefining(true);
    try {
      const { data } = await api.post('/content/refine', {
        contentId: refineTarget._id,
        instruction: refineInstruction,
      });

      setGenerated([data, ...generated]);
      setRefineTarget(null);
      setRefineInstruction("");
      toast({
        title: "Content Refined!",
        description: `Version ${data.version} created from your feedback.`
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast({
        title: "Refinement Failed",
        description: err.response?.data?.message || "Could not refine content.",
        variant: "destructive"
      });
    } finally {
      setRefining(false);
    }
  };

  const handleScore = async (contentId: string) => {
    setScoringId(contentId);
    try {
      const { data } = await api.get(`/content/score/${contentId}`);
      setScores(prev => ({ ...prev, [contentId]: data }));
    } catch {
      toast({ title: "Scoring Failed", description: "Could not analyze content quality.", variant: "destructive" });
    } finally {
      setScoringId(null);
    }
  };

  const handleSave = () => {
    toast({ title: "Saved to Vault", description: "This post has been archived for later use." });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 mb-16 px-2">
        <SectionHeading
          title="Muse Engine v2.5"
          subtitle="Precision-engineered social assets powered by Neural Intelligence."
        />
        <div className="flex items-center gap-6 shrink-0 pb-1">
          <Button variant="outline" className="rounded-2xl border-white/10 glass shadow-2xl font-black px-8 h-14 hover:scale-[1.05] transition-all">
            <PlusCircle className="mr-3 h-5 w-5 text-primary" /> New Brand Persona
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-16">
        {/* Input Controls */}
        <div className="xl:col-span-2 space-y-10">
          <Card className="card-tactical border-none shadow-2xl">
            <CardContent className="p-10 sm:p-12">
              <div className="space-y-10">
                {/* Content Mode Toggle */}
                <div className="space-y-4">
                  <Label className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                    Content Type
                  </Label>
                  <div className="flex gap-3">
                    <Button
                      variant={contentMode === 'single' ? 'default' : 'outline'}
                      onClick={() => setContentMode('single')}
                      className="rounded-2xl font-bold gap-2 h-12 flex-1"
                    >
                      <Sparkles className="h-4 w-4" /> Single Post
                    </Button>
                    <Button
                      variant={contentMode === 'thread' ? 'default' : 'outline'}
                      onClick={() => setContentMode('thread')}
                      className="rounded-2xl font-bold gap-2 h-12 flex-1"
                    >
                      <MessageSquare className="h-4 w-4" /> Thread
                    </Button>
                  </div>
                </div>

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

                {/* Platform + Language + Thread Length */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Target Network</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="h-14 rounded-2xl bg-background/40 border-white/5 font-bold text-lg"><SelectValue placeholder="Platform" /></SelectTrigger>
                      <SelectContent className="rounded-2xl border-white/5 shadow-2xl bg-card">
                        <SelectItem value="twitter" className="font-bold">X / Twitter</SelectItem>
                        <SelectItem value="instagram" className="font-bold">Instagram</SelectItem>
                        <SelectItem value="facebook" className="font-bold">Facebook</SelectItem>
                        <SelectItem value="linkedin" className="font-bold">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                      <Languages className="h-3.5 w-3.5" /> Language
                    </Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="h-14 rounded-2xl bg-background/40 border-white/5 font-bold text-lg"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-2xl border-white/5 shadow-2xl bg-card">
                        {LANGUAGES.map(lang => (
                          <SelectItem key={lang.code} value={lang.code} className="font-bold">{lang.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {contentMode === 'thread' ? (
                    <div className="space-y-4">
                      <Label className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Thread Length</Label>
                      <Select value={threadLength} onValueChange={setThreadLength}>
                        <SelectTrigger className="h-14 rounded-2xl bg-background/40 border-white/5 font-bold text-lg"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-2xl border-white/5 shadow-2xl bg-card">
                          {[3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <SelectItem key={n} value={String(n)} className="font-bold">{n} tweets</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="flex items-end">
                      <Button onClick={handleGenerate} disabled={loading} className="w-full h-14 text-lg font-black gap-3 rounded-2xl primary-gradient shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
                        <Sparkles className="h-6 w-6" />
                        {loading ? "Synthesizing..." : "Synthesize"}
                      </Button>
                    </div>
                  )}
                </div>

                {contentMode === 'thread' && (
                  <Button onClick={handleGenerate} disabled={loading} className="w-full h-14 text-lg font-black gap-3 rounded-2xl primary-gradient shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
                    <MessageSquare className="h-6 w-6" />
                    {loading ? "Weaving Thread..." : `Generate ${threadLength}-Part Thread`}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Tips */}
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
                "Thread mode generates connected multi-part content.",
                "Use refinement to iterate without starting from scratch.",
                "Score your content with AI before posting.",
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

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4].map(i => (
            <SkeletonCard key={i} lines={4} />
          ))}
        </div>
      )}

      {/* Refinement Modal */}
      {refineTarget && (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Card className="border-primary/30 bg-primary/5 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="h-5 w-5 text-primary" />
                <h3 className="font-black text-lg">Refine Content (v{refineTarget.version})</h3>
                <Button variant="ghost" size="sm" onClick={() => setRefineTarget(null)} className="ml-auto text-muted-foreground">Cancel</Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed bg-muted/20 p-4 rounded-2xl border border-border/30">
                <span className="font-bold text-foreground">Original: </span>
                {refineTarget.content?.slice(0, 200)}...
              </p>
              <div className="flex gap-3">
                <Input
                  placeholder="e.g. Make it shorter, Add humor, More professional, Include a question..."
                  value={refineInstruction}
                  onChange={(e) => setRefineInstruction(e.target.value)}
                  className="h-14 rounded-2xl bg-background/40 border-white/5 font-medium text-lg"
                  onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                />
                <Button
                  onClick={handleRefine}
                  disabled={refining || !refineInstruction.trim()}
                  className="h-14 px-8 rounded-2xl font-black gap-2 primary-gradient shadow-lg"
                >
                  <Send className="h-5 w-5" />
                  {refining ? "Refining..." : "Refine"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Generated Results */}
      {!loading && generated.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold">Latest Generations</h3>
            <div className="flex gap-3">
              <Button
                variant={showPreview ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="rounded-xl font-bold gap-1.5"
              >
                <Eye className="h-4 w-4" /> {showPreview ? 'Card View' : 'Platform Preview'}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="rounded-2xl h-10 bg-muted/30 mb-6">
              <TabsTrigger value="all" className="rounded-xl text-xs font-bold">All</TabsTrigger>
              <TabsTrigger value="single" className="rounded-xl text-xs font-bold">Singles</TabsTrigger>
              <TabsTrigger value="thread" className="rounded-xl text-xs font-bold">Threads</TabsTrigger>
            </TabsList>

            {['all', 'single', 'thread'].map(tab => (
              <TabsContent key={tab} value={tab}>
                <div className="grid gap-6 sm:grid-cols-2">
                  {generated
                    .filter(item => tab === 'all' || item.contentType === tab)
                    .map((item, idx) => (
                      <div key={item._id || idx} className="space-y-4">
                        {/* Thread content */}
                        {item.contentType === 'thread' && item.threadParts && item.threadParts.length > 0 ? (
                          <Card className="rounded-3xl border-border/50 bg-card/40 backdrop-blur-sm p-6">
                            <ThreadPreview item={item} />
                          </Card>
                        ) : showPreview ? (
                          <PlatformPreview item={item} />
                        ) : (
                          <TweetCard
                            tweet={{
                              id: item._id,
                              hook: item.hook || "",
                              text: item.content || "",
                              hashtags: item.hashtags || [],
                              cta: item.cta || "",
                              platform: item.platform,
                              tone: item.persona,
                              createdAt: new Date(item.createdAt).toLocaleDateString(),
                            }}
                            showSave
                            showRegenerate
                            onSave={handleSave}
                            onRegenerate={handleGenerate}
                          />
                        )}

                        {/* Action bar: Refine + Score */}
                        <div className="flex gap-2 px-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setRefineTarget(item); setRefineInstruction(""); }}
                            className="rounded-xl font-bold gap-1.5 text-xs border-border/50"
                          >
                            <RefreshCw className="h-3.5 w-3.5" /> Refine
                            {item.version > 1 && <span className="text-primary ml-1">v{item.version}</span>}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleScore(item._id)}
                            className="rounded-xl font-bold gap-1.5 text-xs border-border/50"
                            disabled={scoringId === item._id}
                          >
                            {scoringId === item._id ? "Scoring..." : "AI Score"}
                          </Button>
                        </div>

                        {/* Score Card */}
                        {(scores[item._id] || scoringId === item._id) && (
                          <ContentScoreCard
                            scores={scores[item._id] || null}
                            loading={scoringId === item._id}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Generate;
