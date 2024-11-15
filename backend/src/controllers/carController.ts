//@ts-nocheck
import { Request, Response } from 'express';
import db from '../db/connectDb';
import { AuthRequest } from '../middleware/verifyToken';
import cloudinary from '../utils/cloudinaryConfig';


export const addCar = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, car_type, company, dealer } = req.body;
        if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
        if (req?.files?.length > 10) {
            return res.status(400).json({ error: "You can upload a maximum of 10 images" });
        }
        console.log(req.files)
        const imageUrls = [];

        try {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'cars'
                });
                imageUrls.push(result.secure_url);
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Error uploading images" })
        }

        console.log(imageUrls);

        const newCar = await db.car.create({
            data: {
                title,
                description,
                images: imageUrls,
                car_type,
                company,
                dealer,
                userId: req.userId,
            },
        });

        res.status(201).json(newCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add car" });
    }
};

export const getUserCars = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

        const cars = await db.car.findMany({
            where: { userId: req.userId },
        });

        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve cars" });
    }
};

export const searchCars = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    if (!req.userId) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    // if (!keyword) return res.status(400).json({ error: "Keyword is required" });

    try {
        const cars = await db.car.findMany({
            where: {
                userId: req.userId,
                OR: [
                    { title: { contains: keyword as string, mode: 'insensitive' } },
                    { description: { contains: keyword as string, mode: 'insensitive' } },
                    { car_type: { contains: keyword as string, mode: 'insensitive' } },
                    { company: { contains: keyword as string, mode: 'insensitive' } },
                    { dealer: { contains: keyword as string, mode: 'insensitive' } },
                ],
            },
        });

        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to search cars" });
    }
};

export const getCarById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const car = await db.car.findUnique({ where: { id: parseInt(id) } });
        if (!car || car.userId !== req.userId) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get car details" });
    }
};



export const updateCar = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, images, car_type, company, dealer } = req.body;
    console.log(req.body)
    try {
        const car = await db.car.findUnique({ where: { id: parseInt(id) } });
        if (!car || car.userId !== req.userId) {
            return res.status(404).json({ error: "Car not found" });
        }
        const newImageUrls: string[] = [];

        if (req?.files?.length) {

            if (req.files.length + car.images.length > 10) {
                return res.status(400).json({ error: "You can upload a maximum of 10 images" });
            }


            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'cars'
                });
                newImageUrls.push(result.secure_url);
            }
        }

        const updatedCar = await db.car.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                images: [...car.images, ...newImageUrls],
                car_type,
                company,
                dealer,
            },
        });

        res.json(updatedCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update car" });
    }
};


export const deleteCar = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const car = await db.car.findUnique({ where: { id: parseInt(id) } });
        if (!car || car.userId !== req.userId) {
            return res.status(404).json({ error: "Car not found" });
        }

        await db.car.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete car" });
    }
};
