import express, { Request, Response } from 'express' 
import { productsData } from './data'



const app = express()
app.get('/api/products', (req: Request, res: Response) => {
  res.json(productsData)
})
const PORT = 5000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})