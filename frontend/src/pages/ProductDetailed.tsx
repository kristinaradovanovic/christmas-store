import { useNavigate, useParams } from "react-router-dom"
import { useGetProductInfoQuery } from "../ReactHooks/productHooks"
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useContext} from "react";
import { Store } from "../Store";
import {cartItemProduct} from '../utils'
import { CartItem } from "../types/CartItems";

export default function ProductDetailed() {

  const params = useParams()
  const {id} = params
  const productId = id ? parseInt(id, 10) : undefined;
  const { data: product } = useGetProductInfoQuery(productId || -1);

  const {dispatch} = useContext(Store)


  const navigate = useNavigate()

  const addToCartFunction = () => {
    const existingItem = localStorage.getItem('cartItems');
    const cartItems = existingItem ? JSON.parse(existingItem) : [];

    const existingCartItem = cartItems.find((x: CartItem) => x.id === product!.id);
    const quantity = existingCartItem ? existingCartItem.quantity + 1 : 1;

    const newCartItem: CartItem = { ...cartItemProduct(product!), quantity };

    const updatedCartItems = existingCartItem
      ? cartItems.map((item: CartItem) => (item.id === existingCartItem.id ? newCartItem : item))
      : [...cartItems, newCartItem];

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    dispatch({
      type: 'ADD_ITEM',
      payload: newCartItem,
    });

    navigate('/cart');
  };

 
  return (
    <div>
      <Row>
        <Col md={6}>
          <img src={product?.image} alt={product?.name} className="large"/>
        </Col>
        <Col md={6}>
          {product && (
              <>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: {product.price}$</p>
                {product.stock > 0 ? (
                  <Badge bg="success"> {product.stock} In Stock</Badge>
                  ) : (
                  <Badge bg="danger">Unavailable</Badge>
                )}
                <br/>
                <br/>
                <br/>
                <Button onClick={addToCartFunction} >Add to Cart</Button>
              </>
            )}
        </Col>
      </Row>
    
    </div>
  )
}
