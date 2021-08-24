import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { React, useState } from 'react';
import product_data from "../data/product_data";
import "../styles/ProductCard.css";

function DialogDetalle(props) {
    const { onClose, elegido, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="title-card-detalle">{props.elegido.product_name}</DialogTitle>
            <DialogContent dividers>
                <Typography>{props.elegido.description}</Typography>
                <Typography>AR$ {props.elegido.price}</Typography>
                <Typography>Valores nutricionales/Otros datos, depende del tipo de producto</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
                <Button onClick={()=>{
                    // CAMBIAR POR LLAMADA A addCarrito o lo que haya
                    console.log("se ha agregado el producto: "+props.elegido.product_name+ " al carrito");
                }}>
                    Agregar</Button>
            </DialogActions>
        </Dialog>
    )

}


const ProductCard = () => {
    const [open, setOpen] = useState(false);
    const [idElegido, setElegido] = useState(0);

    const handleClose = (value) => {
        setOpen(false);
        // setElegido(value);
    };

    const handleClickOpen = (props) => {
        setOpen(true);
        // console.log(props);
        setElegido(props-1);
    };

    return (
        <div className="main_content">
            {product_data.map((item) => (
                <div className="card" key={item.id} onClick={() => handleClickOpen(item.id)}>
                    {/* <div className="">
                        <img src=""></img>
                    </div> */}
                    <div className="card_header">
                        <h2>{item.product_name}</h2>
                        <p>{item.description}</p>
                        <p className="price">AR$ {item.price}</p>
                        <button className="btn">Agregar a carrito</button>
                        {/* {console.log(item.product_name)} */}
                    </div>
                </div>
            ))}
            <DialogDetalle elegido={product_data[idElegido]} open={open} onClose={() => handleClose()} />
        </div>
    )

}

export default ProductCard