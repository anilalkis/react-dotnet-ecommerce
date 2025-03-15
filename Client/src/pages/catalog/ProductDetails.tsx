import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import { Divider, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function ProductDetails()
{
    const {cart, setCart} = useCartContext();
    const { id } = useParams<{id: string}>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    const item = cart?.cartItems.find(i => i.productId == product?.id);

    useEffect(() => {
        id && requests.Catalog.details(parseInt(id))
            .then(data => setProduct(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    function handleAddItem(id: number) {
        setIsAdded(true);

        requests.Cart.addItem(id)
            .then(cart => {
                setCart(cart);
                toast.success("Sepetinize eklendi.");
            })
            .catch(error => console.log(error))
            .finally(() => setIsAdded(false));
    }
    if(loading) return <h1>Loading...</h1>;

    if(!product) return <h1>Product not found</h1>;

    return(
        <Grid2 container spacing={6}>
        <Grid2 size={{xl: 3, lg: 4, md: 5, sm: 6, xs: 12}}>
            <img src={`http://localhost:5194/images/${product.imageUrl}`} style={{width: "100%"}}/>
        </Grid2>
        <Grid2 size={{xl: 9,lg: 8, md: 7, sm: 6, xs: 12}}>
            <Typography variant="h3">{product.productName}</Typography>
            <Divider sx={{mb:2}} />
            <Typography variant="h4" color="secondary">{ (product.price).toFixed(2) } ₺</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.productName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Stock</TableCell>
                            <TableCell>{product.stock}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} sx={{mt: 3}} alignItems="center">
                    <LoadingButton 
                        variant="outlined" 
                        loadingPosition="start"
                        startIcon={<AddShoppingCart />}
                        loading={isAdded}
                        onClick={() => handleAddItem(product.id)}>
                        Sepete Ekle
                    </LoadingButton>

                    {
                        item?.quantity! > 0 && (
                            <Typography variant="body2">Sepetinize {item?.quantity} adet eklendi</Typography>
                        )
                    }
                </Stack>
        </Grid2>
   </Grid2>
    );
}