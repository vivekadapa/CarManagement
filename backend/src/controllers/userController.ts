import { Request, Response } from 'express';
import db from '../db/connectDb';

export const getUser = async (req: Request, res: Response) => {

    //@ts-ignore
    const userId = req?.userId

    if (!userId) {
        return res.status(400).json({ message: "User not authenticated" });
    }

    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: {
                password: false
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);

    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};