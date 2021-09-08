import { ButtonGroup, Button, IconButton, Divider } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import product_data from '../data/product_data.js'

export default function ControlStock() {

    function handleUpdate(item, num) {
        switch (num) {
            case -1:
                console.log("Se ha quitado una unidad de " + item.name);
                break;
            case 1:
                console.log("Se ha agregado una unidad de " + item.name);
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
                                {item.name} + *inserte item.quantity*
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