import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import { connectCloudinary } from './cloudinary.js';
import userRouter from './routes/user.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//Middlewares
app.use(cors());
app.use(express.json());

//Api endpoints

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('Hello World');

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});