import { useParams } from "react-router-dom"
import { useGetProductInfoQuery } from "../ReactHooks/productHooks"
import { Badge, Button, Col, Row } from "react-bootstrap";


export default function ProductDetailed() {

  const params = useParams()
  const {id} = params
  const productId = id ? parseInt(id, 10) : undefined;
  const { data: product } = useGetProductInfoQuery(productId || -1);


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
                <Button >Add to Cart</Button>
              </>
            )}
        </Col>
      </Row>
    
    </div>
  )
}
