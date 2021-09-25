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
        { title: "Nombre", field: "nombre" },
        { title: "Apellido", field: "apellido" },
        { title: "Rol", field: "rol" },
        { title: "Mail", field: "email" },
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
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Eliminar Empleado',
                        position: 'row',
                        onClick: (event, rowData) => { handleDelete(rowData) }
                    }),

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
                cellEditable={{
                    cellStyle: {},
                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                        return new Promise((resolve, reject) => {
                            console.log('newValue: ' + newValue);
                            setTimeout(resolve, 4000);
                        });
                    }
                }}


            />
            {/* <ListaEmpleados employee_data={data} visible={visible} /> */}
            <DialogAdd open={visible} onClose={() => { setVisible(false) }} />
        </div>
    )
}
