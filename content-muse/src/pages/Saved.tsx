import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SectionHeading from "@/components/SectionHeading";
import TweetCard from "@/components/TweetCard";
import EmptyState from "@/components/EmptyState";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

const Saved = () => {
  const [savedTweets, setSavedTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    try {
      const { data } = await api.get('/content/all');
      setSavedTweets(data);
    } catch (error: any) {
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
      setSavedTweets((prev) => prev.filter((t) => (t._id || t.id) !== id));
      toast({ title: "Purged", description: "Post removed from your tactical vault." });
    } catch (error: any) {
      toast({ 
        title: "Deletion Failed", 
        description: "Protocol error during removal.", 
        variant: "destructive" 
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <SectionHeading 
          title="Tactical Vault" 
          subtitle={loading ? "Synchronizing archives..." : `${savedTweets.length} mission-ready post${savedTweets.length !== 1 ? "s" : ""} archived.`} 
        />
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-48 rounded-3xl bg-muted/40 border border-border/50" />
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
        <div className="grid gap-6 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {savedTweets.map((item) => (
            <TweetCard 
              key={item._id} 
              tweet={{
                id: item._id,
                hook: item.hook || "",
                text: item.content || "",
                hashtags: item.hashtags || [],
                cta: item.cta || "",
                platform: item.platform,
                tone: item.persona,
                createdAt: item.createdAt
              }} 
              showDelete 
              onDelete={() => handleDelete(item._id)} 
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Saved;
