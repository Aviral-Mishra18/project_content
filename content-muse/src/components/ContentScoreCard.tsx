import { ContentScores } from "@/types/tweet";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Lightbulb, Loader2 } from "lucide-react";

interface ContentScoreCardProps {
  scores: ContentScores | null;
  loading?: boolean;
  onScore?: () => void;
}

const SCORE_LABELS: { key: keyof Omit<ContentScores, 'suggestions' | 'overall'>; label: string; color: string }[] = [
  { key: 'engagement', label: 'Engagement', color: 'from-violet-500 to-purple-500' },
  { key: 'readability', label: 'Readability', color: 'from-cyan-500 to-blue-500' },
  { key: 'hashtags', label: 'Hashtags', color: 'from-amber-500 to-orange-500' },
  { key: 'cta', label: 'Call to Action', color: 'from-emerald-500 to-green-500' },
];

function getScoreGrade(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'Excellent', color: 'text-emerald-400' };
  if (score >= 75) return { label: 'Great', color: 'text-cyan-400' };
  if (score >= 60) return { label: 'Good', color: 'text-amber-400' };
  if (score >= 40) return { label: 'Fair', color: 'text-orange-400' };
  return { label: 'Needs work', color: 'text-red-400' };
}

const ContentScoreCard = ({ scores, loading, onScore }: ContentScoreCardProps) => {
  if (loading) {
    return (
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm rounded-3xl overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm font-bold text-muted-foreground animate-pulse">Analyzing content quality...</p>
        </CardContent>
      </Card>
    );
  }

  if (!scores) {
    return (
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm rounded-3xl overflow-hidden group cursor-pointer hover:border-primary/30 transition-all" onClick={onScore}>
        <CardContent className="p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-bold text-sm">AI Content Score</p>
            <p className="text-xs text-muted-foreground mt-1">Click to analyze this content</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const grade = getScoreGrade(scores.overall);

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm rounded-3xl overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className="relative mx-auto w-24 h-24 mb-3">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="none" className="text-border/30" />
              <circle
                cx="50" cy="50" r="42"
                stroke="url(#scoreGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - scores.overall / 100)}
                style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black">{scores.overall}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">/ 100</span>
            </div>
          </div>
          <p className={`text-sm font-black ${grade.color}`}>{grade.label}</p>
        </div>

        {/* Individual Scores */}
        <div className="space-y-3">
          {SCORE_LABELS.map(({ key, label, color }) => (
            <div key={key} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-muted-foreground">{label}</span>
                <span className="font-black">{scores[key]}</span>
              </div>
              <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
                  style={{ width: `${scores[key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {scores.suggestions && scores.suggestions.length > 0 && (
          <div className="pt-4 border-t border-border/30 space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">AI Suggestions</span>
            </div>
            <ul className="space-y-2">
              {scores.suggestions.map((suggestion, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                  <span className="h-5 w-5 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 text-[10px] font-black">{i + 1}</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentScoreCard;
