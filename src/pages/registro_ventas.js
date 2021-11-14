import urlWebServices from "../webServices";
import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";


let columns = []
switch (parseInt(window.localStorage.getItem("rol"))) {
    case 0:
        columns = [
            { title: "N° de Venta", field: "id", editable: "never" },
            { title: "DNI del comprador", field: "cliente.dni", editable: "never" },
            { title: "Cantidad de ítems vendidos", field: "items.length", editable: "never", render: rowData => <div>{rowData.items.length} {rowData.items.length > 1 ? "ítems Vendidos" : "ítem vendido"}</div> },
            { title: "Total de la Venta", field: "total", render: rowData => <div>$ {rowData.total.toFixed(2)}</div> },
            { title: "Medio de Pago", field: "medioPago" },
            { title: "Estado", field: "estado", defaultSort: "asc" },
        ];
        break;
    case 2:
        columns = [
            { title: "N° de Venta", field: "id", editable: "never" },
            { title: "Codigo de Compra", field: "_id" },
            { title: "Cantidad de ítems vendidos", field: "items.length", editable: "never", render: rowData => <div>{rowData.items.length} {rowData.items.length > 1 ? "ítems Vendidos" : "ítem vendido"}</div> },
            { title: "Total de la Venta", field: "total", render: rowData => <div>$ {rowData.total.toFixed(2)}</div> },
            { title: "Medio de Pago", field: "medioPago" },
            { title: "Estado", field: "estado", defaultSort: "asc" },
        ];
        break;

}


