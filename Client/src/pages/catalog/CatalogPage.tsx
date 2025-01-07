import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { IProduct } from "../../model/IProduct";

export default function CatalogPage()
{
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
      fetch("http://localhost:5194/api/Products")
      .then(res => res.json())
      .then(data => setProducts(data));
    },[]);

    return(
        <ProductList products={products}/>
    );
}