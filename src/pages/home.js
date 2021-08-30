import React from "react";
import Header from "../components/Header"
import ProductCard from "../components/ProductCard";
import ItemCard from "../components/ItemCard";
// import product_data from "../data/product_data";
import { Link } from "@material-ui/core";
import { CartProvider } from "react-use-cart";

export default function Home({ product_data }) {
    // console.log(product_data);
    return (
        <div>
            <Header />
            <CartProvider>
                <ProductCard product_data={product_data} />
            </CartProvider>
            {/* <Link to="/NuevaVenta">Nueva venta</Link> */}
        </div>
    )
}
