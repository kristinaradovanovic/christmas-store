import { Row, Col} from 'react-bootstrap'
import { productsData } from '../data'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Row>
          {productsData.map(product => 
            <Col key={product.id} sm={6} md={4} lg={3}>
              <Link to={'/product/' + product.id}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className='product-image' />

                <h2>{product.name}</h2>
                <p>{product.price}$</p>
              </Link>
            </Col>
          )}
    </Row>
  )
}
