import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import requests from '../../api/requests';
import { toast } from 'react-toastify';
import CartSummary from './CartSummary';

export default function ShoppingCartPage() {

    const { setCart,cart } = useCartContext();
    const [status, setStatus] = useState({loading: false, id: ""});

    if (!cart) return <h1>Sepetinizde Ürün Yok</h1> 

    function handleAddItem(productId: number, id: string) {

        setStatus({ loading: true, id: id });
  
        requests.Cart.addItem(productId)
          .then(cart => setCart(cart))
          .catch(error => console.log(error))
          .finally(() => setStatus({ loading: false, id: "" }));
  
      }

    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({ loading: true, id: id });
  
        requests.Cart.deleteItem(productId, quantity)
          .then((cart) => setCart(cart))
          .catch(error => console.log(error))
          .finally(() => setStatus({ loading: false, id: "" }));
      }

    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ürün</TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="right">Adet</TableCell>
            <TableCell align="right">Toplam</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((items) => (
            <TableRow
              key={items.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                <img src={`http://localhost:5194/images/${items.imageUrl}`} alt={items.name} style={{width: 50, height: 50}}/>
              </TableCell>
              <TableCell component="th" scope="row">
                {items.name}
              </TableCell>
              <TableCell align="right">{items.price} ₺</TableCell>
              <TableCell align="right">
              <LoadingButton 
                    loading={status.loading && status.id === "add" + items.productId} 
                    onClick={() => handleAddItem(items.productId, "add" + items.productId)}>
                    <AddCircleOutline />
                  </LoadingButton>
                  {items.quantity}
                  <LoadingButton 
                    loading={status.loading && status.id === "del" + items.productId} 
                    onClick={() => handleDeleteItem(items.productId, "del" + items.productId)}>
                    <RemoveCircleOutline />
                  </LoadingButton>
              </TableCell>
              <TableCell align="right">{items.price * items.quantity} ₺</TableCell>
              <TableCell align="right">
                    <LoadingButton color="error" 
                      loading={status.loading && status.id === "del_all" + items.productId} 
                      onClick={() => {
                          handleDeleteItem(items.productId, "del_all" + items.productId, items.quantity);
                          toast.error("Ürün sepetinizden silindi.");
                        }}>
                        <Delete />
                    </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
          {/* cart summary */}
          <CartSummary />
        </TableBody>
      </Table>
    </TableContainer>
    );
}