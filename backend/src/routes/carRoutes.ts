//@ts-nocheck
import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import {
    addCar,
    getUserCars,
    searchCars,
    getCarById,
    updateCar,
    deleteCar,
} from '../controllers/carController';
import multer from 'multer'


// const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });


const router = Router();


router.post('/', verifyToken, upload.array('images', 10), addCar);
router.get('/', verifyToken, getUserCars);
router.get('/search', searchCars);
router.get('/:id', verifyToken, getCarById);
router.put('/:id', verifyToken, upload.array('images', 10), updateCar);
router.delete('/:id', verifyToken, deleteCar);

export default router;
