import { Badge, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCart } from 'react-use-cart';
// import product_data from "../data/product_data"
import "../styles/ProductCard.css";

export default function ProductCard(props) {
    const { item, handleAddFather, handleFatherItemUpdate } = props;
    const [willDisable, setWillDisable] = useState(false);

    const history = useHistory();

    const {
        items,
        isEmpty,
        setItems,
        addItem,
        emptyCart,
        updateItemQuantity,
        removeItem,
        getItem,
        inCart,
    } = useCart();


    useEffect(() => {
        setItems([item]);
    }, []);


    function handleItemUpdate(item, qtty) {
        if (item.stock > 0) {
            switch (qtty) {
                case -1:
                    if (getItem(item.id).quantity === 0) removeItem(item.id);
                    else {
                        updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                        setWillDisable(false);
                    }
                    break;
                case 1:
                    if (getItem(item.id).quantity + 1 >= item.stock) setWillDisable(true);
                    updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                    break;
            }
        }
    }


    return (
        <React.Fragment >
                <h2>{item.nombre}</h2>
                <p>{item.descrip}</p>
                <p className="price">AR$ {item.price}</p>
                {/* <p>{getItem(item.id).quantity}</p> */}
                <React.Fragment>
                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <IconButton onClick={() => {
                            handleItemUpdate(item, -1);
                            handleFatherItemUpdate(item, -1);
                        }} color="primary">
                            <Remove />
                        </IconButton>
                        <button className="btn" onClick={() => handleItemUpdate(item, 1)}>Agregar otro</button>
                        <IconButton disabled={willDisable} onClick={() => {
                            handleItemUpdate(item, 1);
                            handleFatherItemUpdate(item, 1);
                        }} color="primary">
                            <Add />
                        </IconButton>
                    </div>
                </React.Fragment>
        </React.Fragment>)
}
