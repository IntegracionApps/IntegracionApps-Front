import React from "react";
import { CartProvider } from "react-use-cart";
import Cart from "../components/Cart";
import Header from "../components/Header";


export default function Home(props) {
    return (
        <div>
            <Header />
            <CartProvider>
                <Cart cart={props.location.state} />
            </CartProvider>
        </div>
    )
}