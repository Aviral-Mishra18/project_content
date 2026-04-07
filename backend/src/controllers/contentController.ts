import { Response } from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Content from '../models/Content.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const generateContent = async (req: any, res: Response) => {
  try {
    const { topic, platform, persona } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' }) as any;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Upgraded to Gemini 2.5 Flash-Lite as authorized by your key
    const model = genAI.getGenerativeModel(
      { 
        model: "gemini-2.5-flash-lite", 
        generationConfig: { 
          temperature: 0.7,
        },
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ]
      },
      { apiVersion: 'v1' }
    );

    const prompt = `You are a world-class social media strategist.
    Generate a high-engaging ${platform} post about ${topic}. Tone: ${persona}. 
    IMPORTANT: Provide ONLY the JSON object. No other text.
    {
      "hook": "a catchy opening line",
      "text": "the main body of the post",
      "hashtags": ["list", "of", "hashtags"],
      "cta": "a clear call to action"
    }`;

    const resultGemini = await model.generateContent(prompt);
    const response = resultGemini.response;
    
    if (response.promptFeedback?.blockReason) {
      throw new Error(`Content Blocked: ${response.promptFeedback.blockReason}`);
    }

    let text = response.text();
    
    // Robust parsing: strip markdown code blocks if the AI includes them
    if (text.includes("```")) {
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    }
    
    let result;
    try {
      result = JSON.parse(text || "{}");
    } catch (e) {
      console.error("JSON Parse Error. Raw Text:", text);
      throw new Error("AI returned malformed data. Please try again.");
    }

    const contentEntry = await Content.create({
      user: userId,
      topic,
      platform,
      persona,
      content: result.text || result.content || "", 
      hook: result.hook,
      hashtags: result.hashtags,
      cta: result.cta,
    });

    user.generationsCount += 1;
    await user.save();

    res.status(201).json(contentEntry);
  } catch (error: any) {
    console.error("Gemini Detailed Error:", error);
    // Send back the specific error message to help the user debug (e.g. location, quota, or key issues)
    res.status(500).json({ 
      message: error.message || "Synthesis engine failed. Check server logs.",
      details: error.name || "API_ERROR"
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
