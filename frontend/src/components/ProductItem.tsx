import { Button, Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { useContext } from 'react';
import { CartItem } from "../types/CartItems";
import { cartItemProduct } from "../utils";


function ProductItem({ product }: { product: Product }) {
  const { dispatch } = useContext(Store);

  const addToCartFunction = async (item: CartItem) => {
    console.log('Payload:', { cartQuantity: item.quantity });
    try {
      const response = await fetch(`http://localhost:5000/api/products/addToCart/${item.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
  body: JSON.stringify({ quantity: item.quantity }), 
});
  
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'ADD_ITEM',
          payload: item,
        });
        console.log('Product added to cart on the server');
      } else {
        console.error('Failed to add product to cart on the server');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <Card>
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