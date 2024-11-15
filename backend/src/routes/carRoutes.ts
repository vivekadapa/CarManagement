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
const upload = multer({ dest: "/uploads" });


const router = Router();

//@ts-ignore
router.post('/', verifyToken, upload.array('images', 10), addCar);
//@ts-ignore
router.get('/', verifyToken, getUserCars);
//@ts-ignore
router.get('/search', searchCars);
//@ts-ignore
router.get('/:id', verifyToken, getCarById);
//@ts-ignore
router.put('/:id', verifyToken, upload.array('images', 10), updateCar);
//@ts-ignore
router.delete('/:id', verifyToken, deleteCar);

export default router;
