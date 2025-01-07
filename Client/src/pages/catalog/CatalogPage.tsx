import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";

export default function CatalogPage()
{
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
      requests.Catalog.list()
      .then(data => setProducts(data));
    },[]);

    return(
        <ProductList products={products}/>
    );
}