import { ButtonGroup, Divider, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
// import product_data from '../data/product_data.js'

export default function ControlStock() {

    const [product_data, setData] = useState([]);
    const axios = require('axios');
    useEffect(() => {
        axios.get('http://localhost:5000/Products/get/all')
            .then(function (response) {
                console.log(response);
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("default");
            });
    }, [])



    function handleUpdate(item, num) {
        switch (num) {
            case -1:
                console.log("Se ha quitado una unidad de " + item.descrip);
                break;
            case 1:
                console.log("Se ha agregado una unidad de " + item.descrip);
                break;
        }

    }

    return (
        <div>
            <Header />
            <h1>Contorl de Stock</h1>
            <div className="main_content">
                {product_data.map((item, index) => {

                    return (
                        <div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                {item.descrip}: {item.stock}
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <IconButton onClick={() => handleUpdate(item, -1)}>
                                        <Remove />
                                    </IconButton>
                                    <IconButton onClick={() => handleUpdate(item, 1)}>
                                        <Add />
                                    </IconButton>
                                </ButtonGroup>
                            </div>
                            <Divider />
                        </div>
                    )
                })}
            </div>
            <Link to="/">Volver a la tienda</Link>
        </div>
    )
}