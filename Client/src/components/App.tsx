import Header from './Header'
import { Container } from '@mui/material'
import { Outlet } from 'react-router';

function App() {



  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
