import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function NuevaVenta(){
    return(
        <div>
            <Header/>
            <h1>Nueva Venta</h1>
            <Link to="/">Volver a la tienda</Link>
        </div>
    )
}