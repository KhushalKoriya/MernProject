import express from 'express';
import { authCheck, loginUser, logoutUser, registerUser, tokenIsValid } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

//Authentication
router.post('/Register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/tokenIsValid', tokenIsValid);
router.get('/authcheck', auth,authCheck);

export default router;