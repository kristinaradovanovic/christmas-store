import express from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel';


export const productRouter = express.Router();

productRouter.get('/', asyncHandler(async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
})
)

productRouter.get('/:id', asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({id: req.params.id})
    if (product){
        res.json(product)
    } else {
        res.status(404).json({message: 'Product not found'})
    }
})
)
productRouter.post('/addToCart/:id', asyncHandler(async (req, res) => {
    console.log('Received payload:', req.query); 
    const productId = req.params.id;
    const quantityParam = req.query.quantity;

    const quantity = typeof quantityParam === 'string' ? parseInt(quantityParam, 10) : 1;

    const product = await ProductModel.findOne({ id: productId });

    if (product) {
        product.quantity = (Number(product.quantity) || 0) + quantity;
        await product.save();

        res.json({ message: 'Product added to cart successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
}));







