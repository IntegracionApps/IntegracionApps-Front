import { Button } from "@material-ui/core";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useCart } from "react-use-cart";
import "../styles/Cart.css";

// import product_data from "../data/product_data";

export default function Cart({ cart, where }) {
    const history = useHistory();
    useEffect(() => {
        setItems(cart);
    }, []);

    const DISCOUNT_RATE = -0.07;

    const { isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        setItems,
        updateItemQuantity,
        addItem,
        removeItem,
        emptyCart
    } = useCart();


    function confirmSale() {
        history.push({
            pathname: '/NuevaVenta',
        })
    }

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function priceRow(qty, unit) {
        const num = qty * unit;
        return `${num.toFixed(2)}`;
    }

    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    const invoiceSubtotal = subtotal(items);
    const invoiceTaxes = DISCOUNT_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;


    if (isEmpty) return <h1>Carrito Vacío</h1>
    return (
        <div className="main_content" >
            <div className="table_container">

                <TableContainer  component={Paper}>
                    <Table style={{fontSize:"1.25rem"}} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="start" colSpan={3}>
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
                                        <TableCell>{item.name}</TableCell>
                                        {/*acá iría lo que es botones para ADD o SUBTRACT item qtty*/}
                                        <TableCell align="right">{item.quantity} [un]</TableCell>
                                        <TableCell align="right">AR$ {item.price}</TableCell>
                                        <TableCell align="right">AR$ {priceRow(item.price, item.quantity)}</TableCell>
                                    </TableRow>
                                )
                            })}
                            <TableRow>
                                <TableCell rowSpan={4} colSpan={1} />
                                <TableCell style={{ fontWeight: "bolder" }}>Subtotal</TableCell>
                                <TableCell colSpan={2} align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ padding: "0 16px 0 16px", fontWeight: "bolder" }}>Añadir Descuento: </TableCell>
                                <TableCell colSpan={2} align="right" style={{ padding: "0 16px 0 16px" }}>
                                    <TextField fullWidth id="discount" label="Ingrese un cupón de descuento." />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bolder" }}>Descuento:</TableCell>
                                <TableCell align="right">{`${(DISCOUNT_RATE * 100).toFixed(0)} %`}</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bolder" }}>Total</TableCell>
                                <TableCell colSpan={2} align="right">{ccyFormat(invoiceTotal)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2.5%" }}>

                <Button onClick={() => { confirmSale() }}>Confirmar Carrito</Button>
            </div>
        </div>
    );
};

