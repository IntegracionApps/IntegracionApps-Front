import React from "react";
import Header from "../components/Header"
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart"


export default function Home() {

    return (
        <div>
            <Header/>
            <Cart></Cart>
        </div>
    )
}