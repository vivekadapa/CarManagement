//@ts-nocheck

import { Router } from 'express';
import { Signup, Login } from '../controllers/authController';


const router = Router();


router.post('/signup',  Signup);
router.post('/login', Login);


export default router;
