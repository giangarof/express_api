import express from 'express';
const router = express.Router();
import { 
    administrator, 
    protect,
    Admin_Or_Owner_Post
    
 } from '../../middleware/admin.js';
import { multerFields } from '../../config/multer.js';
import asyncHandler from '../../middleware/asyncHandler.js';

import { PostController } from '../controllers/post.js';
const post = new PostController();

router.get('/', asyncHandler(post.findAll))
router.get('/:id', asyncHandler(post.findPost))

router.post('/create', protect, multerFields, asyncHandler(post.createPost))
router.post('/like/:id', protect, asyncHandler(post.like))

router.put('/update/:id', protect, Admin_Or_Owner_Post, multerFields, asyncHandler(post.update))
router.delete('/delete/:id', protect, Admin_Or_Owner_Post, asyncHandler(post.deletePost))

export default router;