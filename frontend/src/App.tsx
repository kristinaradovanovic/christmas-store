import { Navbar, Container, Nav} from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='d-flex flex-column vh-100'>
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' >
        <Container>
          <Navbar.Brand>Winter Wonderland Decor</Navbar.Brand>
        </Container>
        <Nav>
          <a href="/cart" className='nav-link'>Cart</a>
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
