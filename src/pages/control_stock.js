import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function ControlStock(){
    return(
        <div>
            <Header/>
            <h1>Contorl de Stock</h1>
            <Link to="/">Volver a la tienda</Link>
        </div>
    )
}