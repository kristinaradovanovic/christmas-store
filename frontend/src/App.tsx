import { Navbar, Container, Nav, Badge} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useContext} from 'react'
import { Store } from './Store'
import { LinkContainer } from 'react-router-bootstrap';

function App() {

  const { state: { cart }, } = useContext(Store);
  console.log('Current Cart State:', cart);

  return (
    <div className='d-flex flex-column vh-100'>
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'  className='navBarClass'>
        <Container>
          <LinkContainer to='/'><Navbar.Brand>Winter Wonderland Decor</Navbar.Brand></LinkContainer>
        </Container>
        <Nav>
          <Link to="cart" className='nav-link'>Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg='danger'>
                {cart.cartItems.reduce((a,c) => a + c.quantity, 0 )}
              </Badge>
            )}
          </Link>
        </Nav>
      </Navbar>
    </header>

    <main>
      <Container className='mt-3'>
        <Outlet/>
      </Container>
    </main>

    <footer>
      <div className='text-center'>@all rigts reserved</div>
    </footer>
  </div>
  )
}

export default App
