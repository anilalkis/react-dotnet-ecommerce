import { ShoppingCart } from "@mui/icons-material";
import { AppBar,Badge,Box,IconButton,List,ListItem,Toolbar,Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useCartContext } from "../context/CartContext";

const links = [
    {title: "Home", path: "/"},
    {title: "About", path: "/about"},
    {title: "Catalog", path: "/catalog"},
    {title: "Contact", path: "/contact"}
]

const navStyle = {
    color: "inherit",
    textDecoration: "none",
    "&:hover":{
        color:"text.primary"
    },
    "&.active": {
        color: "text.secondary"
    }
}

export default function Header()
{
    const { cart } =  useCartContext();
    const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography variant="h6">E-Commerce</Typography>
                    <List sx={{display:"flex"}}>
                        {
                            links.map(link => (
                                <ListItem key={link.title} component={NavLink} to={link.path} sx={navStyle}>{link.title}</ListItem>
                            ))
                        }
                    </List>
                </Box>

                <Box sx={{display:"flex",alignItems:"center"}}>
                    <IconButton component={Link} to="/cart" size="large" edge="start" color= "inherit">
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}