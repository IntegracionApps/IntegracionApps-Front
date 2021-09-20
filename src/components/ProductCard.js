import { Badge, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCart } from 'react-use-cart';
// import product_data from "../data/product_data"
import "../styles/ProductCard.css";

export default function ProductCard(props) {
    const { item, handleAddFather, handleFatherItemUpdate } = props;
    // console.log(handleAddItem);
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
        // console.log(items);
    }, []);


    function handleItemUpdate(item, qtty) {
        if (item.stock > 0) {
            switch (qtty) {
                case -1:
                    if (getItem(item.id).quantity - 1 === 0) removeItem(item.id);
                    else {
                        updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                        setWillDisable(false);
                    }
                    break;
                case 1:
                    if (getItem(item.id).quantity + 1 >= item.stock) setWillDisable(true);
                    else updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                    break;
            }
        }
    }


    // function checkExceeds(item) {
    //     if (item.stock < 0) {
    //         if (getItem(item.id).quantity + 1 >= item.stock)
    //     }
    // }


    return (
        <div className="card_header">
            <h2>{item.nombre}</h2>
            <p>{item.descrip}</p>
            <p className="price">AR$ {item.price}</p>
            <React.Fragment>
                {/* <Badge className="card_header" badgeContent={getItem(item.id).quantity}> */}
                <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <IconButton onClick={() => {
                        handleItemUpdate(item, -1);
                        handleFatherItemUpdate(item, -1);
                        // updateItemQuantity(item.id, getItem(item.id).quantity - 1);
                        // console.log(getItem(item.id))
                    }} color="primary">
                        <Remove />
                    </IconButton>
                    <button className="btn" onClick={() => handleItemUpdate(item, 1)}>Agregar otro</button>
                    <IconButton disabled={willDisable} onClick={() => {
                        
                        handleItemUpdate(item, 1);
                        handleFatherItemUpdate(item, 1);
                        // updateItemQuantity(item.id, getItem(item.id).quantity + 1);
                        console.log(getItem(item.id).quantity);
                        // console.log(getItem(item.id))
                    }} color="primary">
                        <Add />
                    </IconButton>
                </div>
                {/* </Badge> */}
            </React.Fragment>
        </div>)
}
