import Header from './Header'
import { Container } from '@mui/material'
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {



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
