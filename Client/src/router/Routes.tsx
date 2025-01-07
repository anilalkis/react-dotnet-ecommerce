import App from "../components/App";
import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import AboutPgae from "../pages/AboutPage";
import CatalogPage from "../pages/catalog/CatalogPage";
import ProductDetails from "../pages/catalog/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "", element: <HomePage/>},
            {path: "about", element: <AboutPgae/>},
            {path: "catalog", element: <CatalogPage/>},
            {path: "catalog/:id", element: <ProductDetails/>},
        ]
    }
]);