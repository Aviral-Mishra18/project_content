import express from 'express';
import {
  generateContent,
  generateThread,
  refineContent,
  scoreContent,
  getSavedContent,
  getTimeline,
  getVersionHistory,
  deleteContent,
  getDashboardStats
} from '../controllers/contentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateGenerate } from '../validators/schemas.js';

const router = express.Router();

// Generation
router.route('/generate').post(protect, validateGenerate, generateContent);
router.route('/thread').post(protect, validateGenerate, generateThread);
router.route('/refine').post(protect, refineContent);

// Scoring
router.route('/score/:contentId').get(protect, scoreContent);

// Content retrieval
router.route('/all').get(protect, getSavedContent);
router.route('/timeline').get(protect, getTimeline);
router.route('/stats').get(protect, getDashboardStats);
router.route('/versions/:id').get(protect, getVersionHistory);

// Content management
router.route('/:id').delete(protect, deleteContent);

export default router;
