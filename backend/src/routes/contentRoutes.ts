import express from 'express';
import { generateContent, getSavedContent, deleteContent, getDashboardStats } from '../controllers/contentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateGenerate } from '../validators/schemas.js';

const router = express.Router();

router.route('/generate').post(protect, validateGenerate, generateContent);
router.route('/all').get(protect, getSavedContent);
router.route('/stats').get(protect, getDashboardStats);
router.route('/:id').delete(protect, deleteContent);

export default router;
