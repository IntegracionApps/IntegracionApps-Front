import urlWebServices from "../webServices";
import { ButtonGroup, Divider, IconButton, Typography } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { Add, Remove } from "@material-ui/icons";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import "../styles/ControlStock.css"
// import product_data from '../data/product_data.js'

export default function ControlStock() {
    const [product_data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        axios.get(urlWebServices.getAllProducts)
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
        // console.log(item);
        let newQuantity = item.stock + num;
        axios.post(urlWebServices.updateStock + item.id, {
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
                            {item.stock > item.puntoRepo &&
                                <Alert className={"root_stock"} severity="success" icon={false} variant="outlined"
                                    action={
                                        <div color="primary" aria-label="outlined primary button group">
                                            <IconButton onClick={() => handleUpdate(item, -1)}>
                                                <Remove />
                                            </IconButton>
                                            {item.stock}
                                            <IconButton onClick={() => handleUpdate(item, 1)}>
                                                <Add />
                                            </IconButton>
                                        </div>
                                    }>
                                    {item.descrip}
                                </Alert>
                            }
                            {(0 < item.stock && item.stock <= item.puntoRepo) &&
                                <Alert className={"root_stock"} severity="warning" variant="filled"
                                    action={
                                        <div color="primary" aria-label="outlined primary button group">
                                            <IconButton onClick={() => handleUpdate(item, -1)}>
                                                <Remove />
                                            </IconButton>
                                            {item.stock}
                                            <IconButton onClick={() => handleUpdate(item, 1)}>
                                                <Add />
                                            </IconButton>
                                        </div>
                                    }>
                                    {item.descrip}
                                </Alert>
                            }
                            {item.stock === 0 &&
                                <Alert className={"root_stock"} severity="error" variant="filled"
                                    action={
                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} aria-label="outlined primary button group">
                                            <IconButton  disabled={true} >
                                                <Remove />
                                            </IconButton>
                                            <Typography>
                                                {item.stock}
                                            </Typography>
                                            <IconButton onClick={() => handleUpdate(item, 1)}>
                                                <Add />
                                            </IconButton>
                                        </div>
                                    }>
                                    {item.descrip}
                                </Alert>
                            }
                            {/* <Divider /> */}
                        </div>
                    )
                })}
            </div >
            <Link to="/">Volver a la tienda</Link>
        </div >
    )
}