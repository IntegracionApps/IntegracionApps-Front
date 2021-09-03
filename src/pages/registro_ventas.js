import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function RegistroVentas(){
    return(
        <div>
            <Header/>
            <h1>Registro de Ventas</h1>
            <Link to="/">Volver a la tienda</Link>
        </div>
    )
}