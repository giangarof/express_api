import express from 'express';
const router = express.Router();
import { multerFields } from '../../config/multer.js';

import { administrator, protect, Admin_Or_Owner_User } from '../../middleware/admin.js';

import {
    login,
    signup,
    logout,
    update,
    getAll,
    getUser,
    deleteUser,
    follow
} from '../controllers/user.js'

import asyncHandler from '../../middleware/asyncHandler.js';

router.get('/getall', protect, administrator, getAll)
router.get('/:id', protect, getUser)

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

router.post('/follow/:id', protect, follow)


router.put('/update/:id', protect, Admin_Or_Owner_User, multerFields, update)
router.delete('/delete/:id', protect, Admin_Or_Owner_User, deleteUser)

export default router;