import { Fab } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import {React, useEffect, useState} from "react";
import { CartProvider } from "react-use-cart";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import product_data from "../data/product_data.js";

export default function Home() {
    // console.log(product_data);
    
    // const [product_data, setData] = useState([]);
    // const axios = require('axios');
    // useEffect(() => {
    //     axios.get('http://localhost:5000/Products/get/all')
    //         .then(function (response) {
    //             console.log(response);
    //             setData(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    //         .then(function () {
    //             console.log("default");
    //         });
    // }, [])

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
