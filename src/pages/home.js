import urlWebServices from '../webServices.js'
import { Badge, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, Popover, Typography } from "@material-ui/core";
import { Add, Remove, ShoppingCart } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { CartProvider, useCart } from "react-use-cart";
import Header from "../components/Header";
import '../styles/ProductCard.css'
import axios from "axios";
import ProductCard from "../components/ProductCard";



// import Pic from "@material-ui/icons/PhotoSizeSelectActualRounded";


// import product_data from "../data/product_data.js";

function AddedItemDialog(props) {
    const { itemsToSend, open, history, onClose } = props;

    const handleClose = () => {
        onClose();
    }

    const handleGoTo = () => {
        history.push({
            pathname: '/Shopping_Cart',
            state: (itemsToSend)
        });
    }

    if (itemsToSend === undefined) return null
    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>¡Éxito!</DialogTitle>
                <DialogContent dividers>
                    <Typography>Se ha agregado {itemsToSend.name} al carrito. ¿Quiere ver su carrito o quiere permanecer aquí y seguir comprando?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Seguir Comprando</Button>
                    <Button onClick={handleGoTo} color="secondary">Ver mi Carrito</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default function Home(props) {
    // console.log(product_data);
    console.log(props);
    const [product_data, setData] = useState([]);
    const [products_copy, setProductsCopy] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [popoverOpen, setPopoverOpen] = useState(false)

    const [open, setOpen] = useState(false);

    const finished = localStorage.getItem("finished");

    const history = useHistory();

    const {
        items,
        isEmpty,
        totalUniqueItems,
        setItems,
        addItem,
        removeItem,
        emptyCart,
        updateItemQuantity,
        getItem,
        inCart,
    } = useCart();


    useEffect(() => {

        axios.get(urlWebServices.getProductsWithStock)
            .then(function (response) {
                // console.log(response);
                setData(response.data);
                setProductsCopy(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(finished);
        if (finished === "true" ||  window.localStorage.getItem("loggedOut") === "true") {
            setItems([]);
            localStorage.setItem("finished", false);
            localStorage.setItem("loggedOut", false);
        }
        else setItems(items);
        // console.log("hipótesis");
    }, []);


    const popOpen = Boolean(popoverOpen);
    const id = popOpen ? 'simple-popover' : undefined;


    const handleClose = (value) => {
        setOpen(false);
    };


    function handleAddItem(item) {
        console.log(item);
        var filterFlag = false;
        if (!isEmpty) {
            console.log(items.filter(product => item.id === product.id));
            if (items.filter(product => item.id === product.id)) {
                items.map((product) => {
                    if (item.id === product.id) {
                        updateItemQuantity(product.id, 1);
                        filterFlag = true;
                    }
                })
            }
        }
        addItem(item);
        // console.log(getItem(item.id));
        if (!filterFlag) setOpen(true);
    }

    function handleItemUpdate(item, qtty, exceeds) {
        if (item.stock > 0) {
            switch (qtty) {
                case -1:
                    if (getItem(item.id).quantity - 1 === 0) removeItem(item.id);
                    else {
                        updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                        // setWillDisable(false);
                    }
                    break;
                case 1:
                    // if (getItem(item.id).quantity + 1 >= item.stock) setWillDisable(true);
                    updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                    break;
            }
        }
    }

    function handleGoTo(itemsToSend, history) {
        if (!isEmpty) history.push({
            pathname: '/Shopping_Cart',
            state: (itemsToSend)
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
                    <Fab className="button" variant="extended" onClick={() => handleGoTo(items, history)} disabled={isEmpty}>
                        <ShoppingCart />
                        Carrito
                    </Fab>
                    <Chip style={{ marginTop: "10%", backgroundColor: "orange", color: "black" }}
                        label={
                            isEmpty ? "¡Sin productos!" : totalUniqueItems + " Ítem(s)"
                        }>
                    </Chip>
                    {isEmpty ? null :
                        <Chip style={{ marginTop: "5%", backgroundColor: "red", color: "white" }} label="Vaciar Carrito" onClick={() => { emptyCart(); }} />
                    }
                </div>
                <div className="container_home">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                        {product_data.map((item) => {
                            const isThere = inCart(item.id)
                            return (
                                <div className="card" key={item.id}>
                                    {!isThere ?
                                        <div className="card_header">
                                            <h2>{item.nombre}</h2>
                                            <p style={{height: "30px"}}>{item.descrip}</p>
                                            <p className="price">$ {item.price} x[{item.tipoUnidad}]</p>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <button className="btn" onClick={() => handleAddItem(item)}>Agregar a carrito</button>
                                            </div>
                                        </div>
                                        :
                                        <Badge className="card_header" badgeContent={getItem(item.id).quantity} color="primary" anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                                            <ProductCard
                                                item={getItem(item.id)}
                                                handleAddFather={(item) => { handleAddItem(item) }}
                                                handleFatherItemUpdate={(item, qtty) => { handleItemUpdate(item, qtty) }}
                                            />
                                        </Badge>
                                    }
                                </div>
                            )
                        })}

                    </div>
                </div>

                <AddedItemDialog itemsToSend={items} open={open} history={history} onClose={() => handleClose()} />

            </CartProvider >
        </div >
    )
}
