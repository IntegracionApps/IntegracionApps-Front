import urlWebServices from "../webServices";
import { Fab, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { CartProvider } from "react-use-cart";
import AdminProductCard from "../components/AdminProductCard";
import CreateItemDialog from "../components/CreatItemDialog";
import Header from "../components/Header";
import '../styles/ProductCard.css';



// import Pic from "@material-ui/icons/PhotoSizeSelectActualRounded";


// import product_data from "../data/product_data.js";


export default function HomeAdmin() {
    // console.log(product_data);

    const [product_data, setData] = useState([]);
    const [products_copy, setProductsCopy] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false);

    const history = useHistory();



    useEffect(() => {
        axios.get(urlWebServices.getProductsWithStock)
            .then(function (response) {
                // console.log(response);
                setData(response.data);
                setProductsCopy(response.data);
                setRefresh(false)
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(finished);
        // console.log("hipótesis");
    }, [refresh]);


    const handleClose = (value) => {
        setOpen(false);
    };



    function handleRemoveItem(item) {
        // const toRemove = product_data.splice(product_data.indexOf(item), 1);
        // console.log(toRemove);
        // console.log(product_data);
        // console.log(item.id);
        axios.post(urlWebServices.deleteProduct + item.id)
            .then((res) => {
                alert((res.data));
            })
            .catch((err) => {
                alert(err);
            });

    }


    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        if (searchValue !== "") {
            setData(
                products_copy.filter((item) => (
                    item.nombre.toLowerCase().match(event.target.value.toLowerCase()) || item.categoria.toLowerCase().match(event.target.value.toLowerCase()))
                )
            );
            // console.log(searchValue.toL);
        }
        if (searchValue === "") setData(products_copy);
    }


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header onSearchBarChange={handleSearchChange} searchValue={searchValue} />
            <CartProvider>
                <div className="fab">
                    <Tooltip title="Alta de Producto">
                        <Fab className="button" variant="extended" onClick={() => setOpen(true)}>
                            <Add />
                            Crear
                        </Fab>
                    </Tooltip>
                    {/* <Chip style={{ marginTop: "10%", backgroundColor: "orange", color: "black" }}
                        label={
                            isEmpty ? "¡Sin productos!" : totalUniqueItems + " Ítem(s)"
                        }>
                    </Chip>
                    {isEmpty ? null :
                        <Chip style={{ marginTop: "5%", backgroundColor: "red", color: "white" }} label="Vaciar Carrito" onClick={() => { emptyCart(); }} />
                    } */}
                </div>
                <div className="container_home">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                        {product_data.map((item, willDelete) => {
                            return (
                                <React.Fragment>
                                    <div className="card" key={item.id}>
                                        <AdminProductCard item={item} handleRemoveItem={() => handleRemoveItem(item)} refresh={() => setRefresh(true)} />
                                    </div>
                                </React.Fragment>
                            )
                        }
                        )}

                    </div>
                </div>

                <CreateItemDialog setRefresh={() => setRefresh(true)} open={open} history={history} onClose={() => handleClose()} />

            </CartProvider >
        </div >
    )
}
