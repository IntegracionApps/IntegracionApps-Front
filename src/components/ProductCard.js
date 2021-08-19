import { Dialog, DialogTitle } from '@material-ui/core';
import { React, useState } from 'react';
import product_data from "../data/product_data";
import "../styles/ProductCard.css";

function DialogDetalle(props) {
    const { onClose, elegido, open } = props;

    const handleClose = () => {
        // console.log("Hello");
        onClose();
    };

    // const handleListItemClick = (value) => {
    //     onClose(value);
    // };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="title-card-detalle">{props.elegido}</DialogTitle>
        </Dialog>
    )

}


const ProductCard = () => {
    const [open, setOpen] = useState(false);
    const [elegido, setElegido] = useState("");

    const handleClose = (value) => {
        setOpen(false);
        // setElegido(value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div className="main_content">
            {product_data.map((item) => (
                <div className="card" key={item.id} onClick={() => handleClickOpen(true)}>
                    <div className="">
                        <img src=""></img>
                    </div>
                    <div className="card_header">
                        <h2>{item.product_name}</h2>
                        <p>{item.description}</p>
                        <p className="price">{item.price}</p>
                        <button className="btn">Agregar a carrito</button>
                        {/* {console.log(item.product_name)} */}
                    </div>
                </div>
            ))}
            <DialogDetalle elegido={product_data[0].product_name} open={open} onClose={() => handleClose()} />
        </div>
    )

}

export default ProductCard