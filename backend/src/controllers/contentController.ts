import { Response } from 'express';
import Groq from "groq-sdk";
import Content from '../models/Content.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// ─── Types ───────────────────────────────────────────────────────
interface AuthenticatedRequest {
  user: { _id: string };
  body: Record<string, unknown>;
  params: Record<string, string>;
}

// ─── Helpers ─────────────────────────────────────────────────────
const getGroqClient = (): Groq => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is missing from environment variables.");
  return new Groq({ apiKey });
};

const safeJsonParse = (text: string): Record<string, unknown> => {
  try {
    return JSON.parse(text);
  } catch {
    // Try to extract JSON from markdown code blocks
    const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) return JSON.parse(match[1].trim());
    throw new Error("AI engine failure: result was not valid JSON.");
  }
};

const LANGUAGE_MAP: Record<string, string> = {
  en: 'English', hi: 'Hindi', es: 'Spanish', fr: 'French',
  de: 'German', pt: 'Portuguese', ja: 'Japanese', ko: 'Korean',
  zh: 'Chinese', ar: 'Arabic', it: 'Italian', ru: 'Russian',
};

// ─── Generate Single Content ────────────────────────────────────
export const generateContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { topic, platform, persona, language = 'en' } = req.body as {
      topic: string; platform: string; persona: string; language?: string;
    };
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' }) as any;

    const groq = getGroqClient();
    const langName = LANGUAGE_MAP[language as string] || 'English';

    const prompt = `You are a world-class social media strategist.
    Generate a high-engaging ${platform} post about ${topic}. Tone: ${persona}.
    Language: Write the post in ${langName}.
    IMPORTANT: Provide ONLY the JSON object. No other text or markdown decorators.
    
    Structure:
    {
      "hook": "a catchy opening line",
      "content": "the main body of the post",
      "hashtags": ["list", "of", "hashtags"],
      "cta": "a clear call to action"
    }`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a specialized AI social media copywriter. You always output valid, parseable JSON without any markdown formatting wrappers." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "{}";
    const result = safeJsonParse(text);

    const contentEntry = await Content.create({
      user: userId,
      topic,
      platform,
      persona,
      content: (result.content as string) || (result.text as string) || "",
      hook: (result.hook as string) || "",
      hashtags: (result.hashtags as string[]) || [],
      cta: (result.cta as string) || "",
      contentType: 'single',
      language: language || 'en',
      version: 1,
    });

    user.generationsCount += 1;
    await user.save();

    res.status(201).json(contentEntry);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Groq Engine Error:", err);
    res.status(500).json({
      message: err.message || "Synthesis engine failed.",
      details: err.name || "GROQ_API_ERROR"
    });
  }
};

// ─── Generate Thread ────────────────────────────────────────────
export const generateThread = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { topic, platform, persona, language = 'en', threadLength = 5 } = req.body as {
      topic: string; platform: string; persona: string; language?: string; threadLength?: number;
    };
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' }) as any;

    const groq = getGroqClient();
    const langName = LANGUAGE_MAP[language as string] || 'English';
    const length = Math.min(Math.max(Number(threadLength), 3), 10);

    const prompt = `You are a world-class social media strategist.
    Generate a ${length}-part ${platform} thread about "${topic}". Tone: ${persona}.
    Language: Write in ${langName}.
    
    Rules:
    - First tweet should be a powerful hook
    - Each tweet should flow naturally into the next
    - Last tweet should contain a strong call to action
    - Each tweet must be under 280 characters
    
    IMPORTANT: Provide ONLY the JSON object.
    {
      "hook": "the first tweet / opening hook",
      "content": "a brief summary of the entire thread",
      "threadParts": ["Tweet 1 (the hook)", "Tweet 2", "Tweet 3", "...up to ${length} tweets"],
      "hashtags": ["relevant", "hashtags"],
      "cta": "the final call to action from the last tweet"
    }`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You generate viral social media threads. Always output valid JSON." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_tokens: 2048,
      response_format: { type: "json_object" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "{}";
    const result = safeJsonParse(text);

    const contentEntry = await Content.create({
      user: userId,
      topic,
      platform,
      persona,
      content: (result.content as string) || "",
      hook: (result.hook as string) || "",
      hashtags: (result.hashtags as string[]) || [],
      cta: (result.cta as string) || "",
      threadParts: (result.threadParts as string[]) || [],
      contentType: 'thread',
      language: language || 'en',
      version: 1,
    });

    user.generationsCount += 1;
    await user.save();

    res.status(201).json(contentEntry);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Thread Gen Error:", err);
    res.status(500).json({ message: err.message || "Thread generation failed." });
  }
};

