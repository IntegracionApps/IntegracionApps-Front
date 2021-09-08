import { Fab } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import { CartProvider } from "react-use-cart";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import product_data from "../data/product_data";

export default function Home() {
    // console.log(product_data);
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <Header />
            <Fab variant="extended" style={{alignSelf:"end", margin: "1.5% 2% 0 0"}} >
                <ShoppingCart />
                 Carrito
            </Fab>
            <CartProvider>
                <ProductCard product_data={product_data} />
            </CartProvider>
            {/* <Link to="/NuevaVenta">Nueva venta</Link> */}
        </div>
    )
}
