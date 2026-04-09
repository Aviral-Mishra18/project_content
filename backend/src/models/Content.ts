import mongoose, { Schema, Document } from 'mongoose';

export interface IContentScores {
  engagement: number;
  readability: number;
  hashtags: number;
  cta: number;
  overall: number;
}

export interface IContent extends Document {
  user: mongoose.Types.ObjectId;
  topic: string;
  platform: string;
  persona: string;
  content: string;
  hook?: string;
  hashtags?: string[];
  cta?: string;
  contentType: 'single' | 'thread';
  language: string;
  parentId?: mongoose.Types.ObjectId;
  version: number;
  scores?: IContentScores;
  scheduledAt?: Date;
  threadParts?: string[];
  engagementStats?: {
    likes: number;
    shares: number;
    comments: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    platform: { type: String, required: true },
    persona: { type: String, required: true },
    content: { type: String, required: true },
    hook: { type: String },
    hashtags: { type: [String] },
    cta: { type: String },
    contentType: { type: String, enum: ['single', 'thread'], default: 'single' },
    language: { type: String, default: 'en' },
    parentId: { type: Schema.Types.ObjectId, ref: 'Content' },
    version: { type: Number, default: 1 },
    scores: {
      engagement: { type: Number },
      readability: { type: Number },
      hashtags: { type: Number },
      cta: { type: Number },
      overall: { type: Number },
    },
    scheduledAt: { type: Date },
    threadParts: { type: [String] },
    engagementStats: {
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

contentSchema.index({ user: 1, createdAt: -1 });
contentSchema.index({ user: 1, platform: 1 });
contentSchema.index({ parentId: 1 });

const Content = mongoose.model<IContent>('Content', contentSchema);
export default Content;
