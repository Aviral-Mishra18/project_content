import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Bookmark, RefreshCw, Trash2 } from "lucide-react";
import { Tweet } from "@/types/tweet";
import { toast } from "@/hooks/use-toast";

interface TweetCardProps {
  tweet: Tweet;
  onSave?: (tweet: Tweet) => void;
  onDelete?: (id: string) => void;
  onRegenerate?: () => void;
  showSave?: boolean;
  showDelete?: boolean;
  showRegenerate?: boolean;
}

const TweetCard = ({
  tweet,
  onSave,
  onDelete,
  onRegenerate,
  showSave = false,
  showDelete = false,
  showRegenerate = false,
}: TweetCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${tweet.hook}\n\n${tweet.text}\n\n${tweet.hashtags.join(" ")}\n\n${tweet.cta}`);
    toast({ title: "Copied!", description: "Tweet copied to clipboard." });
  };

  const platformColor: Record<string, string> = {
    twitter: "bg-primary/10 text-primary",
    instagram: "bg-accent/10 text-accent",
    facebook: "bg-primary/10 text-primary",
  };

  return (
    <Card className="border border-border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={platformColor[tweet.platform || "twitter"]}>
            {(tweet.platform || "twitter") === "twitter" ? "X / Twitter" : (tweet.platform || "twitter").charAt(0).toUpperCase() + (tweet.platform || "twitter").slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">{tweet.createdAt}</span>
        </div>

        <p className="font-semibold text-foreground">{tweet.hook}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{tweet.text}</p>

        <div className="flex flex-wrap gap-1.5">
          {tweet.hashtags.map((tag) => (
            <span key={tag} className="text-xs text-primary font-medium">{tag}</span>
          ))}
        </div>

        <p className="text-sm font-medium text-foreground">{tweet.cta}</p>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="mr-1 h-3.5 w-3.5" /> Copy
          </Button>
          {showSave && onSave && (
            <Button variant="ghost" size="sm" onClick={() => onSave(tweet)}>
              <Bookmark className="mr-1 h-3.5 w-3.5" /> Save
            </Button>
          )}
          {showRegenerate && onRegenerate && (
            <Button variant="ghost" size="sm" onClick={onRegenerate}>
              <RefreshCw className="mr-1 h-3.5 w-3.5" /> Regenerate
            </Button>
          )}
          {showDelete && onDelete && (
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => onDelete(tweet.id)}>
              <Trash2 className="mr-1 h-3.5 w-3.5" /> Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