// ─── Refine Content ─────────────────────────────────────────────
export const refineContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { contentId, instruction } = req.body as { contentId: string; instruction: string };
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const original = await Content.findById(contentId);
    if (!original) return res.status(404).json({ message: 'Original content not found' }) as any;
    if (original.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const groq = getGroqClient();

    const prompt = `You previously generated this ${original.platform} post:
    
    Hook: ${original.hook}
    Content: ${original.content}
    Hashtags: ${original.hashtags?.join(', ')}
    CTA: ${original.cta}
    
    The user wants you to refine it with this instruction: "${instruction}"
    
    IMPORTANT: Provide ONLY the JSON object. Apply the refinement while keeping the original intent.
    {
      "hook": "refined opening line",
      "content": "refined main body",
      "hashtags": ["refined", "hashtags"],
      "cta": "refined call to action"
    }`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You refine social media content based on user feedback. Output valid JSON only." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "{}";
    const result = safeJsonParse(text);

    const refined = await Content.create({
      user: userId,
      topic: original.topic,
      platform: original.platform,
      persona: original.persona,
      content: (result.content as string) || "",
      hook: (result.hook as string) || "",
      hashtags: (result.hashtags as string[]) || [],
      cta: (result.cta as string) || "",
      contentType: original.contentType,
      language: original.language || 'en',
      parentId: new mongoose.Types.ObjectId(original._id.toString()),
      version: (original.version || 1) + 1,
    });

    const user = await User.findById(userId);
    if (user) {
      user.generationsCount += 1;
      await user.save();
    }

    res.status(201).json(refined);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Refinement Error:", err);
    res.status(500).json({ message: err.message || "Content refinement failed." });
  }
};

// ─── AI Content Scoring ─────────────────────────────────────────
export const scoreContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { contentId } = req.params;
    const content = await Content.findById(contentId);
    if (!content) return res.status(404).json({ message: 'Content not found' }) as any;

    // If already scored, return cached scores
    if (content.scores?.overall) {
      return res.json(content.scores);
    }

    const groq = getGroqClient();

    const prompt = `Analyze this ${content.platform} social media post and score it on a scale of 0-100 for each category:

    Hook: ${content.hook}
    Content: ${content.content}
    Hashtags: ${content.hashtags?.join(', ')}
    CTA: ${content.cta}
    
    Scoring criteria:
    - engagement: How likely is this to get likes, shares, comments?
    - readability: How easy is it to read and understand?
    - hashtags: Are the hashtags relevant, trending, and well-chosen?
    - cta: How compelling is the call to action?
    
    IMPORTANT: Return ONLY the JSON object.
    {
      "engagement": <number 0-100>,
      "readability": <number 0-100>,
      "hashtags": <number 0-100>,
      "cta": <number 0-100>,
      "overall": <number 0-100>,
      "suggestions": ["specific suggestion 1", "specific suggestion 2", "specific suggestion 3"]
    }`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a social media analytics expert. Score content objectively. Always output valid JSON." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 512,
      response_format: { type: "json_object" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "{}";
    const scores = safeJsonParse(text);

    // Cache scores on the content document
    content.scores = {
      engagement: Number(scores.engagement) || 0,
      readability: Number(scores.readability) || 0,
      hashtags: Number(scores.hashtags) || 0,
      cta: Number(scores.cta) || 0,
      overall: Number(scores.overall) || 0,
    };
    await content.save();

    res.json({ ...content.scores, suggestions: scores.suggestions || [] });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Scoring Error:", err);
    res.status(500).json({ message: err.message || "Content scoring failed." });
  }
};

// ─── Get Saved Content ──────────────────────────────────────────
export const getSavedContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const contents = await Content.find({ user: new mongoose.Types.ObjectId(req.user._id) }).sort({ createdAt: -1 });
    res.json(contents);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

