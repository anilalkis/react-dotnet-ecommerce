import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { useCartContext } from "../../context/CartContext";

interface Props{
    product: IProduct
}

export default function Product(props : Props)
{
    const { setCart } = useCartContext();
    const [loading, setLoading] = useState(false);
    function handleAddItem(productId: number)
    {
        setLoading(true);

        requests.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return(
        <Card>
            <CardMedia sx={{height: 160, backgroundSize: "contain"}} image={`http://localhost:5194/images/${props.product.imageUrl}`}/>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" color="text-secondy">
                    {props.product.productName}
                </Typography>
                <Typography variant="body2" color="seconry">
                    {(props.product.price).toFixed(2)} ₺
                </Typography>
                <CardActions>
                    <LoadingButton variant="outlined" size="small" 
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<AddShoppingCart/>} 
                            onClick={() =>handleAddItem(props.product.id)}>Add to cart</LoadingButton>
                    <Button component={Link} to={`/catalog/${props.product.id}`} variant="outlined" size="small" startIcon={<SearchIcon/>}>View</Button>
                </CardActions>
            </CardContent>
        </Card>
    
    );
}