import { Badge, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCart } from 'react-use-cart';
// import product_data from "../data/product_data"
import "../styles/ProductCard.css";

export default function ProductCard(props) {
    const { item, isThere, handleOpen, handleAddItem, handleItemUpdate } = props;
    const [exceeds, setExceeds] = useState(false);
    // console.log(handleAddItem);
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
                    {/* </Badge> */}
                </React.Fragment>
        </div>)
}