// ─── Get Content Timeline (grouped by date) ─────────────────────
export const getTimeline = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const contents = await Content.find({ user: new mongoose.Types.ObjectId(req.user._id) })
      .sort({ createdAt: -1 })
      .lean();

    // Group by date
    const grouped: Record<string, typeof contents> = {};
    for (const item of contents) {
      const date = new Date(item.createdAt).toISOString().split('T')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    }

    const timeline = Object.entries(grouped).map(([date, items]) => ({
      date,
      label: getDateLabel(date),
      items,
    }));

    res.json(timeline);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateStr === today.toISOString().split('T')[0]) return 'Today';
  if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday';

  const diffDays = Math.floor((today.getTime() - date.getTime()) / 86400000);
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ─── Get Version History for a content piece ────────────────────
export const getVersionHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);
    if (!content) return res.status(404).json({ message: 'Content not found' }) as any;

    // Find all versions: the root and all children 
    let rootId = content.parentId || content._id;
    
    // Walk up to find the true root
    let current = content;
    while (current.parentId) {
      const parent = await Content.findById(current.parentId);
      if (!parent) break;
      rootId = parent.parentId || parent._id;
      current = parent;
    }

    const versions = await Content.find({
      $or: [
        { _id: rootId },
        { parentId: rootId },
      ],
      user: new mongoose.Types.ObjectId(req.user._id),
    }).sort({ version: 1 });

    res.json(versions);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

// ─── Delete Content ─────────────────────────────────────────────
export const deleteContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' }) as any;

    if (content.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this content' });
    }

    await content.deleteOne();
    res.json({ message: 'Content removed' });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

// ─── Real Dashboard Stats ───────────────────────────────────────
export const getDashboardStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // ── Platform breakdown
    const platformStats = await Content.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$platform", count: { $sum: 1 } } }
    ]);

    const platformBreakdown: Record<string, number> = {};
    for (const stat of platformStats) {
      platformBreakdown[stat._id] = stat.count;
    }

    // ── Daily generation counts (last 7 days)
    const dailyStats = await Content.aggregate([
      { $match: { user: userId, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Fill in missing days with 0
    const dailyTimeSeries: { date: string; count: number; label: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      const found = dailyStats.find((s: { _id: string; count: number }) => s._id === dateStr);
      dailyTimeSeries.push({
        date: dateStr,
        count: found ? found.count : 0,
        label: dayLabel,
      });
    }

    // ── Persona breakdown
    const personaStats = await Content.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$persona", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const personaBreakdown: Record<string, number> = {};
    for (const stat of personaStats) {
      personaBreakdown[stat._id] = stat.count;
    }

    // ── Total counts
    const totalSyntheses = await Content.countDocuments({ user: userId } as Record<string, unknown>);
    const thisWeekCount = await Content.countDocuments({
      user: userId,
      createdAt: { $gte: sevenDaysAgo }
    } as Record<string, unknown>);
    const lastWeekStart = new Date(sevenDaysAgo);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const lastWeekCount = await Content.countDocuments({
      user: userId,
      createdAt: { $gte: lastWeekStart, $lt: sevenDaysAgo }
    } as Record<string, unknown>);

    // ── Content type breakdown
    const threadCount = await Content.countDocuments({ user: userId, contentType: 'thread' } as Record<string, unknown>);
    const singleCount = await Content.countDocuments({ user: userId, contentType: 'single' } as Record<string, unknown>);

    // ── Average scores (from scored content)
    const scoreStats = await Content.aggregate([
      { $match: { user: userId, "scores.overall": { $exists: true, $gt: 0 } } },
      {
        $group: {
          _id: null,
          avgEngagement: { $avg: "$scores.engagement" },
          avgReadability: { $avg: "$scores.readability" },
          avgHashtags: { $avg: "$scores.hashtags" },
          avgCta: { $avg: "$scores.cta" },
          avgOverall: { $avg: "$scores.overall" },
          scoredCount: { $sum: 1 },
        }
      }
    ]);

    // ── Refinement count
    const refinementCount = await Content.countDocuments({
      user: userId,
      parentId: { $exists: true, $ne: null }
    } as Record<string, unknown>);

    // ── Compute week-over-week growth
    const weekGrowth = lastWeekCount > 0
      ? Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100)
      : thisWeekCount > 0 ? 100 : 0;

    // ── Most active platform
    const topPlatform = platformStats.sort((a: { count: number }, b: { count: number }) => b.count - a.count)[0];

    res.json({
      platformBreakdown,
      personaBreakdown,
      dailyTimeSeries,
      totalSyntheses,
      thisWeekCount,
      weekGrowth,
      threadCount,
      singleCount,
      refinementCount,
      topPlatform: topPlatform?._id || 'none',
      averageScores: scoreStats[0] || null,
      contentTypeBreakdown: { single: singleCount, thread: threadCount },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ message: err.message });
  }
};
