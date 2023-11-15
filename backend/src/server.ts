import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { productRouter } from './routes/productRouter';
import dataLoaderRouter from './routes/dataLoader';


dotenv.config()

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/christmas-store'
  mongoose.set('strictQuery', true)
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('connection ok')
    })
    .catch(() => {
      console.log('error')
  })

const app = express();
app.use(cors());
app.use('/api/products', productRouter)
app.use('/api/data', dataLoaderRouter)

const PORT = 5000 || process.env.PORT; 

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


