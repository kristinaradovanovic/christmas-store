import { Button, Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";

function ProductItem({product}:{product: Product}) {
    return(
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
                )
                : (
                    <Button>Add to cart</Button>
                )
            }
            </Card.Body>
        </Card>
       
    )
} 

export default ProductItem