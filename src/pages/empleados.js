import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header"
import ListaEmpleados from "../components/ListaEmpleador";


export default function Empleados() {

    return (
        <div>
            <Header/>
            <ListaEmpleados/>
        </div>
    )
}
