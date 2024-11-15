import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authSchema } from '../schemas/authSchema';
import db from '../db/connectDb';
import { Request, Response } from 'express';
import { z } from 'zod';


export const Signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = authSchema.parse(req.body);
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRY,
        });

       return  res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = authSchema.parse(req.body);
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRY,
        });

        return res.json({ message: "Login successful", token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

