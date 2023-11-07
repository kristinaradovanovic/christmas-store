import { Row, Col} from 'react-bootstrap'
import ProductItem from '../components/ProductItem'
import { useGetProductsQuery } from '../ReactHooks/productHooks'

export default function Home() {

  const { data: products} = useGetProductsQuery()

  if (!products) {
    return <div>Loading...</div>; 
  }


  return (
    <Row>
          {products.map(product => 
            <Col key={product.id} sm={6} md={4} lg={3}>
              <ProductItem product={product}/>
            </Col>
          )}
    </Row>
  )
}
