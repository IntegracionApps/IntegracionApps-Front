import React from "react";
import { useHistory } from "react-router";
import Header from "../components/Header";

export default function NuevaVenta(){
    const history= useHistory();


    return(
        <div>
            <Header/>
            <h1>Nueva Venta</h1>
            <a onClick={() =>{history.goBack()}} style={{color:"blue"}}>Volver</a>
        </div>
    )
}