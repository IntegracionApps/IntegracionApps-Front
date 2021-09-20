import { ButtonGroup, Divider, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
// import product_data from '../data/product_data.js'

export default function ControlStock() {
    const [product_data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:5000/Products/get/all')
            .then(function (response) {
                // console.log(response);
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setRefresh(false)
    }, [refresh])



    function handleUpdate(item, num) {
        console.log(item);
        let newQuantity = item.stock + num;
        axios.post("http://localhost:5000/Products/update/" + item.id, {
            newQuantity: newQuantity
        })
            .then((res) => { console.log(res.statusText) });
        // switch (num) {
        //     case -1:
        //         axios.post("http://localhost:5000/Products/update/" + item.id, {
        //             newQuantity: newQuantity
        //         })
        //             .then((res) => { console.log(res.statusText) });
        //         // console.log("Se ha quitado una unidad de " + item.descrip);
        //         break;
        //     case 1:
        //         axios.post("http://localhost:5000/Products/update/" + item.id, {
        //             newQuantity: newQuantity
        //         })
        //             .then((res) => { console.log(res.statusText) });
        //         console.log("Se ha agregado una unidad de " + item.descrip);
        //         break;

        setRefresh(true);
    }

    return (
        <div>
            <Header />
            <h1>Control de Stock</h1>
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