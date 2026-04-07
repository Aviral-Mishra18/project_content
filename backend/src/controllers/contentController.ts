import { Response } from 'express';
import Groq from "groq-sdk";
import Content from '../models/Content.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const generateContent = async (req: any, res: Response) => {
  try {
    const { topic, platform, persona } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' }) as any;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is missing from environment variables.");
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are a world-class social media strategist.
    Generate a high-engaging ${platform} post about ${topic}. Tone: ${persona}. 
    IMPORTANT: Provide ONLY the JSON object. No other text or markdown decorators.
    
    Structure:
    {
      "hook": "a catchy opening line",
      "content": "the main body of the post",
      "hashtags": ["list", "of", "hashtags"],
      "cta": "a clear call to action"
    }`;

    // Using Llama-3.3-70b-versatile for high-end reasoning and content quality
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a specialized AI social media copywriter. You always output valid, parseable JSON without any markdown formatting wrappers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "{}";
    
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("Groq JSON Parse Error:", text);
      throw new Error("AI engine failure: result was not valid JSON.");
    }

    const contentEntry = await Content.create({
      user: userId,
      topic,
      platform,
      persona,
      content: result.content || result.text || "", 
      hook: result.hook || "",
      hashtags: result.hashtags || [],
      cta: result.cta || "",
    });

    user.generationsCount += 1;
    await user.save();

    res.status(201).json(contentEntry);
  } catch (error: any) {
    console.error("Groq Engine Error:", error);
    res.status(500).json({ 
      message: error.message || "Synthesis engine failed.",
      details: error.name || "GROQ_API_ERROR"
    });
  }
};

export const getSavedContent = async (req: any, res: Response) => {
  try {
    const contents = await Content.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(contents);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContent = async (req: any, res: Response) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' }) as any;
    
    // Check if user is the owner
    if (content.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this content' });
    }
    
    await content.deleteOne();
    res.json({ message: 'Content removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req: any, res: Response) => {
  try {
    const stats = await Content.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user._id) } },
      { $group: { _id: "$platform", count: { $sum: 1 } } }
    ]);
    
    const platformBreakdown = stats.reduce((acc: any, curr: any) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json({
      platformBreakdown,
      totalSyntheses: await Content.countDocuments({ user: req.user._id } as any),
      // Example static values for design consistency
      engagementRate: "8.4%",
      potentialReach: "42.8K"
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
