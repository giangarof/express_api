import express from 'express';
const router = express.Router();
import { multerPost } from '../../config/multer.js';

import { administrator, protect } from '../../middleware/admin.js';

import {
    login,
    signup,
    logout,
    update,
    getAll,
    deleteUser,
} from '../controllers/user.js'

import asyncHandler from '../../middleware/asyncHandler.js';

router.get('/getall', getAll)

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.put('/update/:id', multerPost, asyncHandler(update))

router.delete('/delete/:id', protect, administrator, deleteUser)

export default router