import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, Typography } from "@material-ui/core";
import { Add, Remove, ShoppingCart } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { CartProvider, useCart } from "react-use-cart";
import Header from "../components/Header";
import '../styles/ProductCard.css'
import axios from "axios";


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

    const [open, setOpen] = useState(false);
    const [itemsToSend, setAdded] = useState();

    const history = useHistory();

    const {
        items,
        isEmpty,
        totalUniqueItems,
        totalItems,
        setItems,
        addItem,
        removeItem,
        emptyCart,
        updateItemQuantity,
        getItem,
        inCart,
    } = useCart();


    useEffect(() => {
        setItems(items);
    }, []);


    const handleClose = (value) => {
        setOpen(false);
    };


    function handleAddItem(item) {
        setAdded(item);
        var filterFlag = false;
        if (!isEmpty) {
            // console.log(items.filter(product => item.id === product.id));
            if (items.filter(product => item.id === product.id)) {
                items.map((product) => {
                    if (item.id === product.id) {
                        updateItemQuantity(product.id, 1);
                        filterFlag = true;
                    }
                })
            }
        }
        addItem(item)
        if (!filterFlag) setOpen(true);
        // console.log(items);
    }

    function handleItemUpdate(item, qtty) {
        switch (qtty) {
            case -1:
                if (getItem(item.id).quantity - 1 === 0) removeItem(item.id);
                else updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                break;
            case 1:
                updateItemQuantity(item.id, getItem(item.id).quantity + qtty);

        }
    }

    function handleGoTo(itemsToSend, history) {
        history.push({
            pathname: '/Shopping_Cart',
            state: (itemsToSend)
        });
    }


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header />
            {/* <CartProvider> */}
            <Fab variant="extended" style={{ alignSelf: "end", margin: "1.5% 2% 0 0" }} onClick={() => handleGoTo(items, history)}>
                <ShoppingCart />
                Carrito
            </Fab>

            {isEmpty ? null :
                <button onClick={() => {
                    emptyCart();
                    setAdded(null);
                }}>Vaciar Carrito</button>
            }

            <div className="main_content">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                    {product_data.map((item) => {
                        const isThere = inCart(item.id)
                        return (
                            <div className="card" key={item.id}>
                                <Badge badgeContent={item.quantity}>
                                    <div className="">
                                        <img src=""></img>
                                    </div>
                                    <div className="card_header">
                                        <h2>{item.nombre}</h2>
                                        <p>{item.descrip}</p>
                                        <p className="price">AR$ {item.price}</p>
                                        {!inCart(item.id) ?
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <button className="btn" onClick={() => handleAddItem(item)}>Agregar a carrito</button>
                                            </div>
                                            :
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <IconButton onClick={() => {
                                                    handleItemUpdate(item, -1);
                                                    // updateItemQuantity(item.id, getItem(item.id).quantity - 1);
                                                    // console.log(getItem(item.id))
                                                }} color="primary">
                                                    <Remove />
                                                </IconButton>
                                                <button className="btn" onClick={() => handleAddItem(item)}>Agregar otro</button>
                                                <IconButton onClick={() => {
                                                    handleItemUpdate(item, 1)
                                                    // updateItemQuantity(item.id, getItem(item.id).quantity + 1);
                                                    // console.log(getItem(item.id))
                                                }} color="primary">
                                                    <Add />
                                                </IconButton>
                                            </div>
                                        }
                                    </div>
                                    {isThere && <p>{getItem(item.id).quantity}</p>}
                                </Badge>
                            </div>)
                    }
                    )}

                </div>

                <AddedItemDialog itemsToSend={items} open={open} history={history} onClose={() => handleClose()} />


            </div>
            {/* </CartProvider> */}
            {/* <Link to="/NuevaVenta">Nueva venta</Link> */}
        </div>
    )
}
