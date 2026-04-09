import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SectionHeading from "@/components/SectionHeading";
import TweetCard from "@/components/TweetCard";
import ThreadPreview from "@/components/ThreadPreview";
import { PlatformPreview } from "@/components/PlatformPreview";
import EmptyState from "@/components/EmptyState";
import SkeletonCard from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Eye, List, Clock } from "lucide-react";
import { ContentItem, TimelineGroup } from "@/types/tweet";
import api from "@/lib/api";

const Saved = () => {
  const [savedTweets, setSavedTweets] = useState<ContentItem[]>([]);
  const [timeline, setTimeline] = useState<TimelineGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline' | 'preview'>('grid');

  const fetchSaved = async () => {
    try {
      const [allRes, timelineRes] = await Promise.all([
        api.get('/content/all'),
        api.get('/content/timeline'),
      ]);
      setSavedTweets(allRes.data);
      setTimeline(timelineRes.data);
    } catch (error: unknown) {
      console.error("Fetch error:", error);
      toast({
        title: "Vault Access Failed",
        description: "Could not retrieve your saved posts.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/content/${id}`);
      setSavedTweets((prev) => prev.filter((t) => t._id !== id));
      setTimeline(prev => prev.map(group => ({
        ...group,
        items: group.items.filter(item => item._id !== id)
      })).filter(group => group.items.length > 0));
      toast({ title: "Purged", description: "Post removed from your tactical vault." });
    } catch {
      toast({
        title: "Deletion Failed",
        description: "Protocol error during removal.",
        variant: "destructive"
      });
    }
  };

  const handleCopyForPlatform = (item: ContentItem) => {
    let formatted = '';

    switch (item.platform) {
      case 'twitter':
        formatted = `${item.hook}\n\n${item.content}\n\n${(item.hashtags || []).join(' ')}\n\n${item.cta}`;
        if (formatted.length > 280) {
          formatted = formatted.slice(0, 277) + '...';
        }
        break;
      case 'instagram':
        formatted = `${item.hook}\n.\n.\n.\n${item.content}\n.\n.\n.\n${item.cta}\n.\n.\n.\n${(item.hashtags || []).join(' ')}`;
        break;
      case 'linkedin':
        formatted = `${item.hook}\n\n${item.content}\n\n${item.cta}\n\n${(item.hashtags || []).join(' ')}`;
        break;
      default:
        formatted = `${item.hook}\n\n${item.content}\n\n${(item.hashtags || []).join(' ')}\n\n${item.cta}`;
    }

    navigator.clipboard.writeText(formatted.trim());
    toast({
      title: `Copied for ${item.platform}!`,
      description: `Content formatted and copied with ${item.platform}-specific formatting.`
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <SectionHeading
          title="Tactical Vault"
          subtitle={loading ? "Synchronizing archives..." : `${savedTweets.length} mission-ready post${savedTweets.length !== 1 ? "s" : ""} archived.`}
        />
        <div className="flex gap-2">
          {(['grid', 'timeline', 'preview'] as const).map(mode => (
            <Button
              key={mode}
              variant={viewMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode(mode)}
              className="rounded-xl font-bold gap-1.5 text-xs capitalize"
            >
              {mode === 'grid' && <List className="h-3.5 w-3.5" />}
              {mode === 'timeline' && <Clock className="h-3.5 w-3.5" />}
              {mode === 'preview' && <Eye className="h-3.5 w-3.5" />}
              {mode}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4].map(i => (
            <SkeletonCard key={i} lines={4} />
          ))}
        </div>
      ) : savedTweets.length === 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EmptyState
            title="Archives Empty"
            description="Your tactical vault is currently offline. Generate content to begin archiving."
          />
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="rounded-2xl h-10 bg-muted/30 mb-6">
            <TabsTrigger value="all" className="rounded-xl text-xs font-bold">All ({savedTweets.length})</TabsTrigger>
            <TabsTrigger value="single" className="rounded-xl text-xs font-bold">
              Singles ({savedTweets.filter(t => t.contentType !== 'thread').length})
            </TabsTrigger>
            <TabsTrigger value="thread" className="rounded-xl text-xs font-bold">
              Threads ({savedTweets.filter(t => t.contentType === 'thread').length})
            </TabsTrigger>
          </TabsList>

          {['all', 'single', 'thread'].map(tab => (
            <TabsContent key={tab} value={tab}>
              {/* Timeline View */}
              {viewMode === 'timeline' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  {timeline
                    .filter(group => {
                      if (tab === 'all') return true;
                      return group.items.some(item =>
                        tab === 'thread' ? item.contentType === 'thread' : item.contentType !== 'thread'
                      );
                    })
                    .map(group => (
                      <div key={group.date}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/30" />
                          <h3 className="text-sm font-black uppercase tracking-widest text-primary">{group.label}</h3>
                          <div className="flex-1 h-[1px] bg-border/50" />
                          <span className="text-xs text-muted-foreground font-bold">{group.items.length} posts</span>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 pl-6 border-l-2 border-border/30 ml-1.5">
                          {group.items
                            .filter(item => tab === 'all' || (tab === 'thread' ? item.contentType === 'thread' : item.contentType !== 'thread'))
                            .map(item => (
                              <div key={item._id} className="space-y-2">
                                {item.contentType === 'thread' && item.threadParts?.length ? (
                                  <Card className="rounded-3xl border-border/50 bg-card/40 p-6">
                                    <ThreadPreview item={item} />
                                  </Card>
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
                                    showDelete
                                    onDelete={() => handleDelete(item._id)}
                                  />
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyForPlatform(item)}
                                  className="text-xs font-bold text-primary"
                                >
                                  Copy for {item.platform}
                                </Button>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                /* Grid / Preview View */
                <div className="grid gap-6 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  {savedTweets
                    .filter(item => tab === 'all' || (tab === 'thread' ? item.contentType === 'thread' : item.contentType !== 'thread'))
                    .map((item) => (
                      <div key={item._id} className="space-y-2">
                        {item.contentType === 'thread' && item.threadParts?.length ? (
                          <Card className="rounded-3xl border-border/50 bg-card/40 p-6">
                            <ThreadPreview item={item} />
                          </Card>
                        ) : viewMode === 'preview' ? (
                          <div className="space-y-2">
                            <PlatformPreview item={item} />
                            <div className="flex gap-2 px-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyForPlatform(item)}
                                className="text-xs font-bold text-primary"
                              >
                                Copy for {item.platform}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(item._id)}
                                className="text-xs font-bold text-destructive ml-auto"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
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
                            showDelete
                            onDelete={() => handleDelete(item._id)}
                          />
                        )}
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </DashboardLayout>
  );
};

export default Saved;
