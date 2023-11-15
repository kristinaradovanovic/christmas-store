import { useContext} from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { CartItem } from '../types/CartItems';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquarePlus, faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function CartPage() {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store)

  const updateCartHandler = async (item: CartItem, quantity: number) => {

    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity },
    })
  }

  const removeItemHandler = (item: CartItem) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  } 

  const decreaseQuantityHandler = (item: CartItem) => {
    const newQuantity = item.quantity - 1;
    updateCartHandler(item, newQuantity);

    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const increaseQuantityHandler = (item: CartItem) => {
    const newQuantity = item.quantity + 1;
    updateCartHandler(item, newQuantity);

    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <div>
    <h1>Shopping Cart</h1>
    <Row>
      <Col md={8}>
        <ListGroup>
          {cartItems.map((item: CartItem) => (
            <ListGroup.Item key={item.id}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded img-thumbnail"
                  />
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </Col>
                <Col md={3}>
                  <Button
                    onClick={() => decreaseQuantityHandler(item)}
                    variant="light"
                    disabled={item.quantity === 1}
                  >
                   <FontAwesomeIcon icon={faSquareMinus} />

                  </Button>{' '}
                  <span>{item.quantity}</span>{' '}
                  <Button
                    variant="light"
                    onClick={() => increaseQuantityHandler(item)}
                    disabled={item.quantity === item.stock}
                  >
                   <FontAwesomeIcon icon={faSquarePlus} />
                  </Button>
                </Col>
                <Col md={3}>${item.price}</Col>
                <Col md={2}><Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button></Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : $
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);
}