import express from 'express';
import { authCheck, forgotpassword, loginUser, logoutUser, registerUser, resetpassword, sendotp, tokenIsValid, verifyotp } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

//Authentication
router.post('/Register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/tokenIsValid', tokenIsValid);
router.get('/authcheck', auth,authCheck);
router.post('/forgot-password', forgotpassword);
router.post('/reset-password/:token', resetpassword);
router.post('/otp', sendotp);
router.post('/otp/verify/:token',verifyotp);

export default router;