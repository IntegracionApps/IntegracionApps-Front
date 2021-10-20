import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import "../styles/Cart.css";

// import product_data from "../data/product_data";

export default function Cart({ cart, where }) {
    const history = useHistory();
    useEffect(() => {
        setItems(cart);
        console.log(cart);
    }, []);


    const { isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        setItems,
        updateItemQuantity,
        addItem,
        removeItem,
    } = useCart();

    const [toSend, setToSend] = useState({
        items: items,
        importe: [],
        subtotal: cartTotal,
        total: getTotal(),
    })

    const aux = [];

    function getImporte(quantity, price) {
        var res = quantity * price;
        aux.push(res);
        return res;
    }

    function getSubtotal() {
        var res = 0;
        items.forEach(item => {
            res = res + (item.quantity * item.price);
        });
        return res;
    }

    function getTotal() {
        return cartTotal;
    }

    function confirmSale() {
        setToSend((toSend) => ({
            ...toSend,
            importe: aux,
        }));

        console.log(toSend);
        history.push({
            pathname: '/NuevaVenta', state: {
                toSend: toSend,
            }
        })
    }

    if (isEmpty) return (
        <div>
            <h1>Carrito Vacío</h1>
            <Link to='/'></Link>
        </div>
    )
    return (
        <React.Fragment>

            <div className="table_container">

                <TableContainer component={Paper}>
                    <Table style={{ fontSize: "1.25rem" }} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={3}>
                                    Ítems
                                </TableCell>
                                <TableCell align="right">Importes</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Descripción</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Precio unit.</TableCell>
                                <TableCell align="right">Importe</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => {
                                return (
                                    <TableRow>
                                        <TableCell>{item.descrip}</TableCell>
                                        {/*acá iría lo que es botones para ADD o SUBTRACT item qtty*/}
                                        <TableCell align="right">{item.quantity} [{item.quantity > 1 ?  item.tipoUnidad+"s" : item.tipoUnidad}]</TableCell>
                                        <TableCell align="right">$ {item.price}</TableCell>
                                        <TableCell align="right">$ {getImporte(item.quantity, item.price).toFixed(2)}</TableCell>
                                    </TableRow>
                                )
                            })}
                            <TableRow>
                                <TableCell rowSpan={4} colSpan={1} />
                                <TableCell style={{ fontWeight: "bolder" }}>Subtotal</TableCell>
                                <TableCell colSpan={2} align="right">$ {cartTotal.toFixed(2)}</TableCell>
                            </TableRow>
                            {/* <TableRow>
                                <TableCell style={{ padding: "0 16px 0 16px", fontWeight: "bolder" }}>Añadir Descuento: </TableCell>
                                <TableCell colSpan={2} align="right" style={{ padding: "0 16px 0 16px" }}>
                                    <TextField fullWidth id="discount" label="Ingrese un cupón de descuento." />
                                </TableCell>
                            </TableRow> */}
                            <TableRow>
                                <TableCell style={{ fontWeight: "bolder" }}>Cargos por envío a domicilio:</TableCell>
                                <TableCell colSpan={2} align="right">$ 00,0</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bolder" }}>Total</TableCell>
                                <TableCell colSpan={2} align="right">$ {cartTotal.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

            <Button className="root" onClick={() => { confirmSale() }}>Confirmar Carrito</Button>

        </React.Fragment>
    );
};