export default function RegistroVentas() {
    const [ventas, setVentas] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const [checkPurchaseCode, setCheckPurchaseCode] = useState(false);
    const [purchaseCode, setPurchaseCode] = useState('');
    const [compareCode, setCompareCode] = useState('');
    const [match, setMatch] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);

    useEffect(() => {

        let salesSelect = null;
        switch (parseInt(window.localStorage.getItem("rol"))) {
            case 0:
                salesSelect = 0
                axios.get(urlWebServices.getSales + salesSelect)
                    .then(function (response) {
                        // handle success
                        // console.log(response);
                        setVentas(response.data);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
                break;
            case 1:
                salesSelect = 0
                axios.get(urlWebServices.getSales + salesSelect)
                    .then(function (response) {
                        // handle success
                        // console.log(response);
                        setVentas(response.data);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
                break;

            case 2:
                salesSelect = JSON.parse(window.localStorage.getItem("user"));
                axios.get(urlWebServices.getSales + salesSelect.dni)
                    .then(function (response) {
                        // handle success
                        // console.log(response);
                        setVentas(response.data);
                        console.log(ventas);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
        }
        setRefresh(false);

    }, [refresh])


    function handleCheckCodes() {
        console.log(purchaseCode);
        console.log(compareCode);
        if (purchaseCode.match(compareCode)) {
            console.log("YES");
            axios.post(urlWebServices.confirmSale, {
                id: compareCode,
            })
                .then((res) => {
                    alert(res.status + ": " + res.statusText);
                    setCheckPurchaseCode(false);
                    setRefresh(true);
                })
                .catch((err) => {
                    alert(err);
                })
        };
    }
    return (
        <div>
            <Header />
            {window.localStorage.getItem("rol") === "0" ?
                //VISTA ADMIN
                <React.Fragment>
                    <MaterialTable title="Registro de Ventas"
                        columns={columns}
                        data={ventas}

                        actions={[
                            rowData => ({
                                icon: 'check',
                                disabled: rowData.estado === "Pagado",
                                tooltip: 'Marcar Pagado',
                                onClick: (event, rowData) => {
                                    setCompareCode(rowData._id);
                                    if (rowData.medioPago === "Efectivo") {
                                        axios.post(urlWebServices.confirmSale, {
                                            id: compareCode,
                                        })
                                            .then((res) => {
                                                alert(res.status + ": " + res.statusText);
                                                setCheckPurchaseCode(false);
                                                setRefresh(true);
                                            })
                                            .catch((err) => {
                                                alert(err);
                                            });
                                    }
                                    else {
                                        console.log(rowData);
                                        setCheckPurchaseCode(true);
                                    }
                                    // const dataUpdate = [...ventas];
                                    // const index = rowData.id;
                                    // dataUpdate[index].estado = "Pagado";
                                    // setVentas([...dataUpdate]);

                                    // console.log(dataUpdate[index]);

                                    // alert("Se ha pagado la venta:  " + JSON.stringify(rowData));
                                }
                            }),
                        ]}


                        options={{
                            actionsColumnIndex: -1
                        }}

                        detailPanel={[
                            {
                                tooltip: 'Ver Detalles',
                                render: row => {
                                    return (
                                        <React.Fragment
                                            style={{
                                                fontSize: 100,
                                                textAlign: 'center',
                                                color: 'white',
                                                backgroundColor: '#43A047',
                                            }}
                                        >
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", marginTop: "15px"}}>
                                                <Typography variant="h6" gutterBottom style={{ marginRight: "1%" }}>
                                                    {row.sucursal.nombre}
                                                </Typography>
                                                <Typography variant="h4" gutterBottom >
                                                    Franquicia : {row.sucursal.direccion}
                                                </Typography>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", marginLeft: "20px" }}>
                                                <Typography variant="h6" gutterBottom style={{ marginRight: "2.5%" }}>
                                                    Fecha de Venta : {new Date(row.fechaEmision).toLocaleString()}
                                                </Typography>
                                                <Typography variant="h6" gutterBottom >
                                                    Cliente : {row.cliente.nombre} {row.cliente.apellido}
                                                </Typography>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start",  marginLeft: "20px" }}>
                                                <Typography variant="h6" gutterBottom style={{ marginRight: "2.5%" }}>
                                                    {row.otros1}
                                                </Typography>
                                                <Typography variant="h6" gutterBottom >
                                                    {row.otros2}
                                                </Typography>
                                            </div>
                                            <Table size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                        {/* {/<TableCell>Descripción</TableCell> */}
                                                        <TableCell >Precio Unitario</TableCell>
                                                        <TableCell>Cantidad</TableCell>
                                                        <TableCell >Importe</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {row.items.map((itemDetailRow) => (
                                                        <TableRow key={itemDetailRow.id}>
                                                            {/* <TableCell component="th" scope="row">{row.fechaEmision}</TableCell>
                                            <TableCell align="left">{row.cliente.name} {row.cliente.lastName}</TableCell> */}
                                                            <TableCell align="left">{itemDetailRow.descrip}</TableCell>
                                                            <TableCell>$ {itemDetailRow.price}</TableCell>
                                                            {itemDetailRow.tipoUnidad !== "Porron" ?
                                                                <TableCell align="left">{itemDetailRow.quantity} [{itemDetailRow.quantity > 1 ? itemDetailRow.tipoUnidad + "s" : itemDetailRow.tipoUnidad}]</TableCell>
                                                                :
                                                                <TableCell align="left">{itemDetailRow.quantity} [{itemDetailRow.quantity > 1 ? itemDetailRow.tipoUnidad + "es" : itemDetailRow.tipoUnidad}]</TableCell>
                                                            }
                                                            <TableCell align="left">
                                                                $ {itemDetailRow.price * itemDetailRow.quantity}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </React.Fragment>
                                    )
                                },
                            }]}




                        localization={{
                            body: {
                                emptyDataSourceMessage: "Sin Ventas!",
                                deleteTooltip: 'Dar de  Baja',
                                editTooltip: 'Editar',
                                filterRow: {
                                    filterTooltip: 'Filtrar'
                                },
                                editRow: {
                                    deleteText: '¿Seguro que quiere dar de baja a este empleado?',
                                    cancelTooltip: 'Cancelar',
                                    saveTooltip: 'Confirmar'
                                }
                            },
                            header: {
                                actions: 'Opciones'
                            },
                            pagination: {
                                labelDisplayedRows: '{from}-{to} de {count}',
                                labelRowsSelect: 'filas',
                                labelRowsPerPage: 'filas por página:',
                                firstAriaLabel: 'Primera Página',
                                firstTooltip: 'Primera Página',
                                previousAriaLabel: 'Página Anterior',
                                previousTooltip: 'Página Anterior',
                                nextAriaLabel: 'Página Siguiente',
                                nextTooltip: 'Página Siguiente',
                                lastAriaLabel: 'Última Página',
                                lastTooltip: 'Última Página'
                            },
                            toolbar: {
                                addRemoveColumns: 'Agregar o Eliminar Columnas',
                                nRowsSelected: '{0} fila(s) seleccionada(s)',
                                showColumnsTitle: 'Mostrar Columnas',
                                showColumnsAriaLabel: 'Mostrar Columnas',
                                searchTooltip: 'Buscar',
                                searchPlaceholder: 'Buscar'
                            }
                        }}
                    />
                    <Dialog open={checkPurchaseCode} onClose={() => { setCheckPurchaseCode(false) }}>
                        <DialogTitle>Pago de Compra con Tarjeta</DialogTitle>
                        <DialogContent>
                            <TextField
                                className={"root"}
                                id="email"
                                name="email"
                                label="Código de Compra"
                                value={purchaseCode}
                                onChange={(event) => setPurchaseCode(event.target.value)}
                                className={"root"}
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                setCheckPurchaseCode(false);
                                handleCheckCodes();
                            }}>Confirmar Pago</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
                :
                //VISTA CLIENTE
                <MaterialTable title="Registro de Ventas"
                    columns={columns}
                    data={ventas}

                    detailPanel={[
                        {
                            tooltip: 'Ver Detalles',
                            render: row => {
                                return (
                                    <React.Fragment
                                        style={{
                                            fontSize: 100,
                                            textAlign: 'center',
                                            color: 'white',
                                            backgroundColor: '#43A047',
                                        }}
                                    >
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
                                            <Typography variant="h6" gutterBottom style={{ marginRight: "2.5%" }}>
                                                {row.sucursal.nombre}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom >
                                                Franquicia : {row.sucursal.direccion}
                                            </Typography>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
                                            <Typography variant="h6" gutterBottom style={{ marginRight: "2.5%" }}>
                                                Fecha de Venta : {new Date(row.fechaEmision).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom >
                                                Cliente : {row.cliente.nombre} {row.cliente.apellido}
                                            </Typography>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
                                            <Typography variant="h6" gutterBottom style={{ marginRight: "2.5%" }}>
                                                {row.otros1}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom >
                                                {row.otros2}
                                            </Typography>
                                        </div>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Descripción</TableCell>
                                                    <TableCell >Precio Unitario</TableCell>
                                                    <TableCell>Cantidad</TableCell>
                                                    <TableCell >Importe</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {row.items.map((itemDetailRow) => (
                                                    <TableRow key={itemDetailRow.id}>
                                                        {/* <TableCell component="th" scope="row">{row.fechaEmision}</TableCell>
                                                    <TableCell align="left">{row.cliente.name} {row.cliente.lastName}</TableCell> */}
                                                        <TableCell align="left">{itemDetailRow.descrip}</TableCell>
                                                        <TableCell>$ {itemDetailRow.price}</TableCell>
                                                        {itemDetailRow.tipoUnidad !== "Porron" ?
                                                            <TableCell align="left">{itemDetailRow.quantity} [{itemDetailRow.quantity > 1 ? itemDetailRow.tipoUnidad + "s" : itemDetailRow.tipoUnidad}]</TableCell>
                                                            :
                                                            <TableCell align="left">{itemDetailRow.quantity} [{itemDetailRow.quantity > 1 ? itemDetailRow.tipoUnidad + "es" : itemDetailRow.tipoUnidad}]</TableCell>
                                                        }
                                                        <TableCell align="left">
                                                            $ {itemDetailRow.price * itemDetailRow.quantity}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </React.Fragment>
                                )
                            },
                        }]}




                    localization={{
                        body: {
                            emptyDataSourceMessage: "Sin Ventas!",
                            deleteTooltip: 'Dar de  Baja',
                            editTooltip: 'Editar',
                            filterRow: {
                                filterTooltip: 'Filtrar'
                            },
                            editRow: {
                                deleteText: '¿Seguro que quiere dar de baja a este empleado?',
                                cancelTooltip: 'Cancelar',
                                saveTooltip: 'Confirmar'
                            }
                        },
                        header: {
                            actions: 'Opciones'
                        },
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'filas',
                            labelRowsPerPage: 'filas por página:',
                            firstAriaLabel: 'Primera Página',
                            firstTooltip: 'Primera Página',
                            previousAriaLabel: 'Página Anterior',
                            previousTooltip: 'Página Anterior',
                            nextAriaLabel: 'Página Siguiente',
                            nextTooltip: 'Página Siguiente',
                            lastAriaLabel: 'Última Página',
                            lastTooltip: 'Última Página'
                        },
                        toolbar: {
                            addRemoveColumns: 'Agregar o Eliminar Columnas',
                            nRowsSelected: '{0} fila(s) seleccionada(s)',
                            showColumnsTitle: 'Mostrar Columnas',
                            showColumnsAriaLabel: 'Mostrar Columnas',
                            searchTooltip: 'Buscar',
                            searchPlaceholder: 'Buscar'
                        }
                    }}
                />

            }

            {/* <Link to="/HomeAdmin">Volver a la tienda</Link> */}
        </div>
    )
}