import { Router } from 'express';
import { Signup, Login } from '../controllers/authController';


const router = Router();


//@ts-ignore
router.post('/signup',  Signup);
//@ts-ignore
router.post('/login', Login);


export default router;
