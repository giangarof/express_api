import express from 'express';
const router = express.Router();
import { 
    administrator, 
    protect,
    Admin_Or_Owner_Review,
 } from '../../middleware/admin.js';
import asyncHandler from '../../middleware/asyncHandler.js';

import { ReviewController } from '../controllers/review.js';
const review = new ReviewController()

router.post('/create/:id', protect, asyncHandler(review.create))
router.post('/like/:reviewId', protect, asyncHandler(review.like))
router.put('/:reviewId', protect, asyncHandler(review.update))
router.delete('/delete/:reviewId', protect, Admin_Or_Owner_Review, asyncHandler(review.deleteReview))

export default router;