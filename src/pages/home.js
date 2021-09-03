import React from "react";
import { CartProvider } from "react-use-cart";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Header from "../components/Header"
import ListaEmpleados from "../components/ListaEmpleador";
import ProductCard from "../components/ProductCard";
import product_data from "../data/product_data";

export default function Home() {
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
