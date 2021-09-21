import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, Typography } from "@material-ui/core";
import { Add, Remove, ShoppingCart } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { CartProvider, useCart } from "react-use-cart";
import Header from "../components/Header";
import '../styles/ProductCard.css'
import axios from "axios";
import ProductCard from "../components/ProductCard";



import Pic from "@material-ui/icons/PhotoSizeSelectActualRounded";


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


export default function Home() {
    // console.log(product_data);

    const [product_data, setData] = useState([]);
    const [products_copy, setProductsCopy] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const [open, setOpen] = useState(false);

    const finished = localStorage.getItem("finished");

    const history = useHistory();

    const {
        items,
        isEmpty,
        setItems,
        addItem,
        removeItem,
        emptyCart,
        updateItemQuantity,
        getItem,
        inCart,
    } = useCart();


    useEffect(() => {
        axios.get('http://localhost:5000/Products/get/all')
            .then(function (response) {
                // console.log(response);
                setData(response.data);
                setProductsCopy(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(finished);
        if (finished === "true") {
            setItems([]);
            localStorage.setItem("finished", false);
        }
        else setItems(items);
        // console.log("hipótesis");
    }, []);



    const handleClose = (value) => {
        setOpen(false);
    };


    function handleAddItem(item) {
        // console.log(item);
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
        history.push({
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
                <Fab variant="extended" style={{ alignSelf: "end", margin: "1.5% 2% 0 0" }} onClick={() => handleGoTo(items, history)}>
                    <ShoppingCart />
                    Carrito
                </Fab>

                {isEmpty ? null :
                    <button onClick={() => {
                        emptyCart();
                    }}>Vaciar Carrito</button>
                }

                <div className="main_content">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                        {product_data.map((item) => {
                            const isThere = inCart(item.id)
                            return (
                                <div className="card" key={item.id}>
                                    {!isThere ?
                                        <div className="card_header">
                                            <h2>{item.nombre}</h2>
                                            <p>{item.descrip}</p>
                                            <p className="price">AR$ {item.price}</p>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <button className="btn" onClick={() => handleAddItem(item)}>Agregar a carrito</button>
                                            </div>
                                        </div>
                                        :
                                        <Badge badgeContent={getItem(item.id).quantity}>
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

            </CartProvider>
        </div>
    )
}
