import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";


const columns = [
    { title: "N° de Venta", field: "id", editable: "never" },
    { title: "DNI del comprador", field: "cliente.dni", editable: "never" },
    { title: "Cantidad de ítems vendidos", field: "items.length", editable: "never", render: rowData => <div>{rowData.items.length} {rowData.items.length > 1 ? "ítems Vendidos" : "ítem vendido"}</div> },
    { title: "Total de la Venta", field: "total", render: rowData => <div>$ {rowData.total.toFixed(2)}</div> },
    { title: "Medio de Pago", field: "medioPago" },
    { title: "Estado", field: "estado", defaultSort: "asc" },

]


export default function RegistroVentas() {
    const [ventas, setVentas] = useState([]);
    useEffect(() => {

        let salesSelect = null;
        switch (parseInt(window.localStorage.getItem("rol"))) {
            case 0:
                salesSelect = 0
                axios.get("http://localhost:5000/Sales/get/" + salesSelect)
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
                axios.get("http://localhost:5000/Sales/get/" + salesSelect.dni)
                    .then(function (response) {
                        // handle success
                        // console.log(response);
                        setVentas(response.data);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });

        }
    }, [])


    return (
        <div>
            <Header />
            {window.localStorage.getItem("rol") === "0" ?
                //VISTA ADMIN
                <MaterialTable title="Registro de Ventas"
                    columns={columns}
                    data={ventas}

                    actions={[
                        rowData => ({
                            icon: 'check',
                            disabled: rowData.estado === "Pagado",
                            tooltip: 'Marcar Pagado',
                            onClick: (event, rowData) => {
                                console.log(rowData);
                                // const dataUpdate = [...ventas];
                                // const index = rowData.id;
                                // dataUpdate[index].estado = "Pagado";
                                // setVentas([...dataUpdate]);

                                // console.log(dataUpdate[index]);

                                alert("Se ha pagado la venta:  " + JSON.stringify(rowData));
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

            <Link to="/HomeAdmin">Volver a la tienda</Link>
        </div>
    )
}