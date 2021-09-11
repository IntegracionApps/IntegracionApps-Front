import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header"
import ListaEmpleados from "../components/ListaEmpleador";


export default function Empleados() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const axios = require('axios');
        axios.get("http://localhost:5000/Users/get/all")
            .then(function (response) {
                console.log(response.status + " " + response.statusText);
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("default");
            });
    }, []);

    

    return (
        <div>
            <Header />
            <ListaEmpleados employee_data={data} />
        </div>
    )
}
