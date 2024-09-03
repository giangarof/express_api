import express from 'express';
const router = express.Router();
import { 
    administrator, 
    protect,
    
 } from '../../middleware/admin.js';
import { multerFields } from '../../config/multer.js';
import { 
    createPost, 
    findAll,
    findPost,
    deletePost,
    like

} from '../controllers/post.js';

router.get('/', findAll)
router.get('/:id', findPost)

router.post('/create', protect, multerFields, createPost)
router.post('/like/:id', protect, like)

router.delete('/delete/:id', protect, deletePost)

export default router;