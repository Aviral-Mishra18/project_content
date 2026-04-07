import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Bookmark, Globe, Lightbulb } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Bookmark,
  Globe,
  Lightbulb,
};

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  change: string;
}

const StatCard = ({ title, value, icon, change }: StatCardProps) => {
  const Icon = iconMap[icon] || Sparkles;

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{change}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
