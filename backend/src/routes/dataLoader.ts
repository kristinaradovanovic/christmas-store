import express, {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel';
import { productsData } from '../data';

export const dataLoaderRouter = express.Router();


dataLoaderRouter.get('/', asyncHandler( async (req: Request, res: Response) => {
      await ProductModel.deleteMany({})
      const createdProducts = await ProductModel.insertMany(productsData)
      res.json({createdProducts})
    })
  )
  export default dataLoaderRouter