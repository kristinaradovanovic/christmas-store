import './App.css'
import { productsData } from './data'

function App() {

  return (
    <div>
    <header>
      The Holiday Home Shop
    </header>

    <main>
     <ul>
      {productsData.map(product => 
        <li key={product.id}>
          <img 
            src={product.image} 
            alt={product.name} 
            className='product-image' />

          <h2>{product.name}</h2>
          <p>{product.price}$</p>
        </li>
      )}
     </ul>
    </main>

    <footer>
      @all rigts reserved
    </footer>
  </div>
  )
}

export default App
