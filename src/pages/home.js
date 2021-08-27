import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header"
import ListaEmpleados from "../components/ListaEmpleador";
import ProductCard from "../components/ProductCard";


export default function Home() {

    return (
        <div>
            <Header/>
            {/* <div>dsafdsafgds</div> */}
            <ProductCard/>
            <Link to="/NuevaVenta">Nueva Venta</Link>
            <ListaEmpleados/>
        </div>
    )
}
