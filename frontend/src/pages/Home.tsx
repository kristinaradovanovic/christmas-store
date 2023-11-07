import { Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Product } from '../types/Product'
import { useReducer, useEffect} from "react"
import axios from 'axios'

type State = {
  products: Product[],
  isLoading: boolean,
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | {
      type: 'FETCH_SUCCESS'
      payload: Product[]
    }


  const initialState: State = {
    products: [],
    isLoading: true,
  }
 
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true }
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false }
      default:
        return state
    }
  }


export default function Home() {

  const [{ products }, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      const result = await axios.get('/api/products');
      
      if (result.status === 200) {
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      }
  }
  fetchData()
  }, [])
  
  return (
    <Row>
          {products.map(product => 
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
