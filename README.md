# ⚡️ ContentMuse

> **Precision-engineered social assets powered by Neural Intelligence.**

ContentMuse is a full-stack AI content generation platform designed to help creators, founders, and marketers maintain an engaging, consistent presence across all major social networks (Twitter/X, Instagram, LinkedIn, and Facebook).

## 🚀 Features

- **Multi-Platform Intelligence**: Generates content correctly formatted for specific platforms (e.g., character limits for Twitter, line breaks for Instagram).
- **Persona Engine**: 3 carefully tuned brand voices ("The Minimalist", "The Hype Beast", "The Strategist").
- **Thread Weaver**: Automatically generates cohesive 3-10 part social media threads with dedicated hook and CTA nodes.
- **Iterative Refinement**: Refine and iterate text directly using natural language follow-up prompts, saving a true version history.
- **AI Scoring System**: Scores posts on Engagement, Readability, Hashtags, and Call-to-Action strength. Provides actionable feedback before posting.
- **Tactical Dashboard**: View 7-day activity timelines, week-over-week growth, and persona distribution with a sleek data visualization layer.
- **Multi-lingual AI**: Generates content in 10 different languages globally. 

## 🏗️ Architecture

![Architecture](https://via.placeholder.com/800x400.png?text=React+%2B+Vite+%7C+NodeJS+%2B+Express+%7C+MongoDB+%7C+Groq+Llama3)

**Frontend:**
- React 18 / Vite
- TypeScript
- Tailwind CSS + Radix UI
- Recharts (Data Visualization)
- Zod (Schema Validation)
- Context API (State)

**Backend:**
- Node.js / Express 5
- MongoDB (Mongoose)
- Groq SDK API (Llama 3.3 70B Versatile)
- JWT Authentication

## 🛠️ Setup Instructions

### 1. Prerequisite
- Node.js (v18+)
- MongoDB connection string
- Groq API Key (Free tier available at [groq.com](https://groq.com/))

### 2. Backend Configuration
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_cluster_uri_here
JWT_SECRET=super_secret_jwt_key
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_URL=http://localhost:5173
```
Start the development server:
```bash
npm run dev
```

### 3. Frontend Configuration
```bash
cd content-muse
npm install
npm run dev
```

## 🧪 Testing
We use Vitest and React Testing Library for component testing.
```bash
cd content-muse
npm run test
```

## 🔮 Roadmap
- [ ] Direct publishing integration with Twitter & LinkedIn APIs
- [ ] Calendar view for scheduled timeline drag-and-drop
- [ ] AI image generation for Instagram visuals
- [ ] PWA Support for mobile app-like experience

## 🛡️ License
MIT License. Created by Aviral Mishra.
