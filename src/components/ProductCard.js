import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCart } from 'react-use-cart';
// import product_data from "../data/product_data"
import "../styles/ProductCard.css";

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



export default function ProductCard({ product_data }) {

    const [open, setOpen] = useState(false);
    const [itemsToSend, setAdded] = useState();

    const history = useHistory();

    const {
        items,
        isEmpty,
        setItems,
        addItem,
        emptyCart,
        updateItemQuantity,
        getItem,
        inCart,
    } = useCart();


    useEffect(() => {
        setItems([]);
    }, []);


    const handleClose = (value) => {
        setOpen(false);
    };


    function handleAddItem(item) {
        setAdded(item);
        if (!isEmpty) {
            // console.log(items.filter(product => item.id === product.id));
            if (items.filter(product => item.id === product.id)) {
                items.map((product) => {
                    if (item.id === product.id) {
                        addItem(product, 1);
                    }
                })
            }
        }
        addItem(item)
        setOpen(true);
        // console.log(items);
    }

    return (
        <div className="main_content">
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                {product_data.map((item) => {
                    const isThere = inCart(item.id)
                    return (
                        <div className="card" key={item.id}>
                            <div className="">
                                <img src=""></img>
                            </div>
                            <div className="card_header">
                                <h2>{item.nombre}</h2>
                                <p>{item.descrip}</p>
                                <p className="price">AR$ {item.precioUnidad}</p>
                                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <IconButton onClick={() => {
                                        updateItemQuantity(item.id, getItem(item.id).quantity - 1);
                                        // console.log(getItem(item.id))
                                    }} color="primary">
                                        <Remove />
                                    </IconButton>
                                    <button className="btn" onClick={() => handleAddItem(item)}>Agregar a carrito</button>
                                    <IconButton onClick={() => {
                                        updateItemQuantity(item.id, getItem(item.id).quantity + 1);
                                        // console.log(getItem(item.id))
                                    }} color="primary">
                                        <Add />
                                    </IconButton>
                                </div>
                            </div>
                            {isThere ? <p>{getItem(item.id).quantity}</p> : "Nada"}
                        </div>)
                }
                )}

            </div>

            <AddedItemDialog itemsToSend={items} open={open} history={history} onClose={() => handleClose()} />

            <button onClick={() => {
                emptyCart();
                setAdded();
            }}>Vaciar Carrito</button>

        </div>
    );
}