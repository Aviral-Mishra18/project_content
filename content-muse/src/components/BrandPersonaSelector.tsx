import { useState } from "react";
import { Check, Sparkles, Zap, Brain, User, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export const personas = [
  { 
    id: "minimalist", 
    name: "The Minimalist", 
    icon: Sparkles, 
    description: "Short, punchy, and professional.",
    tone: "Professional" 
  },
  { 
    id: "hype", 
    name: "The Hype Beast", 
    icon: Zap, 
    description: "High energy, emojis, and bold statements.",
    tone: "Bold" 
  },
  { 
    id: "strategist", 
    name: "The Strategist", 
    icon: Brain, 
    description: "Deep-dives, data-driven, and authoritative.",
    tone: "Analytical" 
  },
  { 
    id: "friendly", 
    name: "The Bestie", 
    icon: User, 
    description: "Relatable, conversational, and warm.",
    tone: "Friendly" 
  },
];

interface BrandPersonaSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const BrandPersonaSelector = ({ selectedId, onSelect }: BrandPersonaSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {personas.map((persona) => {
        const Icon = persona.icon;
        const isSelected = selectedId === persona.id;
        
        return (
          <div
            key={persona.id}
            onClick={() => onSelect(persona.id)}
            className={cn(
              "relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300",
              isSelected 
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                : "border-border bg-card/50 hover:border-primary/30 hover:bg-card"
            )}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                <Check className="h-3 w-3" />
              </div>
            )}
            <div className={cn(
              "mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
              isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm mb-1">{persona.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {persona.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
