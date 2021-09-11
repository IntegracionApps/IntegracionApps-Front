import React, { Component } from "react"
// import employee_data from "../data/employee_data"
import MaterialTable from "material-table"


function ListaEmpleados(props) {

    const columns = [
        { title: "Nombre", field: "nombre" },
        { title: "Apellido", field: "apellido" },
        { title: "Rol", field: "rol" },
        { title: "Mail", field: "email" },
    ]

    console.log(props.employee_data);

    return (
        <div>
            <MaterialTable title="Empleados"
                columns={columns}
                data={props.employee_data}
            />
        </div>
    )
}

export default ListaEmpleados