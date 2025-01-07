import { Grid2 } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import Product from "./Product";

interface Props{
    products: IProduct[];
}


export default function ProductList(props : Props)
{
    return(
        <Grid2 container spacing={2}>
            {
                props.products.map((p: IProduct) => (
                    <Grid2 key={p.id} size={{xs:5, md:4, xl:3}}>
                        <Product key={p.id} product={p} />
                    </Grid2>
                ))
            }
        </Grid2>
    );
}