
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRouter.js';
import addressRoutes from './routes/address.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});



connectDB();


app.listen(5000, () => {
  console.log("Server running on port 5000");
});


