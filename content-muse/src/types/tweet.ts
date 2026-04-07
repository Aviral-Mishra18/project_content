export interface Tweet {
  id: string;
  hook: string;
  text: string;
  hashtags: string[];
  cta: string;
  platform: "twitter" | "instagram" | "facebook";
  tone: string;
  createdAt: string;
}
