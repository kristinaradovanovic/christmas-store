import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import './index.css'
import Home from './pages/Home.tsx';
import ProductDetailed from './pages/ProductDetailed.tsx';
import axios from 'axios';


axios.defaults.baseURL =
process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
       <Route index element={<Home/>}/>
       <Route path='product/:id' element={<ProductDetailed/>}/>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
