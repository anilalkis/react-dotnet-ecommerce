import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

export default function ProductDetails()
{
    const {id} = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5194/api/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    },[id]);

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
        </Grid2>
   </Grid2>
    );
}