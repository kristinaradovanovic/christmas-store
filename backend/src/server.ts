import express, { Request, Response } from 'express';
import cors from 'cors';
import { productsData } from './data';

const app = express();


app.use(cors()); 
app.get('/api/products', (req: Request, res: Response) => {
  res.json(productsData);
});


app.get('/api/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);
  res.json(productsData.find((p) => p.id === productId));
});


const PORT = 5000 || process.env.PORT; 

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


