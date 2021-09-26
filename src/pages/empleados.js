import axios from "axios";
import MaterialTable from "material-table";
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
                            console.log(typeof(oldData.id));
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


            />
            {/* <ListaEmpleados employee_data={data} visible={visible} /> */}
            <DialogAdd open={visible} onClose={() => { setVisible(false) }} />
        </div>
    )
}
