import { Button, Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import {useContext} from 'react'
import { CartItem } from "../types/CartItems";
import { cartItemProduct } from "../utils";

function ProductItem({ product }: { product: Product }) {
    const { dispatch } = useContext(Store);
  
    const addToCartFunction = (item: CartItem) => {
      const existingItem = localStorage.getItem('cartItems');
      const cartItems = existingItem ? JSON.parse(existingItem) : [];

      const existItem = cartItems.find((x: CartItem) => x.id === product.id);
      const quantity = existItem ? existItem.quantity + 1 : 1;

      const newCartItem = { ...item, quantity };

      const updatedCartItems = existItem
      ? cartItems.map((item: CartItem) => (item.id === existItem.id ? newCartItem : item))
      : [...cartItems, newCartItem];

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
      dispatch({
        type: 'ADD_ITEM',
        payload: newCartItem,
      });
      
      console.log('Cart Items in localStorage:', localStorage.getItem('cartItems'));
  
      console.log('Cart updated:', cartItems);
    };
  
    return (
      <Card className="card">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className='card-img-top' />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text>{product.price}$</Card.Text>
          {product.stock === 0 ? (
            <Button variant="light" disabled >Out of stock</Button>
          ) : (
            <Button onClick={() => addToCartFunction(cartItemProduct(product))}>Add to cart</Button>
          )}
        </Card.Body>
      </Card>
    );
  }
  
  export default ProductItem;