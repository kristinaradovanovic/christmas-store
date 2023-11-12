import { CartItem } from "./types/CartItems";
import { Product } from "./types/Product";

export const cartItemProduct = (product: Product): CartItem => {
    const cartItem: CartItem = {
        name: product.name,
        description: product.description,
        price: product.price,
        id: product.id,
        stock: product.stock,
        image: product.image,
        quantity: 1
    }
    return cartItem
}