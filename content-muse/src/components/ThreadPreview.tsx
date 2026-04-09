import { ContentItem } from "@/types/tweet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ThreadPreviewProps {
  item: ContentItem;
}

const ThreadPreview = ({ item }: ThreadPreviewProps) => {
  const parts = item.threadParts || [];

  const handleCopyThread = () => {
    const fullThread = parts
      .map((tweet, i) => `${i + 1}/${parts.length}\n${tweet}`)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(fullThread);
    toast({ title: "Thread Copied!", description: `${parts.length} tweets copied to clipboard.` });
  };

  const handleCopySingle = (tweet: string, index: number) => {
    navigator.clipboard.writeText(tweet);
    toast({ title: "Copied!", description: `Tweet ${index + 1} copied to clipboard.` });
  };

  if (parts.length === 0) return null;

  return (
    <div className="space-y-1">
      {/* Thread header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="text-sm font-black uppercase tracking-widest text-primary">
            {parts.length}-Part Thread
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyThread}
          className="rounded-xl border-border/50 font-bold text-xs gap-1.5"
        >
          <Copy className="h-3.5 w-3.5" /> Copy All
        </Button>
      </div>

      {/* Thread tweets with connector lines */}
      <div className="relative">
        {parts.map((tweet, i) => (
          <div key={i} className="relative flex gap-4 pb-4 group">
            {/* Vertical connector line */}
            {i < parts.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 to-primary/10" />
            )}

            {/* Tweet number circle */}
            <div className="shrink-0 relative z-10">
              <div className={`
                h-10 w-10 rounded-full flex items-center justify-center text-xs font-black border-2
                ${i === 0 ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' :
                  i === parts.length - 1 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  'bg-card text-muted-foreground border-border/50 group-hover:border-primary/30 transition-colors'}
              `}>
                {i + 1}
              </div>
            </div>

            {/* Tweet content */}
            <Card className="flex-1 p-4 rounded-2xl border-border/50 bg-card/40 backdrop-blur-sm group-hover:border-primary/20 transition-all">
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm text-foreground leading-relaxed flex-1">
                  {tweet}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopySingle(tweet, i)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground/50">
                <span>{tweet.length}/280 chars</span>
                {i === 0 && <span className="text-primary font-bold">HOOK</span>}
                {i === parts.length - 1 && <span className="text-emerald-400 font-bold">CTA</span>}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadPreview;
