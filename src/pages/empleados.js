import axios from "axios";
import MaterialTable, { MTableEditRow } from "material-table";
import React, { useEffect, useState } from "react";
import DialogAdd from "../components/AddUserDialog";
import Header from "../components/Header";
import ListaEmpleados from "../components/ListaEmpleador";

export default function Empleados() {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const axios = require('axios');
        axios.get("http://localhost:5000/Users/get/all")
            .then(function (response) {
                console.log(response.status + " " + response.statusText);
                if (response.status >= 200)
                    setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("default");
            });
    }, []);

    const handleClose = () => {
        setVisible(false);
    }


    function handleDelete(empleado) {
        console.log(empleado.id);
        if (window.confirm("¿Seguro que quiere borrar a " + empleado.nombre + " " + empleado.apellido + "?")) {
            axios.delete('http://localhost:5000/Users/delete/' + empleado.id)
                .then(function (response) {
                    console.log(response.status + " " + response.statusText);
                    if (response.status >= 200) alert("¡Borrado exitoso!")
                })
                .catch(function (error) {
                    console.log(error);
                })

        }
    }

    const columns = [
        { title: "Nombre", field: "nombre", editable: "never" },
        { title: "Apellido", field: "apellido", editable: "never" },
        { title: "Rol", field: "rol" },
        { title: "Mail", field: "email" },
        { title: "Dirección", field: "ubicacion.direccion" },
        { title: "Altura", field: "ubicacion.altura" },
        { title: "Piso", field: "ubicacion.piso" },
        { title: "Teléfono", field: "telefono" },
        { title: "Salario (AR$)", field: "salario" },

    ]

    function handleDelete(empleado) {
        console.log(empleado.id);
        if (window.confirm("¿Seguro que quiere borrar a " + empleado.nombre + " " + empleado.apellido + "?")) {
            axios.delete('http://localhost:5000/Users/delete/' + empleado.id)
                .then(function (response) {
                    console.log(response.status + " " + response.statusText);
                    if (response.status >= 200) alert("¡Borrado exitoso!")
                })
                .catch(function (error) {
                    console.log(error);
                })

        }
    }


    return (
        <div>
            <Header />
            <MaterialTable title="Empleados"
                columns={columns}
                data={data}
                actions={[
                    // rowData => ({
                    //     icon: 'delete',
                    //     tooltip: 'Eliminar Empleado',
                    //     position: 'row',
                    //     onClick: (event, rowData) => { handleDelete(rowData) }
                    // }),

                    {
                        icon: "add",
                        tooltip: "Crear Empleado",
                        isFreeAction: true,
                        onClick: () => setVisible(true),
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}

                
                editable={{
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            
                            console.log(dataUpdate[index]);
                            axios.post("http://localhost:5000/Users/edit/employee", {
                                empleado: dataUpdate[index],
                            })
                            .then((res) => {
                                console.log(res.data);
                                console.log(res.status + ": " + res.statusText);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                            
                            
                            resolve();
                        }, 1000)
                    }),
                    onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            console.log(typeof (oldData.id));
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            axios.post("http://localhost:5000/Users/delete/" + oldData.id)
                            .then((res) => {
                                console.log(res.data);
                                        console.log(res.status + ": " + res.statusText);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                                    
                                    
                                    resolve();
                                }, 1000)
                            }),
                            
                        }}
                        
                        
                        localization={{
                            body: {
                                emptyDataSourceMessage: "Sin Empleados!",
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
                                    
                        
                        
                        // components={{
                            //     EditRow: props => (
                                //         <div style={{ backgroundColor: '#e8eaf5' }}>
                                //             <MTableEditRow {...props} />
                                //         </div>
                                //     )
            // }}



            />
            {/* <ListaEmpleados employee_data={data} visible={visible} /> */}
            < DialogAdd open={visible} onClose={() => { setVisible(false) }} />
        </div>
    )
}
