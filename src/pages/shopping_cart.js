import React from "react";
import Header from "../components/Header"
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart"
import { CartProvider } from "react-use-cart";


export default function Home({product_data}) {

    return (
        <div>
            <Header />
            {/* <h1>Hola</h1> */}
            <CartProvider>
                <Cart product_data={product_data}/>
            </CartProvider>
        </div>
    )
}