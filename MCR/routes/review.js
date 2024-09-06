import express from 'express';
const router = express.Router();
import { 
    administrator, 
    protect,
 } from '../../middleware/admin.js';

import { 
    create, 
    update,
    deleteReview,
    like

} from '../controllers/review.js';


router.post('/create/:id', protect, create)
router.post('/like/:id', protect, like)
router.put('/update/:id', protect, update)
router.get('/delete/:id', protect, deleteReview)

export default router;