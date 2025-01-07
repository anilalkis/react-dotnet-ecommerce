import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";

interface Props{
    product: IProduct
}

export default function Product(props : Props)
{
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
                    <Button variant="outlined" size="small" startIcon={<AddShoppingCart/>}>Add to cart</Button>
                    <Button component={Link} to={`/catalog/${props.product.id}`} variant="outlined" size="small" startIcon={<SearchIcon/>}>View</Button>
                </CardActions>
            </CardContent>
        </Card>
    
    );
}