export interface Tweet {
  id: string;
  hook: string;
  text: string;
  hashtags: string[];
  cta: string;
  platform: string;
  tone: string;
  createdAt: string;
}

export interface ContentScores {
  engagement: number;
  readability: number;
  hashtags: number;
  cta: number;
  overall: number;
  suggestions?: string[];
}

export interface ContentItem {
  _id: string;
  user: string;
  topic: string;
  platform: string;
  persona: string;
  content: string;
  hook?: string;
  hashtags?: string[];
  cta?: string;
  contentType: 'single' | 'thread';
  language: string;
  parentId?: string;
  version: number;
  scores?: ContentScores;
  scheduledAt?: string;
  threadParts?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineGroup {
  date: string;
  label: string;
  items: ContentItem[];
}

export interface DashboardStats {
  platformBreakdown: Record<string, number>;
  personaBreakdown: Record<string, number>;
  dailyTimeSeries: { date: string; count: number; label: string }[];
  totalSyntheses: number;
  thisWeekCount: number;
  weekGrowth: number;
  threadCount: number;
  singleCount: number;
  refinementCount: number;
  topPlatform: string;
  averageScores: {
    avgEngagement: number;
    avgReadability: number;
    avgHashtags: number;
    avgCta: number;
    avgOverall: number;
    scoredCount: number;
  } | null;
  contentTypeBreakdown: { single: number; thread: number };
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  isPro: boolean;
  generationsCount: number;
  totalSaved: number;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  isPro: boolean;
  token: string;
}
