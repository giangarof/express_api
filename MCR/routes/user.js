import express from 'express';
const router = express.Router();
import { multerFields } from '../../config/multer.js';

import { administrator, protect, Admin_Or_Owner_User } from '../../middleware/admin.js';

import { UserController } from '../controllers/user.js';
const user = new UserController();


import asyncHandler from '../../middleware/asyncHandler.js';

router.get('/getall', protect, administrator, asyncHandler(user.getAll))
router.get('/:id', protect, asyncHandler(user.getUser))

router.post('/login', asyncHandler(user.login))
router.post('/signup', asyncHandler(user.signup))
router.post('/logout', user.logout)

router.post('/follow/:id', protect, asyncHandler(user.follow))


router.put('/update/:id', protect, Admin_Or_Owner_User, multerFields, asyncHandler(user.update))
router.delete('/delete/:id', protect, Admin_Or_Owner_User, asyncHandler(user.deleteUser))

export default router;