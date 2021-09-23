import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    console.log(row);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">{row.id.toString().padStart(10,"0")}</TableCell>
                <TableCell align="right">{row.items.length} Ítems vendidos</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{row.medioPago}</TableCell>
                <TableCell align="right">{row.estado}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h4" gutterBottom component="div">
                                Detalle
                            </Typography>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-evenly"}}>
                                <Typography variant="h6" gutterBottom >
                                    Fecha de Venta : {new Date(row.fechaEmision).toLocaleString()}
                                </Typography>
                                <Typography variant="h6" gutterBottom >
                                    Cliente : {row.cliente.name} {row.cliente.lastName}
                                </Typography>
                            </div>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell >Precio Unitario</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell >Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((itemDetailRow) => (
                                        <TableRow key={itemDetailRow.id}>
                                            {/* <TableCell component="th" scope="row">{row.fechaEmision}</TableCell>
                                            <TableCell align="left">{row.cliente.name} {row.cliente.lastName}</TableCell> */}
                                            <TableCell align="left">{itemDetailRow.descrip}</TableCell>
                                            <TableCell>AR$ {itemDetailRow.price}</TableCell>
                                            <TableCell align="left">{itemDetailRow.cantidad} [{itemDetailRow.tipoUnidad}]</TableCell>
                                            <TableCell align="left">
                                                AR$ {itemDetailRow.importe}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}

export default function RegistroVentas() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/Sales/get/all")
            .then(function (response) {
                // handle success
                // console.log(response);
                setVentas(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])


    return (
        <div>
            <Header />
            <h1>Registro de Ventas</h1>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>N° de Venta</TableCell>
                            <TableCell align="right">Cantidad de Ítems vendidos</TableCell>
                            <TableCell align="right">Total de la Venta</TableCell>
                            <TableCell align="right">Medio de Pago</TableCell>
                            <TableCell align="right">Estado de la Venta</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventas.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to="/Home">Volver a la tienda</Link>
        </div>
    )
}