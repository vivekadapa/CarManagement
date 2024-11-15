import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';
import userRoutes from './routes/userRoutes'
import { connectToDatabase } from './db/connectDb';
import { configDotenv } from 'dotenv';
import cors from 'cors'

const app = express();

configDotenv()
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}),);


connectToDatabase();
app.get('/', (req: Request, res: Response) => {
    res.send('Car Management Application');
});

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/user', userRoutes)


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
}); 
