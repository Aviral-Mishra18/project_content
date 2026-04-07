import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

app.get('/', (_req, res) => {
  res.send('ContentMuse AI API is running...');
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

// Start server, then connect DB (server starts regardless of DB status)
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // Connect to DB after server starts
  await connectDB();
};

startServer();

