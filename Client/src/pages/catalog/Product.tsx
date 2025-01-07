import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';

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
                    {props.product.name}
                </Typography>
                <Typography variant="body2" color="seconry">
                    {(props.product.price / 100).toFixed()} ₺
                </Typography>
                <CardActions>
                    <Button variant="outlined" size="small" startIcon={<AddShoppingCart/>}>Add to cart</Button>
                    <Button variant="outlined" size="small" startIcon={<SearchIcon/>}>View</Button>
                </CardActions>
            </CardContent>
        </Card>
    
    );
}