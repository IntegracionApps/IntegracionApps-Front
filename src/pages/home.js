import React from "react";
import Header from "../components/Header"
import ProductCard from "../components/ProductCard";
import ItemCard from "../components/ItemCard";
// import product_data from "../data/product_data";
import { Link } from "@material-ui/core";

export default function Home({product_data}) {
    // console.log(product_data);
    return (
        <div>
            <Header />
            <ProductCard product_data={product_data}/>
            {/* <Link to="/NuevaVenta">Nueva venta</Link> */}
        </div>
    )
}
