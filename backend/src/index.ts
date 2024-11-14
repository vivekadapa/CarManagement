import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';
import { connectToDatabase } from './db/connectDb';
const app = express();

app.use(express.json());



connectToDatabase();
// Basic route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Car Management Application');
});

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 
