import { Router } from 'express';
import { getUser } from '../controllers/userController';

const router = Router();


//@ts-ignore
router.get('/', getUser)


export default router