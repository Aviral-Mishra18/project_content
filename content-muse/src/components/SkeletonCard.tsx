import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

const SkeletonCard = ({ className, lines = 3 }: SkeletonCardProps) => (
  <div className={cn(
    "rounded-3xl bg-card/40 border border-border/50 p-6 space-y-4 animate-pulse",
    className
  )}>
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="h-6 w-24 bg-muted/60 rounded-lg" />
      <div className="h-4 w-16 bg-muted/40 rounded-lg" />
    </div>

    {/* Content lines */}
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div
          className="h-3 bg-muted/50 rounded-full"
          style={{ width: `${90 - i * 15}%` }}
        />
      </div>
    ))}

    {/* Footer */}
    <div className="flex gap-3 pt-2 border-t border-border/30">
      <div className="h-8 w-20 bg-muted/40 rounded-lg" />
      <div className="h-8 w-20 bg-muted/40 rounded-lg" />
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="rounded-3xl bg-card/40 border border-border/50 p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-2xl bg-muted/50" />
          <div className="h-6 w-16 rounded-full bg-muted/40" />
        </div>
        <div className="h-3 w-24 bg-muted/40 rounded-full" />
        <div className="h-8 w-20 bg-muted/60 rounded-lg" />
      </div>
    ))}
  </div>
);

export const SkeletonChart = () => (
  <div className="rounded-3xl bg-card/40 border border-border/50 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <div className="h-5 w-32 bg-muted/50 rounded-lg" />
      <div className="h-4 w-20 bg-muted/40 rounded-lg" />
    </div>
    <div className="h-[300px] bg-muted/20 rounded-2xl flex items-end gap-2 p-4">
      {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-muted/40 rounded-t-lg"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

export default SkeletonCard;
