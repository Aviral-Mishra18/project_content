import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  user: mongoose.Schema.Types.ObjectId;
  topic: string;
  platform: string;
  persona: string;
  content: string;
  hook?: string;
  hashtags?: string[];
  cta?: string;
  engagementStats?: {
    likes: number;
    shares: number;
    comments: number;
  };
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
    engagementStats: {
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Content = mongoose.model<IContent>('Content', contentSchema);
export default Content;
