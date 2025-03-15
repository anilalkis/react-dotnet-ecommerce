import Header from './Header'
import { CircularProgress, Container } from '@mui/material'
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from '../context/CartContext';
import { useEffect, useState } from 'react';
import requests from '../api/requests';

function App() {

  const { setCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    requests.Cart.get()
      .then(cart => setCart(cart))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if(loading) return <CircularProgress />;

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
