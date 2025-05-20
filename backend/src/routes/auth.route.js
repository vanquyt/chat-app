import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { logIn, logOut, signUp, updateProfile } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);
router.put('/update-profile', protectRoute, updateProfile);

export default router;