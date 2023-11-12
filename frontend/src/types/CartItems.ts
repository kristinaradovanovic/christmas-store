export type CartItem = {
    name: string,
    description: string,
    price: number,
    id: number,
    stock: number,
    quantity: number,
    image: string | undefined
}

export type Cart = {
    totalPrice: number,
    cartItems: CartItem[],
}