import { useEffect, useState } from 'react';
import { IProduct } from '../model/IProduct';
import Header from './Header'
import { Container } from '@mui/material'
import ProductList from './ProductList';

function App() {

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:5194/api/Products")
    .then(res => res.json())
    .then(data => setProducts(data));
  },[]);

  return (
    <>
      <Header />
      <Container>
        <ProductList products={products}/>
      </Container>
    </>
  )
}

export default App
