import express, { Request, Response } from 'express';
import cors from 'cors';
import { productsData } from './data';

const app = express();


app.use(cors()); 
app.get('/api/products', (req: Request, res: Response) => {
  res.json(productsData);
});


const PORT = 5000 || process.env.PORT; 

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});